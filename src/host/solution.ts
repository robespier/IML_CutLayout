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
  const outFolder = new File($.fileName).parent;
  const name = doc.fullName.name.replace(/\.ai$/, ".json");
  const writer = new File(outFolder.fullName + "/" + name);

  writer.open("w");
  writer.write(JSON.stringify(data));
  writer.close();
};

export const solution = (): CEPResponse => {
  const response: CEPResponse = {
    status: "success",
  };

  app.activeDocument.pageOrigin = [0, 0];

  const solution: ISolution = {
    area: [],
    cuts: [],
  };

  const target = locateTarget(app);
  const cuts = target.pathItems;

  for (let i = 0, l = cuts.length; i < l; i++) {
    const cut = cuts[i];
    solution.cuts.push({
      angle: 0,
      position: cut.position,
    });
  }

  const area = locateArea(app);
  const points = area.pathPoints;

  for (let i = 0, l = points.length; i < l; i++) {
    const point = points[i];
    solution.area.push({
      anchor: point.anchor,
      leftPosition: point.leftDirection,
      rightPosition: point.rightDirection,
    });
  }

  saveSolution(app, solution);

  return response;
};
