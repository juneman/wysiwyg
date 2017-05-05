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

var ListNumbered = function (_React$PureComponent) {
  _inherits(ListNumbered, _React$PureComponent);

  function ListNumbered() {
    _classCallCheck(this, ListNumbered);

    return _possibleConstructorReturn(this, (ListNumbered.__proto__ || Object.getPrototypeOf(ListNumbered)).apply(this, arguments));
  }

  _createClass(ListNumbered, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'add',
        pathNode: _react2.default.createElement('path', { d: 'M5.953 25.312c0 1.719-1.344 2.688-2.969 2.688-0.984 0-1.984-0.328-2.688-1.031l0.891-1.375c0.422 0.391 1.062 0.703 1.656 0.703 0.547 0 1.125-0.266 1.125-0.891 0-0.875-1-0.922-1.641-0.875l-0.406-0.875c0.562-0.719 1.078-1.516 1.75-2.125v-0.016c-0.5 0-1.016 0.031-1.516 0.031v0.828h-1.656v-2.375h5.203v1.375l-1.484 1.797c1.047 0.25 1.734 1.062 1.734 2.141zM5.984 15.516v2.484h-5.656c-0.047-0.281-0.094-0.562-0.094-0.844 0-2.891 3.531-3.328 3.531-4.641 0-0.531-0.328-0.812-0.844-0.812-0.547 0-1 0.469-1.266 0.906l-1.328-0.922c0.516-1.078 1.578-1.687 2.766-1.687 1.453 0 2.703 0.859 2.703 2.406 0 2.312-3.391 2.828-3.437 4.047h1.984v-0.938h1.641zM28 20.5v3c0 0.266-0.234 0.5-0.5 0.5h-19c-0.281 0-0.5-0.234-0.5-0.5v-3c0-0.281 0.219-0.5 0.5-0.5h19c0.266 0 0.5 0.219 0.5 0.5zM6 6.453v1.547h-5.234v-1.547h1.672c0-1.266 0.016-2.531 0.016-3.797v-0.187h-0.031c-0.172 0.344-0.484 0.578-0.781 0.844l-1.109-1.188 2.125-1.984h1.656v6.312h1.687zM28 12.5v3c0 0.266-0.234 0.5-0.5 0.5h-19c-0.281 0-0.5-0.234-0.5-0.5v-3c0-0.281 0.219-0.5 0.5-0.5h19c0.266 0 0.5 0.219 0.5 0.5zM28 4.5v3c0 0.266-0.234 0.5-0.5 0.5h-19c-0.281 0-0.5-0.234-0.5-0.5v-3c0-0.266 0.219-0.5 0.5-0.5h19c0.266 0 0.5 0.234 0.5 0.5z' }),
        viewBox: '0 0 28 28'
      }, this.props));
    }
  }]);

  return ListNumbered;
}(_react2.default.PureComponent);

exports.default = ListNumbered;