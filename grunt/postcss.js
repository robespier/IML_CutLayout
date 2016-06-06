"use strict";

module.exports = {
  /**
   * Build css grid with lost
   */
  grid: {
    options: {
      processors: [
        require("lost"),
        require("postcss-cssnext")({ browsers: ["last 2 version"] }),
      ],
    },
    src: "src/less/lost.css",
    dest: "src/less/grid.css",
  },

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
