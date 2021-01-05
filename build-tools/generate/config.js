const path = require("path");

const resolveAppPath = (...relativePath) =>
  path.join(__dirname, "../../lib", ...relativePath).replace(/\\/g, "/");

module.exports = {
  componentClassPrefix: "x",
  assetsPath: resolveAppPath("./assets"),
  outputPath: resolveAppPath("./icons"),
  filename: "index.tsx",
};
