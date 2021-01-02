const path = require('path');

const resolveAppPath = (relativePath) => path.join(__dirname, '../src', relativePath);

module.exports = {
  componentClassPrefix: 'x-',
  cssPath: path.relative('./src', './src/index.css'),
  assetsPath: resolveAppPath('./assets'),
  outputPath: resolveAppPath('.'),
  filename: 'index.tsx',
}