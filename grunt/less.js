"use strict";

module.exports = {
  options: {
    compress: process.env.NODE_ENV === "development" ? false : true,
    paths: ["src/less"],
  },
  app: {
    files: {
      "<%= dist %>/css/styles.css": [ "src/less/main.less", "src/**/*.less" ]
    }
  }
};
