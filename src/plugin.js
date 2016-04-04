'use strict';

const path = require('path');

const spawnPromise = require('./util');

module.exports = {
  install,
  download
};

function install(pluginPath, apmConfig) {
  const options = {
    cwd: pluginPath,
    env: apmConfig.apmEnv
  };

  return spawnPromise(apmConfig.apmExec, ['install'], options)
    .catch(err => { console.error(err.stack); });
}

function download(repo) {
  console.log(repo);
}
