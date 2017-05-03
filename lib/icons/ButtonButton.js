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

var ButtonButton = function (_React$Component) {
  _inherits(ButtonButton, _React$Component);

  function ButtonButton() {
    _classCallCheck(this, ButtonButton);

    return _possibleConstructorReturn(this, (ButtonButton.__proto__ || Object.getPrototypeOf(ButtonButton)).apply(this, arguments));
  }

  _createClass(ButtonButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'add',
        pathNode: _react2.default.createElement('path', { d: 'M14,1.85292871 L14,8.02940147 C14,9.05237977 13.1700365,9.88234329 12.1470582,9.88234329 L1.85294183,9.88234329 C0.829963526,9.88234329 0,9.05237977 0,8.02940147 L0,1.85292871 C0,0.829950413 0.829963526,-1.31130219e-05 1.85294183,-1.31130219e-05 L12.1470582,-1.31130219e-05 C13.1700365,-1.31130219e-05 14,0.829950413 14,1.85292871 Z' }),
        viewBox: '0 0 14 10'
      }, this.props));
    }
  }]);

  return ButtonButton;
}(_react2.default.Component);

exports.default = ButtonButton;