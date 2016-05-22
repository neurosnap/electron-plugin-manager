'use strict';

const path = require('path');

const installApm = require('../src/apm');
const pluginMgr = require('../src/plugin');

const apmPath = path.join(__dirname, '..', 'apm');
// const consolePlugin = path.join(__dirname, 'plugins', 'console');
// const consolePlugin = path.join('Users', 'erock', '.epm', 'packages', 'console');
const consolePlugin = 'console';

installApm(apmPath)
  .then(config => pluginMgr.install(consolePlugin, config))
  .then(plugin => {
    const config = plugin.config;
    const pluginPath = plugin.pluginPath;
    const plugInfo = require(path.join(pluginPath, 'package.json'));
    const plug = require(path.join(pluginPath, plugInfo.main));
    plug.activate();
    return config;
  })
  .then(config => {
    console.log('uninstalling plugin');
    return pluginMgr.uninstall(consolePlugin, config);
  })
  .catch(err => { setTimeout(() => { throw err; }); });
