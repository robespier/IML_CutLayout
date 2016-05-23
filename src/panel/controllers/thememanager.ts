/**
 * Theme Manager
 *
 * Note about connecting: controller MUST declared in <link> element
 */
import { app } from "../index";

/**
 * Convert the Color object to string in hexadecimal format;
 */
const toHex = (color) => {
  const computeValue = (prev, value) => {
    if (value < 0) {
        value = 0;
    } else if (value > 255) {
        value = 255;
    }

    let computedValue = Math.floor(value).toString(16);

    if (computedValue.length === 1) {
     computedValue = "0" + computedValue;
    }

    return prev + computedValue;
  };

  const { red, green, blue } = color;
  return "#" + [ red, green, blue ].reduce(computeValue, "");
};

const controller = (
  $element: Element,
  $scope: ng.IScope,
  csInterface: CSInterface.CSInterfaceInstance
  ) => {
  /**
   * Locate CSS stylesheet
   */
  const css = <CSSStyleSheet>$element[0].sheet;

  /**
   * Add rule at end of stylesheet
   */
  const applyRule = (selector: string, rule: string): void => {
    css.addRule(selector, rule, css.rules.length);
  };

  /**
   * Fired when user change host application theme in preferences;
   */
  const updateTheme = () => {
    const hostTheme = csInterface.getHostEnvironment().appSkinInfo;

    /**
     * Apply host theme to <body> element
     */
    const bodyColor = toHex(hostTheme.panelBackgroundColor.color);
    const bodyStyle = [
      `background-color: ${bodyColor}`,
      `font-family: "${hostTheme.baseFontFamily}"`,
      `font-size: ${hostTheme.baseFontSize}px`,
    ];
    applyRule("body", bodyStyle.join(";"));
  };

  /**
   * Cleanup
   */
  const disconnect = () => {
    csInterface.removeEventListener(event, updateTheme);
  };

  const event = "com.adobe.csxs.events.ThemeColorChanged"; //@fixme
  csInterface.addEventListener(event, updateTheme);
  $scope.$on("$destroy", disconnect);

  /**
   * Theme extension on init
   */
  updateTheme();
};

app.controller("ctrlThemeManager", [
  "$element",
  "$scope",
  "CSInterface",
  controller,
]);
