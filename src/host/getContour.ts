import { getContour as serialize } from "./utils";

/**
 * Сериализация контура для Solver.
 */
export const getContour = (): CEPResponse => {
  const source = app.activeDocument.pathItems[0];

  //
  // todo validations
  //

  const target = serialize(source);

  return { data: target, status: "success" };
};
