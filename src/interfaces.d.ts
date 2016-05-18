/**
 * Общие интерфейсы компонентов приложения
 */

/**
 * Протокол CEP->ILST
 */
interface CEPCommand {
  /**
   * Имя метода, который обрабатывает запрос на стороне Иллюстратора
   */
  handler: string;

  /**
   * Набор данных для этого метода
   */
  data?: any;
}

/**
 * Ответ ILST->CEP
 */
interface CEPResponse {
  /**
   * Статус обработки команды
   */
  status: string;
}

/**
 * Точка (1/2 сплайна Безье) в ILST
 */
interface IPoint {
  /**
   * Point position
   */
  anchor: number[];

  /**
   * In control point
   */
  leftPosition: number[];

  /**
   * Out control point
   */
  rightPosition: number[];
}

/**
 * Позиция контура в ILST
 */
interface IPlacement {
  /**
   * Угол наклона оригинального контура
   */
  angle: number;

  /**
   * Верхний левый угол контура (bounding box без stroke, в пунктах)
   */
  position: number[];
}

/**
 * Формат решения
 */
interface ISolution {
  /**
   * Область размещения
   */
  area: IPoint[];

  /**
   * Размещения
   */
  cuts: IPlacement[];
}
