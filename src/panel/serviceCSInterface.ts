import { app } from "./index";

import { CSInterface } from "CSInterface";

const cs = new CSInterface();

const service = (): CSInterface.CSInterfaceInstance => {
  return cs;
};

app.factory("CSInterface", service);
