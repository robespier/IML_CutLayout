import "angular";

const app = angular.module("iml", []);

/**
 * После того, как модуль создан, можно заявлять "наши" сервисы.
 * В иной последовательности будет зихер.
 */
import "./serviceILST";
import "./serviceSolver";

interface MainScope extends ng.IScope {
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

const ctrlMain = (
  $scope: MainScope,
  ILST: ILSTService,
  solver: SolverSerivce
) => {

  $scope.go = () => {
    solver.solve("something").then(result => {
      /**
       * Применяем решение на активном документе в ILST
       */
      const command: CEPCommand = {
        handler: "applySolution",
        data: result,
      };

      return ILST.dispatch(command);
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
app.controller("ctrlMain", ["$scope", "ILST", "Solver", ctrlMain]);

export {
  app,
}
