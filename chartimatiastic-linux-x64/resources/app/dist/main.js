'use strict';

var _electron = require('electron');

var _electron2 = _interopRequireDefault(_electron);

var _mysql = require('./mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _rpc = require('./rpc');

var _rpc2 = _interopRequireDefault(_rpc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Module to control application life.
var app = _electron2.default.app; // weak

var Menu = _electron2.default.Menu;
// Module to create native browser window.
var BrowserWindow = _electron2.default.BrowserWindow;

var menuTemplate = [{
  label: 'Edit',
  submenu: [{
    label: 'Toggle Developer Tools',
    accelerator: function () {
      if (process.platform === 'darwin') {
        return 'Alt+Command+I';
      } else {
        return 'Ctrl+Shift+I';
      }
    }(),
    click: function click(item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.toggleDevTools();
      }
    }
  }]
}];

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = void 0;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600, titleBarStyle: 'hidden' });

  // and load the index.html of the app.
  mainWindow.loadURL(_url2.default.format({
    pathname: _path2.default.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

(0, _rpc2.default)('queryDb', function (_ref) {
  var url = _ref.url,
      query = _ref.query;
  return (0, _mysql2.default)(url, query);
});