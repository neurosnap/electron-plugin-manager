'use strict';

const path = require('path');
const fs = require('fs');

const spawnPromise = require('./util');

module.exports = {
  install,
  uninstall,
  download,
};

function install(pluginPath, apmConfig) {
  const atomHome = apmConfig.apmEnv.ATOM_HOME;
  try {
    fs.lstatSync(pluginPath)
    // TODO: move folder to packages
  } catch (err) {
    pluginPath = path.join(atomHome, 'packages', pluginPath);
    try {
      fs.lstatSync(pluginPath)
    } catch (err) {
      throw new Error(`${pluginPath} not found`);
    }
  }

  const options = {
    cwd: pluginPath,
    env: apmConfig.apmEnv
  };

  return spawnPromise(apmConfig.apmExec, ['install'], options)
    .then(() => ({ pluginPath, config: apmConfig }))
    .catch(err => { console.error(err.stack); });
}

function uninstall(pluginName, apmConfig) {
  const options = {
    env: apmConfig.apmEnv
  };

  return spawnPromise(apmConfig.apmExec, ['uninstall', pluginName], options)
    .then(() => ({ pluginName, config: apmConfig }))
    .catch(err => { console.error(err.stack); });
}

function download(repo) {
  console.log(repo);
}
