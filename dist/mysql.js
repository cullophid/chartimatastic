'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConnection = undefined;

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// weak
var connections = {};

var createConnection = exports.createConnection = function createConnection(url) {
  var conn = _mysql2.default.createPool(url);
  connections[url] = conn;
  return conn;
};

exports.default = function (url, query) {
  var conn = connections[url] || createConnection(url);
  return new Promise(function (resolve, reject) {
    return conn.query(query, function (err, data, fields) {
      err ? reject(err) : resolve({ data: data, fields: (0, _ramda.pluck)('name', fields) });
    });
  });
};