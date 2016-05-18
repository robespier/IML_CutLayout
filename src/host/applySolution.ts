export const applySolution = (data): string => {
  const doc = app.activeDocument;

  /**
   * Размещение высечек на слой "layout"
   */
  const original = doc.pathItems[0];
  const layoutLayer = doc.layers.add();
  layoutLayer.name = "layout";
  const placementMarker = layoutLayer.pathItems.add();

  for (let i = 0, l = data.cuts.length; i < l; i++) {
    const c = original.duplicate(placementMarker, ElementPlacement.PLACEBEFORE);
    c.position = data.cuts[i].pos;
    c.rotate(data.cuts[i].angle);
  }

  placementMarker.remove();

  /**
   * Создание Области Размещения на слое "area"
   */
  const areaLayer = doc.layers.add();
  areaLayer.name = "area";
  const area = areaLayer.pathItems.add();

  for (let i = 0, l = data.area.length; i < l; i++) {
    const { anchor, l, r } = data.area[i];
    const point = area.pathPoints.add();
    point.anchor = anchor;
    point.leftDirection = l;
    point.rightDirection = r;
  }

  area.closed = true;
  area.filled = false;

  const strColor = new CMYKColor();
  strColor.cyan = 100;

  area.stroked = true;
  area.strokeColor = strColor;

  return "done";
};
