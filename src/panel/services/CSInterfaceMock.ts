/**
 * Mock CSInterface object for debug frontend outside Illustrator
 *
 * See webpack config for details
 */
export class CSInterface {
  addEventListener(event, fn) { };
  removeEventListener(event, fn) { };

  getHostEnvironment() {
    return {
      appSkinInfo: {
        baseFontFamily: "Verdana",
        baseFontSize: 10,
        panelBackgroundColor: {
          antialiasLevel: 1,
          color: {
            alpha: 255,
            blue: 72.46,
            green: 72.46,
            red: 72.46,
          },
          type: 1,
        },
      },
    };
  };

  evalScript(script, callback) {
    const response: CEPResponse = {
      status: "done",
    };
    const fn = callback.bind(this, JSON.stringify(response));
    setTimeout(fn, 1000);
  };
}
