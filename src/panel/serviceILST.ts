import "angular";

import { config } from "../config";
import { CSInterface } from "CSInterface";

const cs = new CSInterface();

const service = ($q: angular.IQService) => {
  /**
   * Передаём команду в функцию `marshal` из контекста ILST.
   *
   * @param {CEPCommand} command
   */
  const dispatch = (command: CEPCommand) => {
    const deferred = $q.defer();
    const executor = `${config.connector}(${JSON.stringify(command)})`;
    cs.evalScript(executor, (result) => {
      try {
        deferred.resolve(JSON.parse(result));
      } catch (err) {
        deferred.reject(err);
      }
    });
    return deferred.promise;
  };

  return {
    dispatch
  };
};

/**
 * Отметимся в Ангуляре как сервис
 */
angular.module("iml").factory("ILST", ["$q", service]);
