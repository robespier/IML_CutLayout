import { getLayer } from "./utils";

/**
 * Создаём новый артборд, возвращаем дельты для позиционирования контуров
 *
 * @param {string} name Название монтажной области
 * @param {Document} doc
 * @param {ISolution} data
 * @param {string} [orientation] В полосу или в колонку
 * @return {array}
 */
const makeArtboard = (
  name: string,
  doc: Document,
  data: ISolution,
  orientation = "vertical"
  ): number[] => {
  /**
   * Alias for orientation
   */
  const isVert = orientation === "horizontal";

  /**
   * Gutter between artboards
   */
  const gutter = 10;

  /**
   * Определение позиции нового артборда и вычисление смещения решения
   * относительно этой позиции
   */
  const lastArtboardIndex = doc.artboards.length - 1;
  const lastArtboard = doc.artboards[lastArtboardIndex];
  const [ left, top, right, bottom ] = lastArtboard.artboardRect;
  const [ nextArtWidth, nextArtHeight ] = data.dimensions;

  const deltaX = isVert ? 0 : right + gutter;
  const deltaY = isVert ? bottom - gutter : 0;

  doc.artboards.add([
    isVert ? left : deltaX,
    isVert ? deltaY : top,
    isVert ? nextArtWidth : nextArtWidth + deltaX,
    isVert ? bottom - nextArtHeight : -nextArtHeight,
  ]).name = name; // todo: Add solution hash to interface

  return [deltaX, deltaY];
};

export const applySolution = (data: ISolution): CEPResponse => {
  const doc = app.activeDocument;

  /**
   * Нормализация оригинала при первом запуске
   */
  if (doc.layers.length === 1) {
    doc.layers[0].name = "original";
    // doc.rulerOrigin = [0, 0];
  }

  const [ deltaX, deltaY ] = makeArtboard("Solution #n", doc, data);

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
    const [ shiftX, shiftY ] = position;

    const mRotate = app.getRotationMatrix(angle);
    const mPlace = app.concatenateTranslationMatrix(mZero, shiftX, shiftY);
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
