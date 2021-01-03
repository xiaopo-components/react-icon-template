const WebpackMerge = require("webpack-merge");
const base = require("./webpack.base");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = WebpackMerge.merge(base, {
  entry: path.join(__dirname, `../example/src/index.ts`),
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: 3000,
    compress: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./example/index.html",
    }),
  ],
});
