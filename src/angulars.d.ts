/**
 * Общие интерфейсы компонентов на Ангуляре
 */

interface ILSTService {
  /**
   * Двинуть команду в ILST
   */
  dispatch(command: CEPCommand): ng.IPromise<CEPResponse>;
}
