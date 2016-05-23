/**
 * CSInterface - v6.1.0
 *
 * !!! MINIMAL !!!
 */

interface RGBColor {
  alpha: number;
  green: number;
  blue: number;
  red: number;
}

interface AppColor {
  antialiasLevel: number;
  type: number;
  color: RGBColor;
}

interface AppSkinInfo {
  appBarBackgroundColorSRGB: AppColor;
  appBarBackgroundColor: AppColor;
  baseFontFamily: number;
  baseFontSize: number;
  panelBackgroundColor: AppColor;
  panelBackgroundColorSRGB: AppColor;
  systemHighlightColor: RGBColor;
}

interface HostEnvironment {
  appId: string;
  appLocale: string;
  appName: string;
  appSkinInfo: AppSkinInfo;
  appUILocale: string;
  appVersion: string;
  isAppOnline: boolean;
}

interface CSEvent {
  appId: string;
  data?: any;
  extensionId: string;
  scope: string;
  type: string;
}

declare namespace CSInterface {
  interface CSInterfaceInstance {
    /**
     * Registers an interest in a CEP event of a particular type, and
     * assigns an event handler.
     * The event infrastructure notifies your extension when events of this type occur,
     * passing the event object to the registered handler function.
     *
     * @param {string} event The name of the event type of interest.
     * @param {function} callback The JavaScript handler function or method.
     * @param {Object} [obj] Optional, the object containing the handler method, if any.
     */
    addEventListener(event: string, callback: (data: CSEvent) => void, obj?: any);

    /**
     * Retrieves information about the host environment in which the extension
     * is currently running.
     *
     * @return {HostEnvironment}
     */
    getHostEnvironment(): HostEnvironment;

    /**
     * Evaluates a JavaScript script, which can use the JavaScript DOM
     * of the host application.
     *
     * @param {string} script The JavaScript script.
     * @param {function} [callback] A callback function that receives the result
     * of execution. If execution fails, the callback function receives the error
     * message EvalScript_ErrMessage.
     */
    evalScript(script: string, callback?: (result: string) => void): void;

    /**
     * Removes a registered event listener.
     *
     * @param {string} event The name of the event type of interest.
     * @param {function} callback The JavaScript handler function or method that was registered.
     * @param {Object} [obj] Optional, the object containing the handler method, if any.
     */
    removeEventListener(event: string, callback: (data: CSEvent) => void, obj?: any);
  }

  interface CSInterfaceConstructor {
    new(): CSInterfaceInstance;

    /**
     * User can add this event listener to handle native application theme color changes.
     * Callback function gives extensions ability to fine-tune their theme color after the
     * global theme color has been changed.
     * The callback function should be like below:
     *
     * @example
     * // event is a CSEvent object, but user can ignore it.
     * function OnAppThemeColorChanged(event)
     * {
     *    // Should get a latest HostEnvironment object from application.
     *    var skinInfo = JSON.parse(window.__adobe_cep__.getHostEnvironment()).appSkinInfo;
     *    // Gets the style information such as color info from the skinInfo,
     *    // and redraw all UI controls of your extension according to the style info.
     * }
     */
    THEME_COLOR_CHANGED_EVENT: string;
  }

  var CSInterface: CSInterfaceConstructor;
}

declare module "CSInterface" {
  export = CSInterface;
}
