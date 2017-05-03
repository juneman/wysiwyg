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

var AdvancedStyling = function (_React$Component) {
  _inherits(AdvancedStyling, _React$Component);

  function AdvancedStyling() {
    _classCallCheck(this, AdvancedStyling);

    return _possibleConstructorReturn(this, (AdvancedStyling.__proto__ || Object.getPrototypeOf(AdvancedStyling)).apply(this, arguments));
  }

  _createClass(AdvancedStyling, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'advanced-styling',
        pathNode: _react2.default.createElement('path', { d: 'M32 6h-2v16h2v6h-6v-2h-20v2h-6v-6h2v-16h-2v-6h6v2h20v-2h6v6zM28 2v2h2v-2h-2zM2 2v2h2v-2h-2zM4 26v-2h-2v2h2zM26 24v-2h2v-16h-2v-2h-20v2h-2v16h2v2h20zM30 26v-2h-2v2h2zM20 10h6v12h-14v-4h-6v-12h14v4zM8 16h10v-8h-10v8zM24 20v-8h-4v6h-6v2h10z' }),
        viewBox: '0 0 32 28'
      }, this.props));
    }
  }]);

  return AdvancedStyling;
}(_react2.default.Component);

exports.default = AdvancedStyling;