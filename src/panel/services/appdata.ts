import { merge } from "lodash";
import { app } from "../index";
import { setAppData } from "../actions";

const service = ($ngRedux, config: ICommonConfig) => {
  const appDefaults = merge({}, config.defaults);

  /**
   * Map service methods to state actions
   */
  const service = {
    data: <AppDataService>{},
    setAppData: (data: AppDataService) => {},
  };

  const mapStateToProps = (state: IRootReducer) => {
    return state.ui;
  };

  $ngRedux.connect(mapStateToProps, { setAppData })(service);

  service.setAppData(appDefaults);

  return service;
};

app.factory("AppData", [
  "$ngRedux",
  "CommonConfig",
  service,
]);
