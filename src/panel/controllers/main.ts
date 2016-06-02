import { omit, zipObject } from "lodash";
import { app } from "../index";
import { setAppData } from "../actions";

/**
 * Интерфейс $scope
 */
interface IMainScope extends ng.IScope, AppDataService {
  /**
   * Выполнить что-либо на стороне ILST
   */
  go(): void;

  /**
   * Dispatch app settings to Redux store
   */
  setAppData(data: AppDataService): void;

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
  $ngRedux,
  $scope: IMainScope,
  strings,
  ILST: ILSTService,
  solver: SolverSerivce
  ) => {
  $scope.go = () => {
    /**
     * Copy application state without useless params as options for Solver
     */
    const options = <ICommonOptions>omit($ngRedux.getState().ui, [
      "material", "materials",
    ]);

    /**
     * Run solver.start with contour and options, returns "main worker" Promise
     */
    const solverStart = (result: CEPResponse) => {
      $scope.status = $scope.t.status.started;
      return solver.start(<IFigure>result.data, options);
    };

    /**
     * When Solver finished
     */
    const solverDone = () => {
      $scope.status = $scope.t.status.done;
    };

    /**
     * Errors handler from ILST
     */
    const errIlst = (err) => {
      solver.stop();
      $scope.status = $scope.t.status.fuckup + err;
    };

    /**
     * Errors handler from Solver
     */
    const errSolver = (err) => {
      $scope.status = $scope.t.status.solverFail  + err;
    };

    /**
     * Pass Solver result to ILST
     */
    const dispathSolution = (solution: ISolution) => {
      const applySolution: CEPCommand = {
        data: solution,
        handler: "applySolution",
      };

      $scope.status = $scope.t.status.applying;

      ILST.dispatch(applySolution).then(() => {
        if ($scope.status !== $scope.t.status.done) {
          $scope.status = $scope.t.status.next;
        }
      });
    };

    /**
     * This method on ILST side provides <IFigure> object
     */
    const getContour: CEPCommand = {
      handler: "getContour",
    };

    /**
     * Here we go! Get initial contour from ILST and pass it to Solver
     */
    const runner = ILST.dispatch(getContour).then(solverStart, errIlst);

    /**
     * Dispatch solutions coming from Solver into ILST
     * until Solver is done or user press Abort somehow
     */
    runner.then(solverDone, errSolver, dispathSolution);
  };

  /**
   * Localization strings
   * From state, from browser or Russian by default
   */
  const lang = $scope.lang || strings[navigator.language] || strings["ru"];
  $scope.t = lang;

  /**
   * Отражение свойств state на $scope
   */
  const mapStateToProps = (state: IRootReducer) => {
    return state.ui;
  };

  const disconnect = $ngRedux.connect(mapStateToProps, {setAppData})($scope);

  $scope.$on("$destroy", disconnect);

  /**
   * Dispatch "scalar" (binded with just `ng-model`) changes to Redux store
   */
  const bindings = ["nonWorkingArea", "printing", "trimOffset", "widths"];
  $scope.$watchGroup(bindings, (next) => {
    if (typeof(next) !== "undefined") {
      const update = zipObject(bindings, next);
      $scope.setAppData(update);
    }
  });

  /**
   * Cascade update
   *
   * Clone widths of selected material
   */
  $scope.$watch("material", (next: IMaterials) => {
    if (next) {
      const update = {
        widths: next.width.slice(0, 1), // min width by default
      };
      $scope.setAppData(update);
    }
  }, true);
};

/**
 * Отметимся в Ангуляре как контроллер
 */
app.controller("ctrlMain", [
  "$ngRedux",
  "$scope",
  "Strings",
  "ILST",
  "Solver",
  controller,
]);
