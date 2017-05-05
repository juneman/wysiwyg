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

var VerticalLine = function (_React$PureComponent) {
  _inherits(VerticalLine, _React$PureComponent);

  function VerticalLine() {
    _classCallCheck(this, VerticalLine);

    return _possibleConstructorReturn(this, (VerticalLine.__proto__ || Object.getPrototypeOf(VerticalLine)).apply(this, arguments));
  }

  _createClass(VerticalLine, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'verticalLine',
        pathNode: _react2.default.createElement('path', { d: 'M11.953 7.703c-0.078 0.172-0.25 0.297-0.453 0.297h-3.5v19.5c0 0.281-0.219 0.5-0.5 0.5h-3c-0.281 0-0.5-0.219-0.5-0.5v-19.5h-3.5c-0.203 0-0.375-0.109-0.453-0.297s-0.047-0.391 0.078-0.547l5.469-6c0.094-0.094 0.219-0.156 0.359-0.156v0c0.141 0 0.281 0.063 0.375 0.156l5.547 6c0.125 0.156 0.156 0.359 0.078 0.547z' }),
        viewBox: '0 0 12 28'
      }, this.props));
    }
  }]);

  return VerticalLine;
}(_react2.default.PureComponent);

exports.default = VerticalLine;