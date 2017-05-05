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

var LinkButton = function (_React$PureComponent) {
  _inherits(LinkButton, _React$PureComponent);

  function LinkButton() {
    _classCallCheck(this, LinkButton);

    return _possibleConstructorReturn(this, (LinkButton.__proto__ || Object.getPrototypeOf(LinkButton)).apply(this, arguments));
  }

  _createClass(LinkButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'link',
        pathNode: _react2.default.createElement('path', { d: 'M22.75 19c0-0.406-0.156-0.781-0.438-1.062l-3.25-3.25c-0.281-0.281-0.672-0.438-1.062-0.438-0.453 0-0.812 0.172-1.125 0.5 0.516 0.516 1.125 0.953 1.125 1.75 0 0.828-0.672 1.5-1.5 1.5-0.797 0-1.234-0.609-1.75-1.125-0.328 0.313-0.516 0.672-0.516 1.141 0 0.391 0.156 0.781 0.438 1.062l3.219 3.234c0.281 0.281 0.672 0.422 1.062 0.422s0.781-0.141 1.062-0.406l2.297-2.281c0.281-0.281 0.438-0.656 0.438-1.047zM11.766 7.984c0-0.391-0.156-0.781-0.438-1.062l-3.219-3.234c-0.281-0.281-0.672-0.438-1.062-0.438s-0.781 0.156-1.062 0.422l-2.297 2.281c-0.281 0.281-0.438 0.656-0.438 1.047 0 0.406 0.156 0.781 0.438 1.062l3.25 3.25c0.281 0.281 0.672 0.422 1.062 0.422 0.453 0 0.812-0.156 1.125-0.484-0.516-0.516-1.125-0.953-1.125-1.75 0-0.828 0.672-1.5 1.5-1.5 0.797 0 1.234 0.609 1.75 1.125 0.328-0.313 0.516-0.672 0.516-1.141zM25.75 19c0 1.188-0.484 2.344-1.328 3.172l-2.297 2.281c-0.844 0.844-1.984 1.297-3.172 1.297-1.203 0-2.344-0.469-3.187-1.328l-3.219-3.234c-0.844-0.844-1.297-1.984-1.297-3.172 0-1.234 0.5-2.406 1.375-3.266l-1.375-1.375c-0.859 0.875-2.016 1.375-3.25 1.375-1.188 0-2.344-0.469-3.187-1.313l-3.25-3.25c-0.859-0.859-1.313-1.984-1.313-3.187 0-1.188 0.484-2.344 1.328-3.172l2.297-2.281c0.844-0.844 1.984-1.297 3.172-1.297 1.203 0 2.344 0.469 3.187 1.328l3.219 3.234c0.844 0.844 1.297 1.984 1.297 3.172 0 1.234-0.5 2.406-1.375 3.266l1.375 1.375c0.859-0.875 2.016-1.375 3.25-1.375 1.188 0 2.344 0.469 3.187 1.313l3.25 3.25c0.859 0.859 1.313 1.984 1.313 3.187z' }),
        viewBox: '0 0 26 28'
      }, this.props));
    }
  }]);

  return LinkButton;
}(_react2.default.PureComponent);

exports.default = LinkButton;