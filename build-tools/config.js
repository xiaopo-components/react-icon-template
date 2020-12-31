const path = require('path');

const resolveSrcPath = (relativePath) => path.join('../src', relativePath);

module.exports = {
  componentClassPrefix: 'x-',
  cssPath: resolveSrcPath('index.css'),
  assetsPath: resolveSrcPath('assets'),
  outputPath: resolveSrcPath('icon'),
}