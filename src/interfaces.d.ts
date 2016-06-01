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
interface ICommonOptions {
  /**
   * Вал
   */
  materialHeight?: number;

  /**
   * Техническая область (обе рельсы)
   */
  nonWorkingArea?: number;

  /**
   * Поля на вылет
   */
  trimOffset?: number;

  /**
   * Выбранные порезы
   */
  widths?: number[];
}

interface AppDataService extends ICommonOptions {
  /**
   * Выбранный в селекторе материал
   */
  material?: IMaterials;

  /**
   * Массив характеристик запечатываемых материалов
   */
  materials?: IMaterials[];

  /**
   * Ширина пореза по умолчанию
   */
  materialWidth?: number;
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

/**
 * Application state
 */
interface IAppState extends AppDataService {
  status: string;
}

/**
 * Reducers
 */
interface IRootReducer {
  ui: IAppState
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
 * Контур в ILST
 */
interface IFigure {
  /**
   * Направление (полярность)
   */
  direction: number;

  placement: IPlacement;

  points: IPoint[];
}

/**
 * Формат решения
 */
interface ISolution {
  /**
   * Область размещения
   */
  area: IFigure;

  /**
   * Размещения
   */
  cuts: IPlacement[];

  /**
   * Ширина пореза и длина вала, для которых рассчитано решение
   */
  dimensions: number[];
}
