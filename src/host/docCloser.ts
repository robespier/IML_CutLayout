export const docCloser = (): string => {
  if (app.documents.length > 0) {
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
  }
  return "killed";
};
