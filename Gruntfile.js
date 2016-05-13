"use strict";

module.exports = function(grunt) {
  require("load-grunt-config")(grunt, {
    data: {
      ccVersion: "6",

      /**
       * Root of CEP extension ready for deploy
       */
      dist: "dist",

      /**
       * Illustrator-side sources and destination
       */
      ilstSrc: "src/host/",
      ilstDstPath: "jsx",
      ilstDstName: "hostscript.jsx",

      /**
       * Browser-side sources and destination
       */
      cepSrc: "src/panel/",
      cepDstPath: "js",
      cepDstName: "scripts.js",

      pkg: grunt.file.readJSON("package.json"),
    }
  });
};