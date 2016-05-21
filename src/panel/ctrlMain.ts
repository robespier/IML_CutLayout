import { app } from "./index";

/**
 * Интерфейс $scope
 */
interface IMainScope extends ng.IScope {
  /**
   * Выполнить что-либо на стороне ILST
   */
  go(): void;

  section: Object;

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

  $scope.section = {
    action: "section/action.html",
    advanced_options: "section/advanced_options.html",
    forme_roller: "section/forme_roller.html",
    label_type: "section/label_type.html",
    layout_type: "section/layout_type.html",
    material_name: "section/material_name.html",
    material_width: "section/material_width.html",
    nonworking_area: "section/non-working_area.html",
    printing: "section/printing.html",
    printing_machine: "section/printing_machine.html",
    report_summary: "section/report_summary.html",
    trim_offset: "section/trim_offset.html",
  };
};

/**
 * Отметимся в Ангуляре как контроллер
 */
app.controller("ctrlMain", ["$scope", "ILST", "Solver", controller]);
