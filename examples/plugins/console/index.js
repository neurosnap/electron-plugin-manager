'use strict';

var bconsole = require('better-console');

/*
This required method is called when your package is activated. It is passed the state data from the
last time the window was serialized if your module implements the serialize() method. Use this to do
initialization work when your package is started (like setting up DOM elements or binding events).
*/
function activate(state) {
  bconsole.log('Does this work?');
}

/*
This optional method is called when the window is shutting down. If your package is watching any
files or holding external resources in any other way, release them here. If you’re just subscribing
to things on window, you don’t need to worry because that’s getting torn down anyway.
*/
function deactivate() {}

/*
This optional method is called when the window is shutting down, allowing you to return JSON to
represent the state of your component. When the window is later restored, the data you returned is
passed to your module’s activate method so you can restore your view to where the user left off.
*/
function serialize() {}

module.exports = {
  activate,
  deactivate,
  serialize,
};
