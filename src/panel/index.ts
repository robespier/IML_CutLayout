import "angular";
import "ng-redux";
import rootReducer from "./reducers";

const app = angular.module("iml", ["ngRedux"]);

app.config(($ngReduxProvider) => {
  $ngReduxProvider.createStoreWith(rootReducer);
});

/**
 * После того, как модуль создан, можно заявлять "наши" компоненты.
 */
import "./services";
import "./controllers";

export {
  app,
}
