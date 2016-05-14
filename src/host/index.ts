import * as cepHandlers from "./handlers";

/**
 * Диспетчер команд CEP в Иллюстратор, великий и ужасный.
 *
 * @param {CEPCommand} cmd
 * @returns {string}
 */
function marshal(cmd: CEPCommand): string {
  const executor = cepHandlers[cmd.handler];
  return executor(cmd.data);
}

/**
 * Светим диспетчера в глобальной области, чтобы CEP смог за него зацепиться
 */
$.global["marshal"] = marshal;
