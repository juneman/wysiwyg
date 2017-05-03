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

var ActionButton = function (_React$Component) {
  _inherits(ActionButton, _React$Component);

  function ActionButton() {
    _classCallCheck(this, ActionButton);

    return _possibleConstructorReturn(this, (ActionButton.__proto__ || Object.getPrototypeOf(ActionButton)).apply(this, arguments));
  }

  _createClass(ActionButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'action-button',
        pathNode: _react2.default.createElement('path', { d: 'M18.703 16h-1.703c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h1.703c-0.672-2.25-2.453-4.031-4.703-4.703v1.703c0 0.547-0.453 1-1 1h-2c-0.547 0-1-0.453-1-1v-1.703c-2.25 0.672-4.031 2.453-4.703 4.703h1.703c0.547 0 1 0.453 1 1v2c0 0.547-0.453 1-1 1h-1.703c0.672 2.25 2.453 4.031 4.703 4.703v-1.703c0-0.547 0.453-1 1-1h2c0.547 0 1 0.453 1 1v1.703c2.25-0.672 4.031-2.453 4.703-4.703zM24 13v2c0 0.547-0.453 1-1 1h-2.234c-0.766 3.359-3.406 6-6.766 6.766v2.234c0 0.547-0.453 1-1 1h-2c-0.547 0-1-0.453-1-1v-2.234c-3.359-0.766-6-3.406-6.766-6.766h-2.234c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h2.234c0.766-3.359 3.406-6 6.766-6.766v-2.234c0-0.547 0.453-1 1-1h2c0.547 0 1 0.453 1 1v2.234c3.359 0.766 6 3.406 6.766 6.766h2.234c0.547 0 1 0.453 1 1z' }),
        viewBox: '0 0 24 28'
      }, this.props));
    }
  }]);

  return ActionButton;
}(_react2.default.Component);

exports.default = ActionButton;