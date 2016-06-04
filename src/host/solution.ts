/**
 * Генератор решений из готовых раскладок для заглушки Solver
 *
 * Контуры должны быть максимально разгруппированы и лежать в слое `cut`
 * Область размещения должна быть выделена (активна)
 */
import { ERR } from "./constants";

const locateTarget = (app: Application): Layer => {
  if (app.documents.length === 0) {
    throw new Error(ERR.NO_DOCUMENTS_OPEN);
  }

  const doc = app.activeDocument;

  /**
   * Вернуть слой "cut", если есть
   */
  try {
    return doc.layers.getByName("cut");
  } catch (err) {
    throw new Error(ERR.NO_TARGET_CONTOUR);
  }
};

const locateArea = (app: Application): PathItem => {
  const doc = app.activeDocument;
  if (doc.selection.length !== 1) {
    throw new Error(ERR.INVALID_SELECTION);
  }
  return doc.selection[0];
};

const saveSolution = (app: Application, data): void => {
  const doc = app.activeDocument;
  const outFolder = new File($.getenv("TEMP"));
  const name = doc.fullName.name.replace(/\.ai$/, ".json");
  const writer = new File(outFolder.fullName + "/" + name);

  writer.open("w");
  writer.write(JSON.stringify(data, null, "  "));
  writer.close();
};

export const solution = (): CEPResponse => {
  const response: CEPResponse = {
    status: "success",
  };

  const doc = app.activeDocument;
  doc.pageOrigin = [0, 0];

  // Область размещения (циановая хрень)
  const area = locateArea(app);

  const solution: ISolution = {
    area: {
      direction: area.polarity === PolarityValues.NEGATIVE ? -1 : 1,
      placement: { angle: 0, position: area.position },
      points: [],
    },
    cuts: [],
    dimensions: [],
  };

  const dim = doc.artboards[0].artboardRect;
  solution.dimensions = [Math.abs(dim[2] - dim[0]), Math.abs(dim[3] - dim[1])];

  const target = locateTarget(app);
  const cuts = target.pathItems;

  for (let i = 0, l = cuts.length; i < l; i++) {
    const cut = cuts[i];
    solution.cuts.push({
      angle: 0,
      position: cut.position,
    });
  }

  const points = area.pathPoints;

  for (let i = 0, l = points.length; i < l; i++) {
    const point = points[i];
    solution.area.points.push({
      anchor: point.anchor,
      leftPosition: point.leftDirection,
      rightPosition: point.rightDirection,
    });
  }

  saveSolution(app, solution);

  return response;
};
