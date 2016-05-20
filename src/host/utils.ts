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

export {
  getLayer,
};
