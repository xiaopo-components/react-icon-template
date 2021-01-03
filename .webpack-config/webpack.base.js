const path = require("path");

module.exports = {
  entry: path.join(__dirname, `../lib/index.tsx`),
  target: "web",
  output: {
    filename: "index.js",
    path: path.join(__dirname, "/src"),
  },
  module: {
    // 配置相应的规则
    rules: [
      {
        test: /\.ts[x]?$/,
        use: ["babel-loader", "ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, "../lib/assets"),
        use: ["@svgr/webpack"],
      },
    ],
  },
  resolve: {
    extensions: ["js", "ts", "tsx", "json", "jsx"].map((e) => `.${e}`),
  },
  plugins: [],
};
