import * as cepHandlers from "./handlers"; // Coming soon!

/**
 * Диспетчер команд CEP в Иллюстратор, великий и ужасный.
 *
 * @param {any} cmd
 * @returns {string}
 */
function marshal(cmd): string {
  const executor = cepHandlers[cmd.handler];
  return executor(cmd.data);
}

/**
 * Светим диспетчера в глобальной области, чтобы CEP смог за него зацепиться
 */
$.global["marshal"] = marshal;
