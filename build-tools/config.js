const path = require('path');

const resolveAppPath = (relativePath) => path.resolve(__dirname, '../src', relativePath);

module.exports = {
  componentClassPrefix: 'x-',
  cssPath: path.relative('../src', '../src/index.css'),
  assetsPath: resolveAppPath('assets'),
  outputPath: resolveAppPath('index.tsx'),
}