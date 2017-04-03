'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// weak
exports.default = function (f) {
  return _react2.default.createClass({
    shouldComponentUpdate: function shouldComponentUpdate(newProps) {
      var _this = this;

      return (0, _ramda.keys)(newProps).length !== (0, _ramda.keys)(this.props).length || (0, _ramda.any)(function (k) {
        return newProps[k] !== _this.props[k];
      }, (0, _ramda.keys)(newProps));
    },
    render: function render() {
      return f(this.props);
    }
  });
};