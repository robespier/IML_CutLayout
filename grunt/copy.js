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
  },

  /**
   * Копирование расширения куда надо
   * @see https://github.com/Adobe-CEP/CEP-Resources/wiki/CEP-6-HTML-Extension-Cookbook-for-CC-2015#where-are-the-extensions
   *
   * Аналог exec:sync для Windows
   */
  deploy: {
    expand: true,
    cwd: path.join(__dirname, "..", "<%= dist %>"),
    src: [
      ".debug",
      "css/**",
      "CSXS/**",
      "js/**",
      "jsx/**",
      "index.html",
    ],
    dest: path.join(process.env.APPDATA || "/tmp/", "Adobe/CEP/extensions", "<%= pkg.name %>")
  }
};
