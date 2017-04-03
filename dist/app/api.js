'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryDb = undefined;

var _rpc = require('./rpc');

var _rpc2 = _interopRequireDefault(_rpc);

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// weak
var queryDb = exports.queryDb = (0, _ramda.curry)(function (url, query) {
  return (0, _rpc2.default)('queryDb', { url: url, query: query });
});