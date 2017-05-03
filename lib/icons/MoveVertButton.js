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

var MoveVertButton = function (_React$Component) {
  _inherits(MoveVertButton, _React$Component);

  function MoveVertButton() {
    _classCallCheck(this, MoveVertButton);

    return _possibleConstructorReturn(this, (MoveVertButton.__proto__ || Object.getPrototypeOf(MoveVertButton)).apply(this, arguments));
  }

  _createClass(MoveVertButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'swap_vert',
        pathNode: _react2.default.createElement('path', { d: 'M11 5c0 0.547-0.453 1-1 1h-2v16h2c0.547 0 1 0.453 1 1 0 0.266-0.109 0.516-0.297 0.703l-4 4c-0.187 0.187-0.438 0.297-0.703 0.297s-0.516-0.109-0.703-0.297l-4-4c-0.187-0.187-0.297-0.438-0.297-0.703 0-0.547 0.453-1 1-1h2v-16h-2c-0.547 0-1-0.453-1-1 0-0.266 0.109-0.516 0.297-0.703l4-4c0.187-0.187 0.438-0.297 0.703-0.297s0.516 0.109 0.703 0.297l4 4c0.187 0.187 0.297 0.438 0.297 0.703z' }),
        viewBox: '0 0 12 28'
      }, this.props));
    }
  }]);

  return MoveVertButton;
}(_react2.default.Component);

exports.default = MoveVertButton;