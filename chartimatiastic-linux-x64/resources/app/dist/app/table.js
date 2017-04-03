'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Table = require('material-ui/Table');

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var data = _ref.data;
  return _react2.default.createElement(
    _Table.Table,
    null,
    _react2.default.createElement(
      _Table.TableHeader,
      null,
      _react2.default.createElement(
        _Table.TableRow,
        null,
        data.fields.map(function (col, i) {
          return _react2.default.createElement(
            _Table.TableHeaderColumn,
            { key: i },
            col
          );
        })
      )
    ),
    _react2.default.createElement(
      _Table.TableBody,
      null,
      data.data.map(function (columns, i) {
        return _react2.default.createElement(
          _Table.TableRow,
          { key: i },
          (0, _ramda.props)(data.fields, columns).map(function (col, i) {
            return _react2.default.createElement(
              _Table.TableRowColumn,
              { key: i },
              col
            );
          })
        );
      })
    )
  );
};