'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _IconButton = require('./IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectSizeButton = function (_React$Component) {
  _inherits(SelectSizeButton, _React$Component);

  function SelectSizeButton() {
    _classCallCheck(this, SelectSizeButton);

    return _possibleConstructorReturn(this, (SelectSizeButton.__proto__ || Object.getPrototypeOf(SelectSizeButton)).apply(this, arguments));
  }

  _createClass(SelectSizeButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'select_size',
        pathNode: _react2.default.createElement('path', { d: 'M8.703 20h9.297v-9.297zM8 19.297l9.297-9.297h-9.297v9.297zM26 20.5v3c0 0.281-0.219 0.5-0.5 0.5h-3.5v3.5c0 0.281-0.219 0.5-0.5 0.5h-3c-0.281 0-0.5-0.219-0.5-0.5v-3.5h-13.5c-0.281 0-0.5-0.219-0.5-0.5v-13.5h-3.5c-0.281 0-0.5-0.219-0.5-0.5v-3c0-0.281 0.219-0.5 0.5-0.5h3.5v-3.5c0-0.281 0.219-0.5 0.5-0.5h3c0.281 0 0.5 0.219 0.5 0.5v3.5h13.297l3.844-3.859c0.203-0.187 0.516-0.187 0.719 0 0.187 0.203 0.187 0.516 0 0.719l-3.859 3.844v13.297h3.5c0.281 0 0.5 0.219 0.5 0.5z' }),
        viewBox: '0 0 26 28'
      }, this.props));
    }
  }]);

  return SelectSizeButton;
}(_react2.default.Component);

exports.default = SelectSizeButton;