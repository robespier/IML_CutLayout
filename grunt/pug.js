"use strict";

module.exports = {
  main: {
    options: {
      pretty: true,
      data: function() {
        return require("../src/html/index.json");
      }
    },
    files: {
      "<%= dist %>/index.html": ["src/html/index.pug"],
    }
  }
};
