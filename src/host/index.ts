import * as cepHandlers from "./handlers";
import { config } from "../config";

/**
 * Диспетчер команд CEP в Иллюстратор, великий и ужасный.
 *
 * @param {CEPCommand} cmd
 * @returns {string} JSON encoded CEPResponse
 */
function marshal(cmd: CEPCommand): string {
  const executor = cepHandlers[cmd.handler];
  try {
    const result = executor(cmd.data);
    return JSON.stringify(result);
  } catch (err) {
    return JSON.stringify({ error: err, status: "failure" });
  }
}

/**
 * Светим диспетчера в глобальной области, чтобы CEP смог за него зацепиться
 */
$.global[config.connector] = marshal;
