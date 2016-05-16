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
app.controller("ctrlMain", ["$scope", "ILST", function($scope, ILST) {
    $scope.section = {
        label_type: 'section/label_type.html',
        trim_offset: 'section/trim_offset.html',
        material_name: 'section/material_name.html',
        material_width: 'section/material_width.html',
        nonworking_area: 'section/non-working_area.html',
        printing_machine: 'section/printing_machine.html',
        forme_roller: 'section/forme_roller.html',
        layout_type: 'section/layout_type.html',
        advanced_options: 'section/advanced_options.html',
        printing: 'section/printing.html',
        action: 'section/action.html',
        report_summary: 'section/report_summary.html'
    };
}]);
