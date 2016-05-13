"use strict";

module.exports = function(grunt) {
  require("load-grunt-config")(grunt, {
    data: {
      ccVersion: "6",
      dist: "dist",
      pkg: grunt.file.readJSON("package.json"),
    }
  });
};
