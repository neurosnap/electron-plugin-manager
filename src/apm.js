'use strict';

const path = require('path');

const spawnPromise = require('./util');

module.exports = installApm;

function getConfig() {}

function installApm(location, apmEnv, targetElectronVersion, nodeVersion) {
  const apmInstallPath = location || path.join(__dirname, 'apm');
  const apmFlags = process.env.JANKY_SHA1 || process.argv.indexOf('--no-color') !== -1 ? ' --no-color' : '';
  const apmNodeModules = path.resolve(apmInstallPath, 'node_modules');
  const apmExec = path.join(apmNodeModules, 'atom-package-manager', 'bin', 'apm');
  const apmPackage = require(path.join(apmInstallPath, 'package.json'));
  const apmVersion = apmPackage.version;

  if (typeof targetElectronVersion === 'undefined') {
    targetElectronVersion = '1.1.1';
  }

  if (typeof apmEnv === 'undefined') {
    apmEnv = JSON.parse(JSON.stringify(process.env));
    const userHomeDirectory = (process.platform === 'win32') ? process.env.USERPROFILE : process.env.HOME;
    apmEnv.ATOM_HOME = path.join(userHomeDirectory, '.epm');
    apmEnv.ATOM_ELECTRON_VERSION = targetElectronVersion;
    // Set our target (Electron) version so that node-pre-gyp can download the proper binaries.
    apmEnv.npm_config_target = targetElectronVersion;
  }

  // Force 32-bit modules on Windows.
  // https://github.com/atom/atom/issues/10450
  if (process.platform === 'win32') {
    apmEnv.npm_config_target_arch = 'ia32';
  }

  if (typeof nodeVersion === 'undefined') {
    // https://github.com/atom/apm/blob/master/script/download-node.js#L113
    // https://github.com/atom/apm/pull/457
    nodeVersion = '0.10.40';
  }

  const apmInstallCommand = ['install', '--target=' + nodeVersion];
  // apm ships with 32-bit node so make sure its native modules are compiled
  // for a 32-bit target architecture
  if (process.env.JANKY_SHA1 && process.platform === 'win32') {
    apmInstallCommand.push('--arch=ia32');
  }

  console.log('Installing APM in ' + apmInstallPath);
  return spawnPromise('npm', apmInstallCommand, { cwd: apmInstallPath, env: apmEnv })
    .then(() => spawnPromise(apmExec, ['clean']))
    .then(() => ({ apmExec, apmEnv, apmVersion, apmInstallPath, apmFlags, targetElectronVersion, nodeVersion }))
    .catch(err => { console.error(err.stack); });
}
