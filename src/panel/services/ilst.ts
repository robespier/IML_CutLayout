import { app } from "../index";

const service = (
  $q: ng.IQService,
  cs: CSInterface.CSInterfaceInstance,
  config: ICommonConfig
  ): ILSTService => {
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
        const response = <CEPResponse>JSON.parse(result);
        if (response.error) {
          deferred.reject(response.error);
        } else {
          deferred.resolve(response);
        }
      } catch (err) {
        deferred.reject(err);
      }
    });
    return deferred.promise;
  };

  return {
    dispatch,
  };
};

/**
 * Отметимся в Ангуляре как сервис
 */
app.factory("ILST", ["$q", "CSInterface", "CommonConfig", service]);
