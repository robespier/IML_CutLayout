import "angular";
import "ng-redux";

const app = angular.module("iml", ["ngRedux"]);

app.config([
  "$ngReduxProvider",
  ($ngReduxProvider) => {
    $ngReduxProvider.createStoreWith({});
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
