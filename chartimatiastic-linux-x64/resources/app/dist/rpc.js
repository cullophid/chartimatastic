'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = require('electron');

exports.default = function (name, f) {
  return _electron.ipcMain.on(name, function (e, _ref) {
    var token = _ref.token,
        data = _ref.data;
    return f(data).then(function (data) {
      return e.sender.send(token, { data: data });
    }, function (error) {
      return e.sender.send(token, { error: error });
    });
  });
}; // weak