/**
 * Trivial wrapper Select2 4.x in Angular directive
 *
 * @see https://select2.github.io/
 */

import "select2";
import { find } from "lodash";
import { app } from "../index";

/**
 * Register custom data adapter for Select2
 */
jQuery.fn.select2.amd.define("iml/data/customDataAdapter", [
  "select2/data/array",
  "select2/utils",
  ], (arrayData, utils) => {
  function CustomData ($element, options) {
    CustomData["__super__"].constructor.call(this, $element, options);
  }

  utils.Extend(CustomData, arrayData);

  return CustomData;
});

const dataAdapter = jQuery.fn.select2.amd.require("iml/data/customDataAdapter");

/**
 * Link directive function
 */
const link = (scope, element, attrs) => {
  /**
   * Parent controller item list
   */
  const data = <IValueItem[]>scope.items;

  /**
   * Initialize Select2
   */
  element.select2({
    containerCssClass: "container-theme",
    data: data,
    dataAdapter: dataAdapter,
    multiple: false,
  });

  dataAdapter.prototype.current = (callback) => {
    callback([ scope.activeItem ]);
  };

  element.bind("select2:select", event => {
    event.stopImmediatePropagation();
    if (scope.$$phase || scope.$root.$$phase) {
      return;
    }

    // Find reference to selected ValueItem object and update state
    const key = attrs.activeItem;
    const selectedItem = find(data, {id: event.params.data.id});
    const update = {[key]: selectedItem};
    scope.updateState(update);
  });

  /**
   * Update Select2 on state changes
   */
  scope.$watch("activeItem", (next, prev) => {
    if (next) {
      element.trigger("change");
    }
  });

  element.bind("$destroy", () => {
    element.select2("destroy");
  });
};

/**
 * Isolated scope mappings:
 *
 * items: parent <IValueItem> list
 * activeItem: ref to active item object
 * updateState: parent update state function
 */
const directive = () => {
  return {
    link,
    restrict: "A",
    scope: {
      activeItem: "=",
      items: "=",
      updateState: "=update",
    },
  };
};

app.directive("imlSelect2", [directive]);
