"use strict";

module.exports = {
  options: {
    compress: process.env.NODE_ENV === "production" ? true : false,
    paths: ["less"],
  },
  app: {
    files: {
      "<%= dist %>/css/styles.css": [ "less/main.less", "src/**/*.less" ]
    }
  }
};
