import "angular";
import "angular-local-storage";
import "ng-redux";

import rootReducer from "./reducers";

const app = angular.module("iml", ["LocalStorageModule", "ngRedux"]);

app.config([
  "localStorageServiceProvider",
  "$ngReduxProvider",
  (localStorageServiceProvider, $ngReduxProvider) => {
    localStorageServiceProvider.setPrefix("iml");
    $ngReduxProvider.createStoreWith(rootReducer);
}]);

/**
 * После того, как модуль создан, можно заявлять "наши" компоненты.
 */
import "./services";
import "./controllers";
import "./i18n";

export {
  app,
}
