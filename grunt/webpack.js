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
  adobecep: {
    devtool: "inline-source-map",
    entry: [
      path.join(__dirname, "..", "<%= cepSrc %>", "index.ts")
    ],
    externals: [
      { fs: "require('fs')" },
    ],
    module: {
      loaders: [
        { test: /CSInterface\.js$/, loader: "exports?CSInterface=CSInterface" }
      ]
    },
    output: {
      path: path.join(__dirname, "..", "<%= dist %>", "<%= cepDstPath %>"),
      filename: "<%= cepDstName %>",
      pathinfo: true,
    },
    resolve: {
      root: [
        path.resolve(__dirname, "..", "src/vendor")
      ],
    },
  }
};
