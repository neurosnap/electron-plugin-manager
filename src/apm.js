'use strict';

const path = require('path');

const spawnPromise = require('./util');

module.exports = installApm;

function installApm(location, apmVersion, targetElectronVersion, apmEnv) {
  if (typeof targetElectronVersion === 'undefined') {
    targetElectronVersion = '1.1.1';
  }

  if (typeof apmEnv === 'undefined') {
    apmEnv = JSON.parse(JSON.stringify(process.env));
    const userHomeDirectory = (process.platform === 'win32') ? process.env.USERPROFILE : process.env.HOME;
    apmEnv.ATOM_HOME = path.join(userHomeDirectory, '.epm');
    apmEnv.ATOM_ELECTRON_VERSION = targetElectronVersion;
  }

  if (typeof apmVersion === 'undefined') {
    apmVersion = '1.10.0';
  }

  const apmInstallPath = location || path.join(__dirname, 'apm');
  const apmFlags = process.env.JANKY_SHA1 || process.argv.indexOf('--no-color') !== -1 ? ' --no-color' : '';
  const apmNodeModules = path.resolve(apmInstallPath, 'node_modules');
  const apmExec = path.join(apmNodeModules, 'atom-package-manager', 'bin', 'apm');

  console.log('Installing APM in ' + apmInstallPath);
  return spawnPromise('npm', ['install', '--target=0.10.35'], { cwd: apmInstallPath, env: apmEnv })
    .then(() => spawnPromise(apmExec, ['clean']))
    .then(() => ({ apmExec, apmEnv, apmVersion, apmInstallPath, apmFlags }))
    .catch(err => { console.error(err.stack); });
}
