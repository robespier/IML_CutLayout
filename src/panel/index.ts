import "angular";

const app = angular.module("iml", []);

/**
 * После того, как модуль создан, можно заявлять "наши" сервисы.
 */
import "./services";

import "./ctrlMain";

export {
  app,
}
