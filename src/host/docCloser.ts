export const docCloser = (): string => {
  let response: CEPResponse = {
    status: "missed",
  };

  if (app.documents.length > 0) {
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    response.status = "killed";
  }

  return JSON.stringify(response);
};
