'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _electron = require('electron');

var _ramda = require('ramda');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _linechart = require('./linechart');

var _linechart2 = _interopRequireDefault(_linechart);

var _barchart = require('./barchart');

var _barchart2 = _interopRequireDefault(_barchart);

var _piechart = require('./piechart');

var _piechart2 = _interopRequireDefault(_piechart);

var _table = require('./table');

var _table2 = _interopRequireDefault(_table);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _BottomNavigation = require('material-ui/BottomNavigation');

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Card = require('material-ui/Card');

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _reactAce = require('react-ace');

var _reactAce2 = _interopRequireDefault(_reactAce);

var _api = require('./api');

var api = _interopRequireWildcard(_api);

require('brace/mode/mysql');

require('brace/theme/tomorrow');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var chartTypes = {
  line: { label: 'Line', component: function component(data) {
      return _react2.default.createElement(_linechart2.default, { data: data });
    } },
  area: { label: 'Area', component: function component(data) {
      return _react2.default.createElement(_linechart2.default, { area: true, data: data });
    } },
  bar: { label: 'Bar', component: function component(data) {
      return _react2.default.createElement(_barchart2.default, { data: data });
    } },
  stacked: { label: 'Stacked', component: function component(data) {
      return _react2.default.createElement(_barchart2.default, { stacked: true, data: data });
    } },
  pie: { label: 'Pie', component: function component(data) {
      return _react2.default.createElement(_piechart2.default, { data: data });
    } },
  table: { label: 'Table', component: function component(data) {
      return _react2.default.createElement(_table2.default, { data: data });
    } }
};

var Chart = function Chart(_ref) {
  var type = _ref.type,
      data = _ref.data;
  return chartTypes[type] ? chartTypes[type].component(data) : null;
};

var QueryPage = function (_React$Component) {
  _inherits(QueryPage, _React$Component);

  function QueryPage() {
    _classCallCheck(this, QueryPage);

    var _this = _possibleConstructorReturn(this, (QueryPage.__proto__ || Object.getPrototypeOf(QueryPage)).call(this));

    var dbUrl = localStorage.getItem('dbUrl') || '';
    var query = localStorage.getItem('query') || '';
    var chartType = localStorage.getItem('chartType') || '';
    console.log(dbUrl, query);
    _this.state = {
      dbUrl: dbUrl,
      error: null,
      data: null,
      chartType: chartType,
      query: query
    };
    return _this;
  }

  _createClass(QueryPage, [{
    key: 'submitQuery',
    value: function submitQuery() {
      var _this2 = this;

      localStorage.setItem('dbUrl', this.state.dbUrl);
      localStorage.setItem('query', this.state.query);
      localStorage.setItem('chartType', this.state.chartType);
      api.queryDb(this.state.dbUrl, this.state.query).then(function (data) {
        return _this2.setState({ data: data, error: null });
      }, function (error) {
        return _this2.setState({ error: error, data: null });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      console.log(this.state);
      return _react2.default.createElement(
        _MuiThemeProvider2.default,
        null,
        _react2.default.createElement(
          'div',
          { style: { padding: 15, paddingTop: 30 } },
          _react2.default.createElement(
            _Dialog2.default,
            {
              title: 'Error',
              actions: [_react2.default.createElement(_FlatButton2.default, {
                label: 'OK',
                fullWidth: true,
                primary: true,
                onTouchTap: function onTouchTap() {
                  return _this3.setState({ error: null });
                }
              })],
              modal: false,
              open: !!this.state.error,
              onRequestClose: function onRequestClose() {
                return _this3.setState({ error: null });
              }
            },
            _react2.default.createElement(
              'p',
              null,
              (0, _ramda.path)(['state', 'error', 'code'], this)
            )
          ),
          _react2.default.createElement(
            _Card.Card,
            { style: { marginBottom: 15 } },
            _react2.default.createElement(
              _Card.CardActions,
              null,
              _react2.default.createElement(_TextField2.default, {
                floatingLabelText: 'Database',
                name: 'databaseurl',
                value: this.state.dbUrl,
                onChange: function onChange(e) {
                  return _this3.setState({ dbUrl: e.target.value });
                },
                fullWidth: true
              })
            )
          ),
          _react2.default.createElement(
            _Card.Card,
            { style: { marginBottom: 15 } },
            _react2.default.createElement(_Card.CardTitle, { subtitle: 'MySQL Query' }),
            _react2.default.createElement(
              _Card.CardActions,
              null,
              _react2.default.createElement(_reactAce2.default, {
                mode: 'mysql',
                theme: 'tomorrow',
                showGutter: false,
                onChange: function onChange(query) {
                  return _this3.setState({ query: query });
                },
                value: this.state.query,
                maxLines: 6,
                minLines: 6,
                width: '100%',
                wrapEnabled: true,
                name: 'SQLEDITOR',
                editorProps: { $blockScrolling: true }
              })
            ),
            _react2.default.createElement(
              _Card.CardActions,
              null,
              _react2.default.createElement(
                _RaisedButton2.default,
                { fullWidth: true, primary: true, type: 'submit', onClick: function onClick() {
                    return _this3.submitQuery();
                  } },
                'Go'
              )
            )
          ),
          _react2.default.createElement(
            _Paper2.default,
            { zDepth: 1, style: { marginBottom: 15 } },
            _react2.default.createElement(
              _BottomNavigation.BottomNavigation,
              { selectedIndex: Object.keys(chartTypes).indexOf(this.state.chartType) },
              _react2.default.createElement(_BottomNavigation.BottomNavigationItem, {
                label: 'Line',
                icon: _react2.default.createElement(
                  _FontIcon2.default,
                  { className: 'material-icons' },
                  'show_chart'
                ),
                onTouchTap: function onTouchTap() {
                  return _this3.setState({ chartType: 'line' });
                }
              }),
              _react2.default.createElement(_BottomNavigation.BottomNavigationItem, {
                label: 'Area',
                icon: _react2.default.createElement(
                  _FontIcon2.default,
                  { className: 'material-icons' },
                  'show_chart'
                ),
                onTouchTap: function onTouchTap() {
                  return _this3.setState({ chartType: 'area' });
                }
              }),
              _react2.default.createElement(_BottomNavigation.BottomNavigationItem, {
                label: 'Bar',
                icon: _react2.default.createElement(
                  _FontIcon2.default,
                  { className: 'material-icons' },
                  'insert_chart'
                ),
                onTouchTap: function onTouchTap() {
                  return _this3.setState({ chartType: 'bar' });
                }
              }),
              _react2.default.createElement(_BottomNavigation.BottomNavigationItem, {
                label: 'Stacked',
                icon: _react2.default.createElement(
                  _FontIcon2.default,
                  { className: 'material-icons' },
                  'insert_chart'
                ),
                onTouchTap: function onTouchTap() {
                  return _this3.setState({ chartType: 'stacked' });
                }
              }),
              _react2.default.createElement(_BottomNavigation.BottomNavigationItem, {
                label: 'Pie',
                icon: _react2.default.createElement(
                  _FontIcon2.default,
                  { className: 'material-icons' },
                  'pie_chart'
                ),
                onTouchTap: function onTouchTap() {
                  return _this3.setState({ chartType: 'pie' });
                }
              }),
              _react2.default.createElement(_BottomNavigation.BottomNavigationItem, {
                label: 'Table',
                icon: _react2.default.createElement(
                  _FontIcon2.default,
                  { className: 'material-icons' },
                  'grid_on'
                ),
                onTouchTap: function onTouchTap() {
                  return _this3.setState({ chartType: 'table' });
                }
              })
            )
          ),
          _react2.default.createElement(
            _Card.Card,
            null,
            _react2.default.createElement(
              _Card.CardActions,
              null,
              _react2.default.createElement(Chart, { type: this.state.chartType, data: this.state.data })
            )
          )
        )
      );
    }
  }]);

  return QueryPage;
}(_react2.default.Component);

exports.default = QueryPage;