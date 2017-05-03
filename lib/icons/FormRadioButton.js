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

var FormRadioButton = function (_React$Component) {
  _inherits(FormRadioButton, _React$Component);

  function FormRadioButton() {
    _classCallCheck(this, FormRadioButton);

    return _possibleConstructorReturn(this, (FormRadioButton.__proto__ || Object.getPrototypeOf(FormRadioButton)).apply(this, arguments));
  }

  _createClass(FormRadioButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'form-radio',
        pathNode: _react2.default.createElement('path', { d: 'M7.42858028,6.35713732 C7.42858028,7.38001801 6.5943159,8.21428239 5.57143521,8.21428239 C4.54855453,8.21428239 3.71429014,7.38001801 3.71429014,6.35713732 C3.71429014,5.33425664 4.54855453,4.49999225 5.57143521,4.49999225 C6.5943159,4.49999225 7.42858028,5.33425664 7.42858028,6.35713732 Z M5.57143521,2.41070405 C3.39509333,2.41070405 1.62500194,4.18079544 1.62500194,6.35713732 C1.62500194,8.5334792 3.39509333,10.3035706 5.57143521,10.3035706 C7.74777709,10.3035706 9.51786849,8.5334792 9.51786849,6.35713732 C9.51786849,4.18079544 7.74777709,2.41070405 5.57143521,2.41070405 Z M11.1428704,6.35713732 C11.1428704,9.43303385 8.64733174,11.9285725 5.57143521,11.9285725 C2.49553869,11.9285725 0,9.43303385 0,6.35713732 C0,3.2812408 2.49553869,0.785702109 5.57143521,0.785702109 C8.64733174,0.785702109 11.1428704,3.2812408 11.1428704,6.35713732 Z' }),
        viewBox: '0 0 12 12'
      }, this.props));
    }
  }]);

  return FormRadioButton;
}(_react2.default.Component);

exports.default = FormRadioButton;