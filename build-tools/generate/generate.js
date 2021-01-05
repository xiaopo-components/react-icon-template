const config = require("./config");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");

function getAssets() {
  const assetList = fs
    .readdirSync(config.assetsPath)
    .map((name) => path.join(config.assetsPath, name));
  if (assetList.length === 0)
    throw new Error(
      `asset dir is empty, check your config or dir "${config.assetsPath}"`
    );
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
  };
}

/**
 * get filename and file
 * @param context {string} filePath
 * @return {[string, string]} filename and ext;
 */
function getFileNameAndExt(context) {
  const match = context.match(/.*[\\|\/](.+?)\.(\w+)$/);
  if (!match) throw new Error("input is not a file path");
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
  if (!name)
    throw new Error(
      "invalid input, normalize name should input non-null value"
    );
  let normalizeName = name.replace(/[-|\\_](\w)/g, (all, letter) =>
    letter.toUpperCase()
  );
  normalizeName = normalizeName[0].toUpperCase() + normalizeName.slice(1);
  return normalizeName;
}

function generateIcon() {
  const assetList = getAssets();
  const AssetMetaList = assetList
    .map(getFileMeta)
    .filter(({ ext }) => ext.toLowerCase() === "svg");

  const iconFileTemplate = _.template(`
// THIS FILE CREATE BY build-tools/generate.js

import React from "react";
/** 
 *  if you want custom component name
 *  you should modify template in 'build-tools/generate.js'
 *  
 *  if you want custom your icon component, only modify 'lib/component/icon-component.tsx'
 */
import IconComponent, {IconProps} from '../component/icon-component';
import Icon from '../assets/<%= SVG_FILENAME %>.svg';

const <%= SVG_NAME %> = React.forwardRef<HTMLSpanElement,IconProps>((props, ref) => (
  <IconComponent 
      {...props} 
      ref={ref}
  >
    <Icon />
  </IconComponent>
));

<%= SVG_NAME %>.displayName = 'Icon<%= SVG_NAME %>';

export default <%= SVG_NAME %>;
  `);

  AssetMetaList.forEach(({ variableName, name }) => {
    const fileContent = iconFileTemplate({
      SVG_NAME: variableName,
      SVG_FILENAME: name,
    }).trim();
    fs.writeFileSync(
      path.resolve(config.outputPath, `./${name}.tsx`).replace(/\\/g, "/"),
      fileContent
    );
  });

  const exportEntityList = AssetMetaList.map(
    ({ variableName, name }) =>
      `export {default as ${variableName}} from './${name}';`
  );
  fs.writeFileSync(
    path.resolve(config.outputPath, `index.tsx`).replace(/\\/g, "/"),
    exportEntityList.join("\n")
  );
}

function generate() {
  // clear output
  try {
    const outputFile = fs.readdirSync(config.outputPath);
    // "output path exist, wait for unlink"
    fs.unlinkSync(config.outputPath);
    fs.mkdirSync(config.outputPath);
    // "output path delete success"
  } catch (e) {}

  // "start generate output "
  generateIcon();
  // "success"
}

module.exports = {
  generate,
};
