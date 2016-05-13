declare var $: {
  /**
   * The ExtendScript build number.
   *
   * @readonly
   */
  build: number;

  /**
   * The date the current ExtendScript engine was built.
   *
   * @readonly
   */
  buildDate: Date;

  /**
   * The name of the current ExtendScript engine, if set.
   *
   * @readonly
   */
  engine: string;

  /**
   * The most recent run-time error information, contained in a JavaScript
   * Error object.
   *
   * Assigning error text to this property generates a run-time error;
   * however, the preferred way to generate a run-time error is to throw
   * an Error object.
   */
  error: Error | string;

  /**
   * The file name of the current script.
   *
   * @readonly
   */
  fileName: string;

  /**
   * Gets or sets low-level debug output flags. A logical AND of the
   * following bit flag values:
   *
   * 0x0002   (2): Displays each line with its line number as it is executed.
   * 0x0040  (64): Enables excessive garbage collection. Usually, garbage
   *               collection starts when the number of objects has increased
   *               by a certain amount since the last garbage collection.
   *               This flag causes ExtendScript to garbage collect after almost
   *               every statement. This impairs performance severely, but is
   *               useful when you suspect that an object gets released too soon.
   * 0x0080 (128): Displays all calls with their arguments and the return value
   * 0x0100 (256): Enables extended error handling (see strict).
   * 0x0200 (512): Enables the localization feature of the toString method.
   *               Equivalent to the localize property.
   */
  flags: number;

  /**
   * Provides access to the Global object, which contains the JavaScript
   * global namespace.
   */
  // @fixme global: Global;

  /**
   * The path for include files for the current script.
   *
   * @readonly
   */
  includePath: string;

  /**
   * The current debugging level, which enables or disables the
   * JavaScript debugger. Read only. One of:
   *
   * 0: No debugging
   * 1: Break on runtime errors
   * 2: Full debug mode
   */
  level: number;

  /**
   * Gets or sets the current locale. The string contains five characters in
   * the form LL_RR , where LL is an ISO 639 language specifier, and RR is
   * an ISO 3166 region specifier.
   *
   * Initially, this is the value that the application or the platform returns
   * for the current user. You can set it to temporarily change the locale
   * for testing. To return to the application or platform setting, set to
   * undefined, null, or the empty string.
   */
  locale: string;

  /**
   * Enable or disable the extended localization features of the built-in
   * toString method. See Localizing ExtendScript Strings.
   */
  localize: boolean;

  /**
   * Gets or sets the ExtendScript memory cache size in bytes.
   */
  memCache: number;

  /**
   * The current operating system version information.
   *
   * @readonly
   */
  os: string;

  /**
   * An array of objects containing information about the display screens
   * attached to your computer.
   * 
   * * Each object has the properties `left`, `top`, `right`, and `bottom`,
   *   which contain the four corners of each screen in global coordinates.
   * * A property `primary` is `true` if that object describes the primary
   *   display.
   */
  screens: number[]; // @fixme Describe interface

  /**
   * The current stack trace.
   */
  stack: string;

  /**
   * When `true`, any attempt to write to a read-only property causes a
   * runtime error. Some objects do not permit the creation of new
   * properties when `true`.
   */
  strict: boolean;

  /**
   * The version number of the ExtendScript engine as a three-part
   * number and description; for example: "3.6.5 (debug)"
   *
   * @readonly
   */
  version: string;

  /**
   * Displays the About box for the ExtendScript component, and returns the
   * text of the About box as a string.
   */
  about(): string;

  /**
   * Executes a breakpoint at the current position.
   *
   * @param {string} [condition] A string containing a JavaScript statement
   * to be used as a condition. If the statement evaluates to true or nonzero
   * when this point is reached, execution stops.
   * If no condition is needed, it is recommended that you use the JavaScript
   * `debugger` statement in the script, rather than this method.
   */
  bp(condition?: string): void;

  /**
   * Invokes the platform-specific color selection dialog, and returns the
   * selected color as a hexadecimal RGB value: `0xRRGGBB`.
   *
   * @param {string} [name] The color to be preselected in the dialog, as a
   * hexadecimal RGB value (0xRRGGBB), or -1 for the platform default.
   * @returns {number}
   */
  colorPicker(name?: string): number;

  /**
   * Loads a JavaScript script file from disk, evaluates it, and returns the
   * result of evaluation.
   *
   * @param {string} path The name and location of the file.
   * @param {number} [timeout] A number of milliseconds to wait before returning
   * `undefined`, if the script cannot be evaluated. Default is 10000 milliseconds.
   * @returns {any}
   */
  evalFile(path: string, timeout?: number): any;

  /**
   * Initiates garbage collection in the ExtendScript engine.
   */
  gc(): void;

  /**
   * Retrieves the value of the specified environment variable, or `null` if no
   * such variable is defined.
   *
   * @param {string} name
   * @returns {string}
   */
  getenv(name: string): string;

  /**
   * Sets the value of the specified environment variable, if no such variable
   * is defined.
   *
   * @param {string} envname The name of the environment variable.
   * @param {string} value The new value, a string.
   */
  setenv(name: string, value: string): void;

  /**
   * Suspends the calling thread for the given number of milliseconds.
   *
   * @param {number} milliseconds: The number of milliseconds to wait.
   * During a sleep period, checks at 100 millisecond intervals to see whether
   * the sleep should be terminated. This can happen if there is a break request,
   * or if the script timeout has expired.
   */
  sleep(milliseconds: number): void;

  /**
   * Writes the specified text to the JavaScript Console.
   *
   * @param {any} text One or more strings to write, which are concatenated to 
   * form a single string.
   */
  write(message?: any, ...optionalParams: any[]): void;

  /**
   * Writes the specified text to the JavaScript Console and appends a linefeed
   * sequence.
   *
   * @param {any} text One or more strings to write, which are concatenated to
   * form a single string.
   */
  writeln(message?: any, ...optionalParams: any[]): void;
}

/**
 * External Communication Tools
 */
declare var ExternalObject: {
  new(path: string): void;
}

interface HttpConnectionInstance {
  async: boolean;
  close(): boolean;
  execute(): boolean;
  pump(): boolean;
  status: number;
}

interface HttpConnectionConstructor extends HttpConnectionStatus {
  (url?: string): HttpConnectionInstance;
  new (url?: string): HttpConnectionInstance;
  prototype: HttpConnectionInstance;
}

interface HttpConnectionStatus {
  statusCompleted: boolean;
  statusIdle: boolean;
  statusRunning: boolean;
  statusSuspended: boolean;
  statusFailed: boolean;
}

declare var HttpConnection: HttpConnectionConstructor;


/**
 * Extended types definitions, used across different Adobe applications
 *
 * @see Illustrator CS3 JavaScript Reference.pdf
 */

/**
 * File and Folder Objects
 */
interface FileStatic {
  fs: string;
  decode(uri: string): string;
  encode(name: string): string;
  isEncodingAvailable(name: string): boolean;
  openDialog (prompt?: string, filter?: string, multiSelect?: boolean): FileInstance;
  saveDialog (prompt: string, filter?: string): FileInstance;
  // MacOS versions with filter functions
  openDialog (prompt?: string, filter?: (file: FileInstance) => boolean, multiSelect?: boolean): FileInstance;
  saveDialog (prompt: string, filter?: (file: FileInstance) => boolean): FileInstance;
}

interface FileInstance {
  absoluteURI: string;
  alias: boolean;
  created: Date;
  creator: string;
  displayName: string;
  encoding: string;
  eof: boolean;
  error: string;
  exists: boolean;
  fsName: string;
  fullName: string;
  hidden: boolean;
  length: number;
  lineFeed: string;
  modified: Date;
  name: string;
  parent: FolderInstance;
  path: string;
  readonly: boolean;
  relativeURI: string;
  type: string;
  changePath (path: string): boolean;
  close(): boolean;
  copy (target: string): boolean;
  copy (target: FileInstance): boolean;
  createAlias (path: string): boolean;
  execute(): boolean;
  getRelativeURI (basePath?: string): string;
  open (mode: "r"|"w"|"e", type?: string, creator?: string): boolean;
  openDlg (prompt?: string, filter?: string, multiSelect?: boolean): FileInstance; //@todo MacOS
  read (chars?: number): string;
  readch(): string;
  readln(): string;
  remove(): boolean;
  rename (newName: string): boolean;
  resolve(): FileInstance;
  saveDlg (prompt?: string, filter?: string): FileInstance; //@todo MaxOS
  seek (pos: number, mode?: number): boolean;
  tell(): number;
  write (text: string, ...optionalParams: string[]): boolean;
  writeln (text: string, ...optionalParams: string[]): boolean;
}

interface FileConstructor extends FileStatic {
  (path?: string): FileInstance;
  new(path?: string): FileInstance;
  prototype: FileInstance;
}

declare var File: FileConstructor;

/**
 * Folder Object
 */
interface FolderStatic {
}

interface FolderInstance {
  name: string;
  parent: FolderInstance;
}

interface FolderConstructor extends FolderStatic {
  new(path?: string): FolderInstance;
  prototype: FolderInstance;
}

declare var Folder: FolderConstructor;


/**
 * User Notification Dialogs
 */
declare function alert(message: string, title?: string, errorIcon?: boolean): void;
declare function confirm(message: string, noAsDflt?: boolean, title?: string): boolean;
declare function prompt(mmessage: string, preset: string, title?: string): string | void;
