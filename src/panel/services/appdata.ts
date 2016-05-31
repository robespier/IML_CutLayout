import { merge, isEqual } from "lodash";
import { app } from "../index";
import { setAppData } from "../actions";

const service = ($ngRedux, storage, config: ICommonConfig) => {
  /**
   * At init stage keep app defaults from config
   * Later used to track changes against app state
   */
  const appDefaults = merge({}, config.defaults);

  /**
   * This fields from state is persistent:
   */
  const storable = ["material", "materials"];

  /**
   * Merge defaults with storable data
   */
  storable.forEach(key => {
    const record = storage.get(key);
    if (record) {
      appDefaults[key] = JSON.parse(record);
    }
  });

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

  /**
   * When someone update the state -- sync storable data with localStorage
   */
  const syncStorage = () => {
    const state = <IRootReducer>$ngRedux.getState();
    storable.forEach(key => {
      const newValue = state.ui[key];
      if (!isEqual(appDefaults[key], newValue)) {
        storage.set(key, JSON.stringify(newValue));
        appDefaults[key] = newValue;
      }
    });
  };

  $ngRedux.subscribe(syncStorage);

  return service;
};

app.factory("AppData", [
  "$ngRedux",
  "localStorageService",
  "CommonConfig",
  service,
]);
