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

var AlignCenter = function (_React$Component) {
  _inherits(AlignCenter, _React$Component);

  function AlignCenter() {
    _classCallCheck(this, AlignCenter);

    return _possibleConstructorReturn(this, (AlignCenter.__proto__ || Object.getPrototypeOf(AlignCenter)).apply(this, arguments));
  }

  _createClass(AlignCenter, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'add',
        pathNode: _react2.default.createElement('path', { d: 'M28 21v2c0 0.547-0.453 1-1 1h-26c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h26c0.547 0 1 0.453 1 1zM22 15v2c0 0.547-0.453 1-1 1h-14c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h14c0.547 0 1 0.453 1 1zM26 9v2c0 0.547-0.453 1-1 1h-22c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h22c0.547 0 1 0.453 1 1zM20 3v2c0 0.547-0.453 1-1 1h-10c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h10c0.547 0 1 0.453 1 1z' }),
        viewBox: '0 0 28 28'
      }, this.props));
    }
  }]);

  return AlignCenter;
}(_react2.default.Component);

exports.default = AlignCenter;