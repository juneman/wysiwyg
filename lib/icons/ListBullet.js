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

var ListBullet = function (_React$Component) {
  _inherits(ListBullet, _React$Component);

  function ListBullet() {
    _classCallCheck(this, ListBullet);

    return _possibleConstructorReturn(this, (ListBullet.__proto__ || Object.getPrototypeOf(ListBullet)).apply(this, arguments));
  }

  _createClass(ListBullet, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'add',
        pathNode: _react2.default.createElement('path', { d: 'M6 22c0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3 3 1.344 3 3zM6 14c0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3 3 1.344 3 3zM28 20.5v3c0 0.266-0.234 0.5-0.5 0.5h-19c-0.266 0-0.5-0.234-0.5-0.5v-3c0-0.266 0.234-0.5 0.5-0.5h19c0.266 0 0.5 0.234 0.5 0.5zM6 6c0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3 3 1.344 3 3zM28 12.5v3c0 0.266-0.234 0.5-0.5 0.5h-19c-0.266 0-0.5-0.234-0.5-0.5v-3c0-0.266 0.234-0.5 0.5-0.5h19c0.266 0 0.5 0.234 0.5 0.5zM28 4.5v3c0 0.266-0.234 0.5-0.5 0.5h-19c-0.266 0-0.5-0.234-0.5-0.5v-3c0-0.266 0.234-0.5 0.5-0.5h19c0.266 0 0.5 0.234 0.5 0.5z' }),
        viewBox: '0 0 28 28'
      }, this.props));
    }
  }]);

  return ListBullet;
}(_react2.default.Component);

exports.default = ListBullet;