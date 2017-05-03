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

var FormCheckboxButton = function (_React$Component) {
  _inherits(FormCheckboxButton, _React$Component);

  function FormCheckboxButton() {
    _classCallCheck(this, FormCheckboxButton);

    return _possibleConstructorReturn(this, (FormCheckboxButton.__proto__ || Object.getPrototypeOf(FormCheckboxButton)).apply(this, arguments));
  }

  _createClass(FormCheckboxButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'form-checkbox',
        pathNode: _react2.default.createElement('path', { d: 'M4.96931396,9.28068991 L9.42356034,4.82644353 C9.60492216,4.64508171 9.60492216,4.35490279 9.42356034,4.17354097 L8.6836041,3.43358473 C8.50224228,3.25222291 8.21206336,3.25222291 8.03070154,3.43358473 L4.64286268,6.82142359 L3.11216889,5.2907298 C2.93080707,5.10936798 2.64062815,5.10936798 2.45926632,5.2907298 L1.71931009,6.03068604 C1.53794826,6.21204786 1.53794826,6.50222678 1.71931009,6.6835886 L4.3164114,9.28068991 C4.49777322,9.46205174 4.78795214,9.46205174 4.96931396,9.28068991 Z M11.1428704,2.87499031 L11.1428704,9.83928433 C11.1428704,10.9927455 10.2070434,11.9285725 9.05358222,11.9285725 L2.0892882,11.9285725 C0.935827008,11.9285725 0,10.9927455 0,9.83928433 L0,2.87499031 C0,1.72152912 0.935827008,0.785702109 2.0892882,0.785702109 L9.05358222,0.785702109 C10.2070434,0.785702109 11.1428704,1.72152912 11.1428704,2.87499031 Z' }),
        viewBox: '0 0 13 13'
      }, this.props));
    }
  }]);

  return FormCheckboxButton;
}(_react2.default.Component);

exports.default = FormCheckboxButton;