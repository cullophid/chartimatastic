'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _Tabs = require('material-ui/Tabs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    _MuiThemeProvider2.default,
    null,
    _react2.default.createElement(
      _Tabs.Tabs,
      null,
      _react2.default.createElement(
        _Tabs.Tab,
        { label: 'tab1' },
        _react2.default.createElement(
          'p',
          null,
          'lkajsldfkjalskdjf'
        )
      ),
      _react2.default.createElement(
        _Tabs.Tab,
        { label: 'tab2' },
        _react2.default.createElement(
          'p',
          null,
          'lkajsldfkjalskdjf'
        )
      ),
      _react2.default.createElement(
        _Tabs.Tab,
        { label: 'tab3' },
        _react2.default.createElement(
          'p',
          null,
          'lkajsldfkjalskdjf'
        )
      )
    )
  );
};