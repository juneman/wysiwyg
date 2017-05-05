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

var HeroButton = function (_React$PureComponent) {
  _inherits(HeroButton, _React$PureComponent);

  function HeroButton() {
    _classCallCheck(this, HeroButton);

    return _possibleConstructorReturn(this, (HeroButton.__proto__ || Object.getPrototypeOf(HeroButton)).apply(this, arguments));
  }

  _createClass(HeroButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'add',
        pathNode: _react2.default.createElement('path', { d: 'M1.50998238,12 L13.5076442,12 C13.8371688,12 14,11.8754739 14,11.4972141 L14,7 L1,7 L1,11.4972141 C1,11.831426 1.20094071,12 1.50998238,12 Z M15.0000179,1.35416667 L15.0000179,11.6458333 C15.0000179,12.390625 14.3973386,13 13.6607306,13 L1.33928731,13 C0.60267929,13 0,12.390625 0,11.6458333 L0,1.35416667 C0,0.609375 0.60267929,0 1.33928731,0 L13.6607306,0 C14.3973386,0 15.0000179,0.609375 15.0000179,1.35416667 Z' }),
        viewBox: '0 0 15 13'
      }, this.props));
    }
  }]);

  return HeroButton;
}(_react2.default.PureComponent);

exports.default = HeroButton;