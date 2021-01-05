const WebpackMerge = require("webpack-merge");
const base = require("./webpack.base");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = WebpackMerge.merge(base, {
  entry: path.join(__dirname, `../example/src/index.tsx`),
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: 3000,
    compress: true,
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        exclude: /node_modules/,
        use: ["html-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./example/index.html",
    }),
  ],
});
