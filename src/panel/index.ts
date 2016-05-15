import "angular";

const app = angular.module("iml", []);

/**
 * После того, как модуль создан, можно заявлять "наши" сервисы.
 * В иной последовательности будет зихер.
 */
import "./serviceILST";

const ctrlMain = ($scope, ILST) => {
  /**
   * Собираемся выполнить на стороне ILST метод `docCloser`, без параметров.
   */
  const command: CEPCommand = {
    handler: "docCloser",
  };

  $scope.go = () => {
    ILST.execute(command);
  }
}

/**
 * Отметимся в Ангуляре как контроллер
 */
app.controller("ctrlMain", ["$scope", "ILST", ctrlMain]);
