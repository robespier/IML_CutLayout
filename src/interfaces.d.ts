/**
 * Общие интерфейсы компонентов приложения
 */

interface ICommonConfig {
  /**
   * Имя метода на стороне ILST, выполняющего запросы CEP
   */
  connector: string;

  /**
   * Данные пользователя по умолчанию
   */
  defaults: AppDataService;
}

/**
 * Persistent user data
 */
interface AppDataService {
  /**
   * Массив характеристик запечатываемых материалов
   */
  materials?: IMaterials[];

  /**
   * Вал
   */
  materialHeight?: number;

  /**
   * Ширина рулона
   */
  materialWidth?: number;

  /**
   * Техническая область (обе рельсы)
   */
  nonWorkingArea?: number;

  /**
   * Поля на вылет
   */
  trimOffset?: number;
}

interface IValueItem {
  id: string;
  text: string;
}

interface ILabeledValueItem extends IValueItem {
  label: string;
}

interface IMaterials extends ILabeledValueItem {
  type: string;
  width: number[];
}

interface IReduxAction {
  type: string;
  payload: any;
}

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

  /**
   * Error object
   */
  error?: any;

  /**
   * Данные, возвращаемые методом
   */
  data?: any;
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

  /**
   * Ширина пореза и длина вала, для которых рассчитано решение
   */
  dimensions: number[];
}
