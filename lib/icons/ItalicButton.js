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

var ItalicButton = function (_React$PureComponent) {
  _inherits(ItalicButton, _React$PureComponent);

  function ItalicButton() {
    _classCallCheck(this, ItalicButton);

    return _possibleConstructorReturn(this, (ItalicButton.__proto__ || Object.getPrototypeOf(ItalicButton)).apply(this, arguments));
  }

  _createClass(ItalicButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'format_italic',
        pathNode: _react2.default.createElement('path', { d: 'M0 25.969l0.266-1.328c1-0.313 2.078-0.438 3.016-0.922 0.359-0.453 0.531-1.031 0.641-1.578 0.203-1.062 3.609-16.391 3.563-17.641v-0.391c-0.859-0.469-1.906-0.344-2.844-0.5l0.297-1.609c2.016 0.094 4.062 0.25 6.094 0.25 1.656 0 3.313-0.156 4.969-0.25-0.063 0.469-0.172 0.938-0.297 1.391-1.078 0.375-2.219 0.547-3.281 0.969-0.344 0.844-0.422 1.766-0.578 2.656-0.75 4.047-1.75 8.094-2.578 12.109-0.156 0.75-0.922 3.859-0.859 4.516l0.016 0.281c0.953 0.219 1.922 0.328 2.891 0.484-0.031 0.516-0.125 1.031-0.25 1.547-0.344 0-0.672 0.047-1.016 0.047-0.891 0-1.813-0.297-2.703-0.313-1.078-0.016-2.156-0.031-3.219-0.031-1.391 0-2.75 0.234-4.125 0.313z' }),
        viewBox: '0 0 16 28'
      }, this.props));
    }
  }]);

  return ItalicButton;
}(_react2.default.PureComponent);

exports.default = ItalicButton;