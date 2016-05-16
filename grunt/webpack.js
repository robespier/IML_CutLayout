"use strict";

const path = require("path");
const webpack = require("webpack");

module.exports = {
  options: {
    plugins: [],
    module: {
      preLoaders: [
        { test: /\.tsx?$/, loader: "tslint-loader" }
      ],
      loaders: [
        { test: /\.tsx?$/, loader: "ts-loader" }
      ],
    },
    resolve: {
      root: [
        path.resolve(__dirname, "..", "src/vendor")
      ],
      extensions: ['', '.js', '.ts', '.tsx']
    },
  },

  /**
   * TypeScript -> ES3 для Иллюстратора
   */
  adobejsx: {
    entry: [
      path.join(__dirname, "..", "<%= ilstSrc %>", "index.ts")
    ],
    output: {
      path: path.join(__dirname, "..", "<%= dist %>", "<%= ilstDstPath %>"),
      filename: "<%= ilstDstName %>",
      pathinfo: true,
    },
    plugins: [
      new webpack.ProvidePlugin({
        JSON: "json2",
      }),
    ],
  },

  /**
   * TypeScript -> ES5 для CEP
   */
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
  }
};
