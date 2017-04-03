'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = require('electron');

var _ramda = require('ramda');

var _uuid = require('uuid');

exports.default = (0, _ramda.curry)(function (name, data) {
  return new Promise(function (resolve, reject) {
    var token = (0, _uuid.v4)();
    _electron.ipcRenderer.send(name, { token: token, data: data });
    _electron.ipcRenderer.once(token, function (e, res) {
      return res.error ? reject(res.error) : resolve(res.data);
    });
  });
});