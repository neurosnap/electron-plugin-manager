'use strict';

const path = require('path');

const spawnPromise = require('./util');

module.exports = installApm;

function installApm(location) {
  const apmInstallPath = location || path.join(__dirname, 'apm');
  const apmVersion = '1.6.0';
  const apmFlags = process.env.JANKY_SHA1 || process.argv.indexOf('--no-color') !== -1 ? ' --no-color' : '';
  const apmNodeModules = path.resolve(apmInstallPath, 'node_modules');
  const apmExec = path.join(apmNodeModules, 'atom-package-manager', 'bin', 'apm');

  const userHomeDirectory = (process.platform === 'win32') ? process.env.USERPROFILE : process.env.HOME;
  const apmEnv = JSON.parse(JSON.stringify(process.env));
  //apmEnv['ATOM_ELECTRON_VERSION'] = targetElectronVersion;
  apmEnv['ATOM_HOME'] = path.join(userHomeDirectory, '.epm');

  console.log('Installing APM in ' + apmInstallPath);
  return spawnPromise('npm', ['install', '--target=0.10.35'], { cwd: apmInstallPath, env: apmEnv })
    .then(() => spawnPromise(apmExec, ['clean']))
    .then(() => ({ apmExec, apmEnv, apmVersion, apmInstallPath, apmFlags }))
    .catch(err => { console.error(err.stack); });
}
