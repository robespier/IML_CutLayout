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
