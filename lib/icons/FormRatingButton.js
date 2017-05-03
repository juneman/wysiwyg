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

var FormRatingButton = function (_React$Component) {
  _inherits(FormRatingButton, _React$Component);

  function FormRatingButton() {
    _classCallCheck(this, FormRatingButton);

    return _possibleConstructorReturn(this, (FormRatingButton.__proto__ || Object.getPrototypeOf(FormRatingButton)).apply(this, arguments));
  }

  _createClass(FormRatingButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'rating',
        pathNode: _react2.default.createElement('path', { d: 'M12.071443,4.55077356 C12.071443,4.33313937 11.8392998,4.2460857 11.6651925,4.21706781 L8.02344706,3.68749128 L6.39119065,0.386706098 C6.3259004,0.248871112 6.20257436,0.0892727077 6.03572148,0.0892727077 C5.8688686,0.0892727077 5.74554256,0.248871112 5.68025231,0.386706098 L4.0479959,3.68749128 L0.406250484,4.21706781 C0.224888661,4.2460857 0,4.33313937 0,4.55077356 C0,4.68135407 0.0943081481,4.80468011 0.181361823,4.89898826 L2.82198997,7.46707168 L2.1981053,11.0943081 C2.19085083,11.1450895 2.18359635,11.1886163 2.18359635,11.2393976 C2.18359635,11.4280139 2.2779045,11.6021213 2.48828422,11.6021213 C2.58984684,11.6021213 2.68415499,11.5658489 2.77846313,11.5150676 L6.03572148,9.80301197 L9.29297983,11.5150676 C9.3800335,11.5658489 9.48159612,11.6021213 9.58315875,11.6021213 C9.79353846,11.6021213 9.88059214,11.4280139 9.88059214,11.2393976 C9.88059214,11.1886163 9.88059214,11.1450895 9.87333766,11.0943081 L9.24945299,7.46707168 L11.8828267,4.89898826 C11.9771348,4.80468011 12.071443,4.68135407 12.071443,4.55077356 Z' }),
        viewBox: '0 0 13 12'
      }, this.props));
    }
  }]);

  return FormRatingButton;
}(_react2.default.Component);

exports.default = FormRatingButton;