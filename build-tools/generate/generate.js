const defaultConfig = require("./config");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const resolveAppPath = (...relativePath) =>
  path.join(__dirname, "../../", ...relativePath).replace(/\\/g, "/");

function getAssets(assetsPath) {
  const assetList = fs
    .readdirSync(assetsPath)
    .map((name) => path.join(assetsPath, name));
  if (assetList.length === 0)
    throw new Error(
      `asset dir is empty, check your config or dir "${assetsPath}"`
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

function generateIcon(config) {
  const outputPath = resolveAppPath(config.outputPath);
  const assetsPath = resolveAppPath(config.assetsPath);
  const assetList = getAssets(assetsPath);
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
import classnames from "classnames";

const <%= SVG_NAME %> = React.forwardRef<HTMLSpanElement,IconProps>((props, ref) => (
  <IconComponent 
      {...props} 
      className={classnames('<%= CLASS_NAME %>', props.className)}
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
      CLASS_NAME: config.componentClassName,
    }).trim();
    fs.writeFileSync(
      path.resolve(outputPath, `./${name}.tsx`).replace(/\\/g, "/"),
      fileContent
    );
  });

  const exportEntityList = AssetMetaList.map(
    ({ variableName, name }) =>
      `export {default as ${variableName}} from './${name}';`
  );
  fs.writeFileSync(
    path.resolve(outputPath, `index.tsx`).replace(/\\/g, "/"),
    exportEntityList.join("\n")
  );
}

// delete dir
const rmdir = function (dir) {
  const list = fs.readdirSync(dir);
  for (let i = 0; i < list.length; i++) {
    const filename = path.join(dir, list[i]);
    const stat = fs.statSync(filename);

    if (filename === "." || filename === "..") {
      // pass these files
    } else if (stat.isDirectory()) {
      // rmdir recursively
      rmdir(filename);
    } else {
      // rm filename
      fs.unlinkSync(filename);
    }
  }
  fs.rmdirSync(dir);
};
function generate(inputConfig) {
  // outputPath is not custom
  delete inputConfig.outputPath;

  const config = Object.assign({}, defaultConfig, inputConfig ?? {});
  // clear output
  const output = resolveAppPath(config.outputPath);
  try {
    const outputFile = fs.readdirSync(output);
    // output path exist, wait for unlink
    rmdir(output);
    // output path delete success
  } catch (e) {
  } finally {
    fs.mkdirSync(output);
  }

  // start generate output
  generateIcon(config);
  // success
}

module.exports = {
  generate,
};
