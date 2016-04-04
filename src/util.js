'use strict';

const childProcess = require('child_process');

module.exports = spawnPromise;

function spawnPromise(cmd, options, opts) {
  return new Promise((resolve, reject) => {
    const child = childProcess.spawn(cmd, options, opts);
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.on('error', err => { reject(err); })
    child.on('exit', code => {
      if (code != 0) {
        return reject(code);
      }

      console.log(`Finished ${cmd} ${options}`);
      return resolve();
    });
  });
}

