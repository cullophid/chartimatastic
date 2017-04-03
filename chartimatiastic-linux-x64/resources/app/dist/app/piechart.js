'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // weak

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recharts = require('recharts');

var _ramda = require('ramda');

var _lazy = require('./lazy');

var _lazy2 = _interopRequireDefault(_lazy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COLORS = ['#4A148C', '#AD1457', '#0277BD', '#7CB342', '#FF8F00', '#E91E63', '#00838F', '#009688', '#F57C00', '#F4511E', '#FFEB3B'];

var color = function color(i) {
  return COLORS[i % COLORS.length];
};

exports.default = (0, _lazy2.default)(function (props) {
  if (!props.data) return _react2.default.createElement(
    'h1',
    null,
    'Run SQL query...'
  );
  var _props$data = props.data,
      fields = _props$data.fields,
      data = _props$data.data;

  var _fields = _slicedToArray(fields, 2),
      nameKey = _fields[0],
      valueKey = _fields[1];

  return _react2.default.createElement(
    _recharts.ResponsiveContainer,
    { height: 500, width: '100%' },
    _react2.default.createElement(
      _recharts.PieChart,
      { margin: { right: 40, top: 40, bottom: 40 } },
      _react2.default.createElement(_recharts.Legend, {
        height: 1,
        iconType: 'round'
      }),
      _react2.default.createElement(_recharts.Tooltip, null),
      _react2.default.createElement(
        _recharts.Pie,
        {
          data: data,
          label: true,
          nameKey: nameKey,
          valueKey: valueKey,
          innerRadius: 120,
          paddingAngle: 1
        },
        data.map(function (e, i) {
          return _react2.default.createElement(_recharts.Cell, { key: i, fill: color(i) });
        })
      )
    )
  );
});