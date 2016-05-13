"use strict";

module.exports = {
  less: {
    files: ["less/main.less", "src/**/*.less"],
    tasks: ["less"],
  },
  adobejsx: {
    files: ["<%= ilstSrc %>/**/*.ts"],
    tasks: ["webpack:adobejsx"],
  },
  adobecep: {
    files: "<%= cepSrc %>/**/*.ts",
    tasks: ["webpack:adobecep"],
  },
  sync: {
    files: ["<%= dist %>/**/*.*"],
    tasks: ["exec:sync"],
  },
};
