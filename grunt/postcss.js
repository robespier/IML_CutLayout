"use strict";

module.exports = {
  /**
   * Style linter
   */
  lint: {
    options: {
      processors: [ require("stylelint")() ],
    },
    src: "src/**/*.less",
  }
};
