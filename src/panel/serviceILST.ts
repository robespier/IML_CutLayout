import { app } from "./index";

import { config } from "../config";
import { CSInterface } from "CSInterface";

const cs = new CSInterface();

const service = ($q: angular.IQService): ILSTService => {
  /**
   * Передаём команду в функцию `marshal` из контекста ILST.
   *
   * @param {CEPCommand} command
   */
  const dispatch = (command: CEPCommand): ng.IPromise<CEPResponse> => {
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
app.factory("ILST", ["$q", service]);
