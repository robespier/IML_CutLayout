import { CSInterface } from "CSInterface";

const cs = new CSInterface();

/**
 * Собираемся выполнить на стороне ILST метод `docCloser`, без параметров.
 */
const command: CEPCommand = {
  handler: "docCloser",
};

/**
 * Обработчик ответа от ILST
 */
const responseHandler = (result) => {
  try {
    JSON.parse(result);
  } catch (err) {
    console.error(result, err);
  }
};

/**
 * Передаём команду в функцию `marshal` из контекста ILST.
 *
 * На той стороне маршал вытащит имя метода `docCloser` и выполнит его.
 * Результат исполнения `docCloser` отдастся тут responseHandler-у.
 */
cs.evalScript(`marshal(${JSON.stringify(command)})`, responseHandler);
