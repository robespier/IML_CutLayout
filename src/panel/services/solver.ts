import { app } from "../index";

/**
 * Import predefined solutions
 */
import { solution as solution1 } from "./3075_eticetka.ai";

const pump = (deferred): void => {
  deferred.notify(solution1);
};

const service = ($timeout: ng.ITimeoutService, $q: ng.IQService) => {
  /**
   * Фейковая реализация Solver;
   *
   * Через произвольное время выдаём заранее известный результат
   */
  const solve = (data, options): ng.IPromise<ISolution> => {
    const deferred = $q.defer();
    const fn = pump.bind(this, deferred);

    $timeout( fn, Math.random() * 10000 ).then(() => {
      return $timeout( fn, Math.random() * 10000 );
    }).then(() => {
      return $timeout( fn, Math.random() * 10000 );
    }).then(() => {
      return $timeout( fn, Math.random() * 10000 );
    }).then(() => {
      return $timeout( fn, Math.random() * 10000 );
    }).then(() => {
      return $timeout( fn, Math.random() * 10000 );
    }).then(() => {
      return $timeout( fn, Math.random() * 10000 );
    }).then(() => {
      return $timeout( fn, Math.random() * 10000 );
    }).then(() => {
      return $timeout( fn, Math.random() * 10000 );
    }).then(() => {
      return $timeout( fn, Math.random() * 10000 );
    }).then(() => {
      // Ctrl+V foreva, но промис нужно разрезолвить.
      deferred.resolve();
    });

    return deferred.promise;
  };

  return {
    solve,
  };
};

/**
 * Отметимся в Ангуляре как сервис
 */
app.factory("Solver", ["$timeout", "$q", service]);
