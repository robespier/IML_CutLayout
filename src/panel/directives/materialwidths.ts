import { app } from "../index";

const wrapperClass = "iml-widths";
const widthsClass = "iml-width";
const activeWidthClass = "iml-width--selected";

const render = (values: number[], selected: number[]) => {
  let wrapped = "";
  values.forEach(val => {
    let classes = [widthsClass];
    if (selected.lastIndexOf(val) !== -1) {
      classes.push(activeWidthClass);
    }
    wrapped += `<span class="${classes.join(" ")}"><span>${val}</span></span>`;
  });
  return `<div class="${wrapperClass}">${wrapped}</div>`;
};

const link = (scope, element, attrs) => {
  scope.$watch(attrs.ngModel, (next: IMaterials, prev: IMaterials) => {
    if (next) {
      const data = render(next.width, scope.widths);
      element.html(data);
    }
  }, true);

  const toggle = (event) => {
    const target = jQuery(event.target);

    if (target.hasClass(wrapperClass)) {
      // Hit between the buttons
      return;
    }

    const value = parseFloat(target.text());

    if (isNaN(value)) {
      return;
    }

    let widths = typeof(scope.widths) === "string"
      ? scope.widths.split(/[ ,]/).map(parseFloat)
      : scope.widths.slice(0);

    if (widths.indexOf(value) === -1) {
      target.addClass(activeWidthClass);
      widths.push(value);
    } else {
      if (widths.length > 1) {
        target.removeClass(activeWidthClass);
        widths.splice(scope.widths.indexOf(value), 1);
      }
    };
    scope.$apply(() => {
      scope.setAppData({ "widths": widths.sort() });
    });
  };

  element.on("click", toggle);

  element.on("$destroy", () => {
    element.off();
  });
};

const directive = () => {
  return {
    link,
    require: "ngModel",
    restrict: "E",
  };
};

app.directive("imlWidths", [directive]);
