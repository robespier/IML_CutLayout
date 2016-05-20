import { getLayer } from "./utils";

export const applySolution = (data: ISolution): CEPResponse => {
  const doc = app.activeDocument;

  /**
   * Нормализация оригинала при первом запуске
   */
  if (doc.layers.length === 1) {
    doc.layers[0].name = "original";
    // doc.rulerOrigin = [0, 0];
  }

  /**
   * Определение позиции нового артборда и вычисление смещения решения
   * относительно этой позиции
   */
  const lastArtboardIndex = doc.artboards.length - 1;
  const lastArtboard = doc.artboards[lastArtboardIndex];
  const [ , top, right ] = lastArtboard.artboardRect;
  const [ nextArtWidth, nextArtHeight ] = data.dimensions;

  /**
   * Создаём новый артборд справа
   */
  const deltaX = right + 10; // 10 -- gutter between artboards
  const deltaY = 0;
  doc.artboards.add([
    deltaX,
    top,
    nextArtWidth + deltaX,
    -nextArtHeight
  ]).name = "Solution #n"; // todo: Add solution hash to interface

  /**
   * Базовый контур и его положение относительно начала координат
   */
  const original = doc.layers.getByName("original").pathItems[0];
  const [ origX, origY ] = original.position;
  const mZero = app.getTranslationMatrix(deltaX - origX, deltaY - origY);

  /**
   * Слой высечек
   */
  const layoutLayer = getLayer(doc, "layout");
  const placementMarker = layoutLayer.pathItems.add();

  /**
   * Размещение высечек на слой "layout"
   */
  for (let i = 0, l = data.cuts.length; i < l; i++) {
    // Ожидается, что целевой контур находится внутри страницы, не на полях
    const c = original.duplicate(placementMarker, ElementPlacement.PLACEBEFORE);

    const { position, angle } = data.cuts[i];

    const mRotate = app.getRotationMatrix(angle);
    const mPlace = app.concatenateTranslationMatrix(mZero, position[0], position[1]);
    const mGo = app.concatenateMatrix(mRotate, mPlace);

    c.transform(mGo, true, false, false, false, false, Transformation.CENTER);
  }

  placementMarker.remove();

  /**
   * Создание Области Размещения на слое "area"
   */
  const areaLayer = getLayer(doc, "area");
  const area = areaLayer.pathItems.add();

  for (let i = 0, l = data.area.length; i < l; i++) {
    const { anchor, leftPosition, rightPosition } = data.area[i];
    const point = area.pathPoints.add();
    point.anchor = anchor;
    point.leftDirection = leftPosition;
    point.rightDirection = rightPosition;
  }

  area.closed = true;
  area.filled = false;

  const strColor = new CMYKColor();
  strColor.cyan = 100;

  area.stroked = true;
  area.strokeColor = strColor;

  area.translate(deltaX, deltaY);

  return { status: "success" };
};
