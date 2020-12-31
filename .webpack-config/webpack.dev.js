const WebpackMerge = require('webpack-merge');
const base = require('./webpack.base');
const webpack = require('webpack');
const path = require('path');

module.exports = WebpackMerge.merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    compress: true,
    hot: true
  },
  module: {
    rules: []
  }
})