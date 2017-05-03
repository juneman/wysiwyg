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

var FontStyleButton = function (_React$Component) {
  _inherits(FontStyleButton, _React$Component);

  function FontStyleButton() {
    _classCallCheck(this, FontStyleButton);

    return _possibleConstructorReturn(this, (FontStyleButton.__proto__ || Object.getPrototypeOf(FontStyleButton)).apply(this, arguments));
  }

  _createClass(FontStyleButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'font-style',
        pathNode: _react2.default.createElement('path', { d: 'M11.328 8.734l-2.656 7.031c1.547 0.016 3.094 0.063 4.641 0.063 0.297 0 0.594-0.016 0.891-0.031-0.812-2.375-1.766-4.797-2.875-7.063zM0 26l0.031-1.234c1.469-0.453 3.063-0.141 3.719-1.828l3.703-9.625 4.375-11.312h2c0.063 0.109 0.125 0.219 0.172 0.328l3.203 7.5c1.172 2.766 2.25 5.563 3.437 8.313 0.703 1.625 1.25 3.297 2.031 4.891 0.109 0.25 0.328 0.719 0.547 0.891 0.516 0.406 1.953 0.5 2.688 0.781 0.047 0.297 0.094 0.594 0.094 0.891 0 0.141-0.016 0.266-0.016 0.406-1.984 0-3.969-0.25-5.953-0.25-2.047 0-4.094 0.172-6.141 0.234 0-0.406 0.016-0.812 0.063-1.219l2.047-0.438c0.422-0.094 1.25-0.203 1.25-0.781 0-0.562-2.016-5.203-2.266-5.844l-7.031-0.031c-0.406 0.906-1.984 5-1.984 5.594 0 1.203 2.297 1.25 3.187 1.375 0.016 0.297 0.016 0.594 0.016 0.906 0 0.141-0.016 0.281-0.031 0.422-1.813 0-3.641-0.313-5.453-0.313-0.219 0-0.531 0.094-0.75 0.125-0.984 0.172-1.953 0.219-2.938 0.219z' }),
        viewBox: '0 0 26 28'
      }, this.props));
    }
  }]);

  return FontStyleButton;
}(_react2.default.Component);

exports.default = FontStyleButton;