/**
 * CSInterface - v6.1.0
 *
 * !!! MINIMAL !!!
 */

declare module "CSInterface" {
  interface CSInterfaceInstance {
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
  }

  interface CSInterfaceConstructor {
    new(): CSInterfaceInstance;
  }

  export var CSInterface: CSInterfaceConstructor;
}
