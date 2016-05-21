import "angular";

const app = angular.module("iml", []);

/**
 * После того, как модуль создан, можно заявлять "наши" сервисы.
 */
import "./serviceILST";
import "./serviceCSInterface";
import "./serviceSolver";

import "./ctrlMain";

export {
  app,
}
