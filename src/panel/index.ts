import "angular";

const app = angular.module("iml", []);

/**
 * После того, как модуль создан, можно заявлять "наши" компоненты.
 */
import "./services";
import "./controllers";
import "./i18n";

export {
  app,
}
