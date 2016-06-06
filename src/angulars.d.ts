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
  /**
   * Send in-between result to app (async)
   */
  //notify(solution: ISolution): void;

  /**
   * Start main iterations loop
   */
  start(data: IFigure, options: ICommonOptions): ng.IPromise<ISolution>;

  /**
   * Abort
   */
  stop(reason?: string): void;
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
    cnt: string;
  };
  labels: {
    advancedOptions: string;
    materialName: string;
    materialWidth: string;
    nonWorkingArea: string;
    optArbitrary: string;
    printing: string;
    reportSummary: string;
    trimOffset: string;
  };
  messages: {
    warnArbitrary: string;
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
