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

var BoldButton = function (_React$PureComponent) {
  _inherits(BoldButton, _React$PureComponent);

  function BoldButton() {
    _classCallCheck(this, BoldButton);

    return _possibleConstructorReturn(this, (BoldButton.__proto__ || Object.getPrototypeOf(BoldButton)).apply(this, arguments));
  }

  _createClass(BoldButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'format_bold',
        pathNode: _react2.default.createElement('path', { d: 'M8.672 23.766c0.688 0.297 1.437 0.5 2.188 0.5 3.563 0 5.875-1.422 5.875-5.234 0-0.969-0.125-1.984-0.641-2.812-1.453-2.344-3.547-2.469-6.062-2.469-0.469 0-1.141 0-1.578 0.156 0 1.656-0.016 3.313-0.016 4.953 0 1.078-0.141 4 0.234 4.906zM8.453 12.109c0.562 0.094 1.141 0.109 1.703 0.109 3.219 0 5.516-0.906 5.516-4.516 0-3.047-2.703-4.094-5.313-4.094-0.688 0-1.359 0.094-2.031 0.203 0 1.578 0.125 3.156 0.125 4.734 0 0.828-0.016 1.656-0.016 2.484 0 0.359 0 0.719 0.016 1.078zM0 26l0.031-1.469c1-0.25 2.016-0.266 2.984-0.672 0.547-0.922 0.469-2.547 0.469-3.594 0-0.344 0.031-15.281-0.344-16.016-0.234-0.453-2.531-0.562-3.047-0.625l-0.063-1.297c3.719-0.063 7.438-0.328 11.141-0.328 0.703 0 1.422 0.016 2.125 0.016 3.531 0 7.422 1.687 7.422 5.75 0 2.797-2.125 3.844-4.328 4.844 2.969 0.672 5.609 2.688 5.609 5.969 0 5.375-4.891 7.156-9.469 7.156-1.375 0-2.75-0.094-4.125-0.094-2.797 0-5.625 0.25-8.406 0.359z' }),
        viewBox: '0 0 22 28'
      }, this.props));
    }
  }]);

  return BoldButton;
}(_react2.default.PureComponent);

exports.default = BoldButton;