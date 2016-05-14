"use strict";

/**
 * Добавить к заданию удаленной синхронизации локальное
 * копирование, если разработка идёт на Windows
 */
let syncTask = ["exec:sync"];

if (process.platform === "win32") {
  syncTask.push("copy:deploy");
}

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
    tasks: syncTask,
  },
};
