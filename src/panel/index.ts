import "angular";

const app = angular.module("iml", []);

const ctrlMain = ($scope) => {
  /**
   * Собираемся выполнить на стороне ILST метод `docCloser`, без параметров.
   */
  const command: CEPCommand = {
    handler: "docCloser",
  };

  $scope.go = () => {
    console.log("GO yourself, you, motherfucker");
  }
}

app.controller("ctrlMain", ["$scope", ctrlMain]);
