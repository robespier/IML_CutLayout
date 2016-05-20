import { app } from "./index";

/**
 * Import predefined solutions
 */
import { solution as solution1 } from "./3075_eticetka.ai";

const pump = (): ISolution => {
  return solution1;
};

const service = ($timeout: ng.ITimeoutService) => {
  /**
   * Фейковая реализация Solver;
   *
   * Через произвольное время выдаём заранее известный результат
   */
  const solve = (data): ng.IPromise<ISolution> => {
    return $timeout( pump, Math.random() * 10000 );
  };

  return {
    solve,
  };
};

/**
 * Отметимся в Ангуляре как сервис
 */
app.factory("Solver", ["$timeout", service]);
