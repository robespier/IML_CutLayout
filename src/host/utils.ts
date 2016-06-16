/**
 * Create new layer with given name or return existing layer by given name
 *
 * @param {Document} doc
 * @param {string} name
 * @return {Layer}
 */
const getLayer = (doc: Document, name: string): Layer => {
  try {
    return doc.layers.getByName(name);
  } catch (e) {
    const newbe = doc.layers.add();
    newbe.name = name;
    return newbe;
  }
};

/**
 * Calculate center of contour by bounds
 *
 * @param {PathItem} path
 * @return {Array}
 */
const getCenter = (path: PathItem): number[] => {
  const [ left, top, right, bottom] = path.geometricBounds;
  return [ (right - left) / 2 + left, (bottom - top) / 2 + top ];
};

/**
 * Serialize contour
 */
const getContour = (path: PathItem): IFigure => {
  /**
   * Init countor object
   */
  const contour: IFigure = {
    direction: path.polarity === PolarityValues.NEGATIVE ? -1 : 1,
    placement: {
      angle: 0,
      position: path.position,
    },
    points: [],
  };

  for (let i = 0, l = path.pathPoints.length; i < l; i++) {
    const point = path.pathPoints[i];
    const description: IPoint = {
      anchor: point.anchor,
      leftPosition: point.leftDirection,
      rightPosition: point.rightDirection,
    };
    contour.points.push(description);
  }

  return contour;
};

export {
  getCenter,
  getContour,
  getLayer,
};
