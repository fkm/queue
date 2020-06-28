/* eslint-disable */
'use strict';

// Node Dependencies
const path = require('path');

// NPM Dependencies
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATH_SRC = path.join(__dirname, 'lib');
const PATH_DIST = path.join(__dirname, 'dist');
const PATH_NODEMODULES = path.join(__dirname, 'node_modules');

module.exports = {
  // https://webpack.js.org/concepts/mode/
  mode: 'none',
  // https://webpack.js.org/configuration/target/
  target: 'web',
  // https://webpack.js.org/configuration/devtool/
  devtool: false,
  // https://webpack.js.org/configuration/entry-context
  context: PATH_SRC,
  entry: {
    bundle: './index.ts',
  },
  // https://webpack.js.org/configuration/output/
  output: {
    library: 'queue',
    libraryTarget: 'umd',
    filename: '[name].js',
    globalObject: 'this',
    path: PATH_DIST,
  },
  resolve: {
    modules: [PATH_NODEMODULES, PATH_SRC],
    // https://webpack.js.org/configuration/resolve/#resolve-extensions
    extensions: ['*', '.ts'],
  },
  module: {
    rules: [
      {
        // https://webpack.js.org/guides/typescript/
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder
    new CleanWebpackPlugin(),
  ],
};
