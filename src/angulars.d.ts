/**
 * Общие интерфейсы компонентов на Ангуляре
 */

/**
 * Adobe Illustrator provider
 */
interface ILSTService {
  /**
   * Двинуть команду в ILST
   */
  dispatch(command: CEPCommand): ng.IPromise<CEPResponse>;
}

/**
 * Placements provider
 */
interface SolverSerivce {
  solve(data: any): ng.IPromise<ISolution>;
}

/**
 * Available localization keys
 */
interface ILocalizations {
  buttons: {
    go: string;
  };
  commons: {
    mm: string;
  };
  labels: {
    advancedOptions: string;
    materialName: string;
    materialWidth: string;
    nonWorkingArea: string;
    printing: string;
    reportSummary: string;
    trimOffset: string;
  };
  status: {
    applying: string;
    done: string;
    fuckup: string;
    next: string;
    solverFail: string;
    started: string;
  };
}
