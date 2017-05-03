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

var CodeButton = function (_React$Component) {
  _inherits(CodeButton, _React$Component);

  function CodeButton() {
    _classCallCheck(this, CodeButton);

    return _possibleConstructorReturn(this, (CodeButton.__proto__ || Object.getPrototypeOf(CodeButton)).apply(this, arguments));
  }

  _createClass(CodeButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'add',
        pathNode: _react2.default.createElement('path', { d: 'M9.641 21.859l-0.781 0.781c-0.203 0.203-0.516 0.203-0.719 0l-7.281-7.281c-0.203-0.203-0.203-0.516 0-0.719l7.281-7.281c0.203-0.203 0.516-0.203 0.719 0l0.781 0.781c0.203 0.203 0.203 0.516 0 0.719l-6.141 6.141 6.141 6.141c0.203 0.203 0.203 0.516 0 0.719zM18.875 5.187l-5.828 20.172c-0.078 0.266-0.359 0.422-0.609 0.344l-0.969-0.266c-0.266-0.078-0.422-0.359-0.344-0.625l5.828-20.172c0.078-0.266 0.359-0.422 0.609-0.344l0.969 0.266c0.266 0.078 0.422 0.359 0.344 0.625zM29.141 15.359l-7.281 7.281c-0.203 0.203-0.516 0.203-0.719 0l-0.781-0.781c-0.203-0.203-0.203-0.516 0-0.719l6.141-6.141-6.141-6.141c-0.203-0.203-0.203-0.516 0-0.719l0.781-0.781c0.203-0.203 0.516-0.203 0.719 0l7.281 7.281c0.203 0.203 0.203 0.516 0 0.719z' }),
        viewBox: '0 0 30 28'
      }, this.props));
    }
  }]);

  return CodeButton;
}(_react2.default.Component);

exports.default = CodeButton;