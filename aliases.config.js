/**
 * Referenced this
 * (https://github.com/chrisvfritz/vue-enterprise-boilerplate/blob/master/aliases.config.js)
 */

const path = require('path');
const fs = require('fs');
const prettier = require('prettier');

const extensions = ['.ts', '.tsx', '.js', '.json', '.scss', '.css']; // jsconfig index extensions
const aliases = {
  '@': '.',
  '@src': 'src',
  '@components': 'src/components',
  '@assets': 'src/assets',
};
const exportData = {
  webpack: {},
  jsconfig: {},
  jest: {},
};

const setWebpackAlias = (alias, aliasTo) => {
  exportData.webpack[alias] = path.resolve(__dirname, aliasTo);
};

const setJestAlias = (alias, aliasTo, aliasToHasExtension) => {
  // root mapping
  if (aliasTo === '.') {
    exportData.jest[`^${alias}/(.*)$`] = `<rootDir>/$1`;
    return;
  }

  exportData.jest[`^${alias}$`] = `<rootDir>/${aliasTo}`;
  if (!aliasToHasExtension) {
    exportData.jest[`^${alias}$`] = `<rootDir>/${aliasTo}/index.js`;
    exportData.jest[`^${alias}/(.*)$`] = `<rootDir>/${aliasTo}/$1`;
  }
};

const setJSConfigAlias = (alias, aliasTo, aliasToHasExtension) => {
  if (!aliasToHasExtension) {
    exportData.jsconfig[alias + '/*'] = [aliasTo + '/*'];
    exportData.jsconfig[alias] = extensions.map((extension) => `${aliasTo}/index${extension}`);
  } else {
    exportData.jsconfig[alias] = [aliasTo];
  }
};

// for vscode extension (path-autocomplete)
const pathMappings = {};
const setPathIntellisenseAlias = (alias, aliasTo) => {
  pathMappings[alias] = '${folder}' + `/${aliasTo}`;
};

for (const alias in aliases) {
  const aliasTo = aliases[alias];
  const aliasToHasExtension = /\.\w+$/.test(aliasTo);

  setWebpackAlias(alias, aliasTo);
  setJestAlias(alias, aliasTo, aliasToHasExtension);
  setJSConfigAlias(alias, aliasTo, aliasToHasExtension);
  setPathIntellisenseAlias(alias, aliasTo);
}

const jsconfigTemplate = require('./jsconfig.template') || {};
const jsconfigPath = path.resolve(__dirname, 'jsconfig.json');
const settingsJson = require('./.vscode/settings.json') || {};
const settingsJsonPath = path.resolve(__dirname, './.vscode/settings.json');

// jsconfig.json (for VS Code)

fs.writeFile(
  jsconfigPath,
  prettier.format(
    JSON.stringify({
      ...jsconfigTemplate,
      compilerOptions: {
        ...(jsconfigTemplate.compilerOptions || {}),
        paths: exportData.jsconfig,
      },
    }),
    { ...require('./.prettierrc'), parser: 'json' },
  ),
  (error) => {
    if (error) {
      console.error('Error while creating jsconfig.json from aliases.config.js.');
      throw error;
    }
  },
);

// settings.json (for VS Code Extension)

fs.writeFile(
  settingsJsonPath,
  prettier.format(
    JSON.stringify({
      ...settingsJson,
      'path-autocomplete.pathMappings': pathMappings,
    }),
    { ...require('./.prettierrc'), parser: 'json' },
  ),
  (error) => {
    if (error) {
      console.error('Error while creating settings.json from aliases.config.js.');
      throw error;
    }
  },
);

module.exports = exportData;
