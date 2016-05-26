import { app } from "../index";

/**
 * Интерфейс $scope
 */
interface IMainScope extends ng.IScope {
  /**
   * Выполнить что-либо на стороне ILST
   */
  go(): void;

  /**
   * Результат ILST действия
   */
  status: string;
}

const controller = (
  $scope: IMainScope,
  ILST: ILSTService,
  solver: SolverSerivce
  ) => {
  $scope.go = () => {
    /**
     * Покажем фидбек Марине, что процесс пошел
     */
    $scope.status = "started";

    const getContour: CEPCommand = {
      handler: "getContour",
    };

    /**
     * Запрашиваем из ILST характеристики контура,
     * подмешиваем к ним параметры из UI,
     * передаем коктейль в solver,
     */
    ILST.dispatch(getContour).then(result => {
      return solver.solve(result.data);
    }).then(ready => {
      $scope.status = "done!";
    }, err => {
      $scope.status = "solver failure: " + err;
    }, notify => {
      const applySolution: CEPCommand = {
        data: notify,
        handler: "applySolution",
      };
      $scope.status = "applying solution...";
      ILST.dispatch(applySolution).then(() => {
        if ($scope.status !== "done!") {
          $scope.status = "calculate next solution...";
        }
      });
    }).catch(err => {
      $scope.status = "Global Facepalm! " + err;
    });
  };
};

/**
 * Отметимся в Ангуляре как контроллер
 */
app.controller("ctrlMain", ["$scope", "ILST", "Solver", controller]);
