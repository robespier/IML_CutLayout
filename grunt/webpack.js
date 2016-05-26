"use strict";

const path = require("path");
const webpack = require("webpack");

const config = {
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
    output: {
      pathinfo: true,
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
    },
  }
};

/**
 * Optimize bundles for production mode (default)
 */
if (process.env.NODE_ENV !== "development") {
  config.options.plugins = [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      test: /\.jsx?$/,
      "screw-ie8": true,
      compress: true,
      sourceMap: false,
    })
  ];

  config.options.output.pathinfo = false;
}

module.exports = config;
