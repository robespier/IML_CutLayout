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
      alias: {
        select2: path.resolve(__dirname, "..", "src/vendor/select2.full.js"),
      },
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
        { test: /CSInterface\.js$/, loader: "exports?CSInterface=CSInterface" },
        { test: /jquery\.js$/, loader: "expose?jQuery" }
      ]
    },
    output: {
      path: path.join(__dirname, "..", "<%= dist %>", "<%= cepDstPath %>"),
      filename: "<%= cepDstName %>",
    },
  }
};

/**
 * Inject mock `CSInterface` object
 *
 * This allow develop frontend in ordinary browser with cool features
 * like Angular Batarang or Hot Module Replacement
 *
 * @example
 *
 * Build dev bundle:
 * `NODE_ENV="development" grunt webpack`
 *
 * Build production bundle (default):
 * `grunt webpack`
 */
if (process.env.NODE_ENV === "development") {
  const injector = Object.assign({}, config.options.resolve.alias, {
    CSInterface: path.resolve(__dirname, "..", "<%= cepSrc %>", "services", "CSInterfaceMock.ts"),
  });
  config.options.resolve.alias = injector;
}

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
