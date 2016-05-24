Electron Plugin Manager
=======================

Install third-party packages during node runtime for electron applications.

This package uses `atom-plugin-manager` to install third-party packages.

Features
--------

* Download and install node packages from github
* Install all node package dependencies
* Import plugins dynamically

Examples
--------

```bash
node examples/console.js
```

This will first install `apm` to the specified location, install the specified plugin, and then
execute the plugin.
