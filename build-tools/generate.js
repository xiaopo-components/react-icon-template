const config = require('./config');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

function cleanOutputDir() {
  try {
    const files = fs.readdirSync(config.outputPath);
    files.forEach((path) => fs.rmSync(path));
    console.log('delete success ');
  } catch (e) {
    console.log('delete failed, reason: \n', e.toString());
  }
}

function getAssets() {
  const assetList = fs.readdirSync(config.assetsPath).map(name => path.join(config.assetsPath, name));
  if (assetList.length === 0) throw new Error(`asset dir is empty, check your config or dir "${config.assetsPath}"`);
  return assetList;
}

/**
 *
 * @param context
 */
function getFileMeta(context) {
  const [name, ext] = getFileNameAndExt(context);
  return {
    path: context,
    name,
    ext,
    variableName: NormalizationName(name),
  }
}

/**
 * get filename and file
 * @param context {string} filePath
 * @return {[string, string]} filename and ext;
 */
function getFileNameAndExt(context) {
  const match = context.match(/.*[\\|\/](.+?)\.(\w+)$/);
  if (!match) throw new Error('input is not a file path');
  const filename = match[1];
  const ext = match[2];
  return [filename, ext];
}

/**
 *
 * @param name {string}
 * @returns {any}
 */
function NormalizationName(name) {
  if (!name) throw new Error('invalid input, normalize name should input non-null value');
  let normalizeName = name.replace(/\\_(\\w)/g, (all, letter) => letter.toUpperCase())

  normalizeName = normalizeName[0].toUpperCase() + normalizeName.slice(1);

  return normalizeName;
}

function generateValuesFile() {
  const assetList = getAssets();
  const AssetMetaList = assetList.map(getFileMeta).filter(({ext}) => ext.toLowerCase() !== 'svg');

  const template = `
    import {ReactNode} from "react";
    ${AssetMetaList.map(({path: p, variableName}) =>
      `import ${variableName} from '${path.relative(config.outputPath, p)}'`
    )}
    
    export const ${NormalizationName(config.componentClassPrefix + 'IconAssets')}: Record<string, ReactNode> = {
      ${AssetMetaList.map(({variableName, name}) => `${name}: ${variableName},\n`)}
    }
  `;
  return template;
}



;(function main() {
  const assets = getAssets();
  const iconValueFileContent = generateValuesFile(assets[0]);

  console.log(iconValueFileContent);
})()