'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recharts = require('recharts');

var _ramda = require('ramda');

var _lazy = require('./lazy');

var _lazy2 = _interopRequireDefault(_lazy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // weak

var COLORS = ['#4A148C', '#AD1457', '#0277BD', '#7CB342', '#FF8F00', '#E91E63', '#00838F', '#009688', '#F57C00', '#F4511E', '#FFEB3B'];

var color = function color(i) {
  return COLORS[i % COLORS.length];
};

var prepDataPoint = function prepDataPoint(x, y, key) {
  return function (data) {
    return (0, _ramda.merge)((0, _ramda.compose)((0, _ramda.map)((0, _ramda.prop)(y)), (0, _ramda.indexBy)((0, _ramda.prop)(key)))(data), _defineProperty({}, x, data[0][x]));
  };
};

var prepData = function prepData(x, y, key) {
  return (0, _ramda.compose)(_ramda.values, (0, _ramda.map)(prepDataPoint(x, y, key)), (0, _ramda.groupBy)((0, _ramda.prop)(x)));
};

var renderBar = function renderBar(isStacked) {
  return function (s, i) {
    return isStacked ? _react2.default.createElement(_recharts.Bar, { key: i, stackId: 'a', type: 'monotone', dataKey: s, stroke: color(i), fill: color(i) }) : _react2.default.createElement(_recharts.Bar, { key: i, type: 'monotone', dataKey: s, stroke: color(i), fill: color(i) });
  };
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

  var x = (0, _ramda.nth)(-2, fields);
  var y = (0, _ramda.nth)(-1, fields);
  var chartData = fields.length === 3 ? prepData(x, y, (0, _ramda.head)(fields))(data) : data;

  var series = fields.length === 3 ? (0, _ramda.uniq)((0, _ramda.pluck)(fields[0], data)) : [y];
  console.log(x, y, series);
  console.log(chartData);

  return _react2.default.createElement(
    _recharts.ResponsiveContainer,
    { height: 500, width: '100%' },
    _react2.default.createElement(
      _recharts.BarChart,
      { data: chartData, margin: { right: 40, top: 40, bottom: 40 } },
      _react2.default.createElement(_recharts.Tooltip, null),
      _react2.default.createElement(_recharts.XAxis, { label: fields[0], tickLine: false, dataKey: x, stroke: '#aaa' }),
      _react2.default.createElement(_recharts.YAxis, { label: fields[1], tickLine: false, stroke: '#aaa' }),
      series.map(renderBar(props.stacked))
    )
  );
});