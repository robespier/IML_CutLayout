"use strict";

const path = require("path");

module.exports = {
  /**
   * "Доукомплектация" dist
   */
  extension: {
    expand: true,
    cwd: path.join(__dirname, "..", "<%= extSrc %>"),
    src: [
      ".debug",
      "CSXS/**",
      "index.html",
    ],
    dest: path.join(__dirname, "..", "<%= dist %>")
  }
};
