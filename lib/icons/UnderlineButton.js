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

var UnderlineButton = function (_React$Component) {
  _inherits(UnderlineButton, _React$Component);

  function UnderlineButton() {
    _classCallCheck(this, UnderlineButton);

    return _possibleConstructorReturn(this, (UnderlineButton.__proto__ || Object.getPrototypeOf(UnderlineButton)).apply(this, arguments));
  }

  _createClass(UnderlineButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'format_underlined',
        pathNode: _react2.default.createElement('path', { d: 'M5.016 18.984h13.969v2.016h-13.969v-2.016zM12 17.016c-3.328 0-6-2.672-6-6v-8.016h2.484v8.016c0 1.922 1.594 3.469 3.516 3.469s3.516-1.547 3.516-3.469v-8.016h2.484v8.016c0 3.328-2.672 6-6 6z' })
      }, this.props));
    }
  }]);

  return UnderlineButton;
}(_react2.default.Component);

exports.default = UnderlineButton;