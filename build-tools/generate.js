const config = require('./config');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');


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
  let normalizeName = name.replace(/[-|\\_](\w)/g, (all, letter) => letter.toUpperCase());
  normalizeName = normalizeName[0].toUpperCase() + normalizeName.slice(1);
  return normalizeName;
}

function generateValuesFile() {
  const assetList = getAssets();
  const AssetMetaList = assetList.map(getFileMeta).filter(({ext}) => ext.toLowerCase() === 'svg');

  let ExportName = NormalizationName(config.componentClassPrefix + 'IconAssets');

  function getRelativePath(p) {
    return path.relative(config.outputPath, p).replace(/\\/g, '/');
  }

  function generateObjectCode(value) {
    return `{
      ${Object.entries(value).reduce((p, [key, value]) => p += `${key}: ${value},\n`, '')}
    \n}`
  }

  const AssetsImportStatement = AssetMetaList.map(({path: p, variableName}) =>
    `import ${variableName} from '${getRelativePath(p)}';`
  );

  const CssImports = [
    `import '${config.cssPath}'`,
  ]

  const ExportValue = AssetMetaList
    .map(({variableName, name}) => ({[variableName]: `CreateIconComponent(${variableName})`}))
    .reduce(((previousValue, currentValue) => Object.assign(previousValue, currentValue)), {})

  const template = `
    import React, {HTMLAttributes} from "react";
    import classnames from 'classnames';
    
    ${[...AssetsImportStatement, ...CssImports].reduce((text, value) => text += value + '\n', '')}
    
    function CreateIconComponent(Component: React.FunctionComponent) {
      return React.forwardRef<HTMLSpanElement>( (props: HTMLAttributes<HTMLSpanElement>, ref) => {
        const {className, ...otherProps} = props;
        return (
          <span {...otherProps} className={classnames(
            className,
          )} ref={ref}> 
            <Component />   
          </span>
        )
      })
    }
    
    const ${ExportName} = ${generateObjectCode(ExportValue)}
    
    export default {${ExportName}};
  `;
  return template;
}



;(function main() {
  const assets = getAssets();
  // clear output
  try {
    const outputFile = fs.readFileSync(config.outputPath);
    console.log('output file exist, wait for delete');
    fs.unlinkSync(config.outputPath);
    console.log('output file delete success');
  } catch (e) {}

  console.log('start generate output ');
  const iconValueFileContent = generateValuesFile(assets[0]);

  fs.writeFileSync(config.outputPath, iconValueFileContent);
  console.log('success');
})()