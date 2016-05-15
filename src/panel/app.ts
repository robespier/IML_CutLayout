const app = angular.module('CutLayout', [ ]);
app.controller('LayoutController', ['$scope', function($scope) {
    $scope.section = {
            label_type: 'section/label_type.html',
            trim_offset: 'section/trim_offset.html',
            material_name: 'section/material_name.html',
            material_width: 'section/material_width.html',
            non-working_area: 'section/non-working_area.html',
            printing_machine: 'section/printing_machine.html',
            forme_roller: 'section/forme_roller.html',
            layout_type: 'section/layout_type.html',
            advanced_options: 'section/advanced_options.html',
            printing: 'section/printing.html',
            action: 'section/action.html',
            report_summary: 'report_summary.html'
    };
}]);
