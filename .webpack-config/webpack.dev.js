const WebpackMerge = require('webpack-merge');
const base = require('./webpack.base');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = WebpackMerge.merge(base, {
  mode: 'development',
  entry: './example/src/index.ts',
  devtool: 'inline-source-map',
  target: 'web',
  devServer: {
    port: 3000,
    compress: true,
    hot: true
  },
  module: {
    rules: [

    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        watchContentBase: true,
        hot: true,
        contentBase: path.join(__dirname, '../example/'),
      }
    }),
    new ReactRefreshWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './example/index.html'
    }),
  ]
})