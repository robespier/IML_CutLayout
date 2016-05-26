"use strict";

module.exports = {
  options: {
    compress: process.env.NODE_ENV === "development" ? false : true,
    paths: ["less"],
  },
  app: {
    files: {
      "<%= dist %>/css/styles.css": [ "less/main.less", "src/**/*.less" ]
    }
  }
};
