"use strict";

const path = require("path");
const webpack = require("webpack");

module.exports = {
  options: {
    plugins: [],
    module: {
      loaders: [
        { test: /\.tsx?$/, loader: "ts-loader" }
      ],
    },
  },
  adobejsx: {
    entry: [
      path.join(__dirname, "..", "<%= ilstSrc %>", "index.ts")
    ],
    output: {
      path: path.join(__dirname, "..", "<%= dist %>", "<%= ilstDstPath %>"),
      filename: "<%= ilstDstName %>",
      pathinfo: true,
    },
  },
};
