import { app } from "../index";

const service = (config: ICommonConfig): AppDataService => {
  return config.defaults;
};

app.factory("AppData", [
  "CommonConfig",
  service,
]);
