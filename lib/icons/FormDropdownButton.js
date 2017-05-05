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

var FormDropdownButton = function (_React$PureComponent) {
  _inherits(FormDropdownButton, _React$PureComponent);

  function FormDropdownButton() {
    _classCallCheck(this, FormDropdownButton);

    return _possibleConstructorReturn(this, (FormDropdownButton.__proto__ || Object.getPrototypeOf(FormDropdownButton)).apply(this, arguments));
  }

  _createClass(FormDropdownButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'form-dropdown',
        pathNode: _react2.default.createElement('path', { d: 'M14,0.911763623 L14,9.08823638 C14,10.1112147 13.1700365,9.9411782 12.1470582,9.9411782 L1.85294183,9.9411782 C0.829963526,9.9411782 9.09494702e-13,10.1112147 9.09494702e-13,9.08823638 L9.09494702e-13,0.911763623 C9.09494702e-13,-0.111214677 0.829963526,0.058821797 1.85294183,0.058821797 L12.1470582,0.058821797 C13.1700365,0.058821797 14,-0.111214677 14,0.911763623 Z M12.1428633,4.32142895 C12.1428633,4.1456475 11.9972158,4 11.8214343,4 L7.32142895,4 C7.1456475,4 7,4.1456475 7,4.32142895 C7,4.40680852 7.03515629,4.48716576 7.09542422,4.54743369 L9.3454269,6.79743637 C9.40569483,6.8577043 9.48605207,6.89286059 9.57143164,6.89286059 C9.6568112,6.89286059 9.73716844,6.8577043 9.79743637,6.79743637 L12.0474391,4.54743369 C12.107707,4.48716576 12.1428633,4.40680852 12.1428633,4.32142895 Z' }),
        viewBox: '0 0 14 10'
      }, this.props));
    }
  }]);

  return FormDropdownButton;
}(_react2.default.PureComponent);

exports.default = FormDropdownButton;