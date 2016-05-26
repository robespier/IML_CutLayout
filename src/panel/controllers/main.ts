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
   * App language
   */
  lang: string;

  /**
   * Localization strings
   */
  t: ILocalizations;

  /**
   * Результат ILST действия
   */
  status: string;
}

const controller = (
  $scope: IMainScope,
  strings,
  ILST: ILSTService,
  solver: SolverSerivce
  ) => {
  $scope.go = () => {
    /**
     * Покажем фидбек Марине, что процесс пошел
     */
    $scope.status = $scope.t.status.started;

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
      $scope.status = $scope.t.status.done;
    }, err => {
      $scope.status = $scope.t.status.solverFail  + err;
    }, notify => {
      const applySolution: CEPCommand = {
        data: notify,
        handler: "applySolution",
      };
      $scope.status = $scope.t.status.applying;
      ILST.dispatch(applySolution).then(() => {
        if ($scope.status !== $scope.t.status.done) {
          $scope.status = $scope.t.status.next;
        }
      });
    }).catch(err => {
      $scope.status = $scope.t.status.fuckup + err;
    });
  };

  /**
   * Localization strings
   * From state, from browser or Russian by default
   */
  const lang = $scope.lang || strings[navigator.language] || strings["ru"];
  $scope.t = lang;
};

/**
 * Отметимся в Ангуляре как контроллер
 */
app.controller("ctrlMain", [
  "$scope",
  "Strings",
  "ILST",
  "Solver",
  controller,
]);
