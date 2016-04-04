'use strict';

const path = require('path');

const installApm = require('../src/apm');
const pluginMgr = require('../src/plugin');

const apmPath = path.join(__dirname, '..', 'apm');
const consolePlugin = path.join(__dirname, 'plugins', 'console');

installApm(apmPath)
  .then(config => pluginMgr.install(consolePlugin, config))
  .then(pluginPath => {
    const plugInfo = require(path.join(consolePlugin, 'package.json'));
    const plug = require(path.join(consolePlugin, plugInfo.main));
    plug();
  })
  .catch(err => { setTimeout(() => { throw err; }); });
