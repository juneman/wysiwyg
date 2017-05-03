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

var FormButton = function (_React$Component) {
  _inherits(FormButton, _React$Component);

  function FormButton() {
    _classCallCheck(this, FormButton);

    return _possibleConstructorReturn(this, (FormButton.__proto__ || Object.getPrototypeOf(FormButton)).apply(this, arguments));
  }

  _createClass(FormButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'add',
        pathNode: _react2.default.createElement('path', { d: 'M3.00000358,8.24999672 L3.00000358,8.74999732 C3.00000358,8.88280998 2.88281594,8.99999762 2.75000328,8.99999762 L2.25000268,8.99999762 C2.11719002,8.99999762 2.00000238,8.88280998 2.00000238,8.74999732 L2.00000238,8.24999672 C2.00000238,8.11718406 2.11719002,7.99999642 2.25000268,7.99999642 L2.75000328,7.99999642 C2.88281594,7.99999642 3.00000358,8.11718406 3.00000358,8.24999672 Z M3.00000358,6.24999434 L3.00000358,6.74999493 C3.00000358,6.88280759 2.88281594,6.99999523 2.75000328,6.99999523 L2.25000268,6.99999523 C2.11719002,6.99999523 2.00000238,6.88280759 2.00000238,6.74999493 L2.00000238,6.24999434 C2.00000238,6.11718168 2.11719002,5.99999404 2.25000268,5.99999404 L2.75000328,5.99999404 C2.88281594,5.99999404 3.00000358,6.11718168 3.00000358,6.24999434 Z M3.00000358,4.24999195 L3.00000358,4.74999255 C3.00000358,4.88280521 2.88281594,4.99999285 2.75000328,4.99999285 L2.25000268,4.99999285 C2.11719002,4.99999285 2.00000238,4.88280521 2.00000238,4.74999255 L2.00000238,4.24999195 C2.00000238,4.1171793 2.11719002,3.99999166 2.25000268,3.99999166 L2.75000328,3.99999166 C2.88281594,3.99999166 3.00000358,4.1171793 3.00000358,4.24999195 Z M12.0000143,8.24999672 L12.0000143,8.74999732 C12.0000143,8.88280998 11.8828267,8.99999762 11.750014,8.99999762 L4.25000507,8.99999762 C4.11719241,8.99999762 4.00000477,8.88280998 4.00000477,8.74999732 L4.00000477,8.24999672 C4.00000477,8.11718406 4.11719241,7.99999642 4.25000507,7.99999642 L11.750014,7.99999642 C11.8828267,7.99999642 12.0000143,8.11718406 12.0000143,8.24999672 Z M12.0000143,6.24999434 L12.0000143,6.74999493 C12.0000143,6.88280759 11.8828267,6.99999523 11.750014,6.99999523 L4.25000507,6.99999523 C4.11719241,6.99999523 4.00000477,6.88280759 4.00000477,6.74999493 L4.00000477,6.24999434 C4.00000477,6.11718168 4.11719241,5.99999404 4.25000507,5.99999404 L11.750014,5.99999404 C11.8828267,5.99999404 12.0000143,6.11718168 12.0000143,6.24999434 Z M12.0000143,4.24999195 L12.0000143,4.74999255 C12.0000143,4.88280521 11.8828267,4.99999285 11.750014,4.99999285 L4.25000507,4.99999285 C4.11719241,4.99999285 4.00000477,4.88280521 4.00000477,4.74999255 L4.00000477,4.24999195 C4.00000477,4.1171793 4.11719241,3.99999166 4.25000507,3.99999166 L11.750014,3.99999166 C11.8828267,3.99999166 12.0000143,4.1171793 12.0000143,4.24999195 Z M13.0000155,9.74999851 L13.0000155,3.24999076 C13.0000155,3.1171781 12.8828279,2.99999046 12.7500152,2.99999046 L1.25000149,2.99999046 C1.11718883,2.99999046 1.00000119,3.1171781 1.00000119,3.24999076 L1.00000119,9.74999851 C1.00000119,9.88281117 1.11718883,9.99999881 1.25000149,9.99999881 L12.7500152,9.99999881 C12.8828279,9.99999881 13.0000155,9.88281117 13.0000155,9.74999851 Z M14.0000167,1.24998838 L14.0000167,9.74999851 C14.0000167,10.4374993 13.437516,11 12.7500152,11 L1.25000149,11 C0.562500671,11 0,10.4374993 0,9.74999851 L0,1.24998838 C0,0.562487558 0.562500671,-1.31130219e-05 1.25000149,-1.31130219e-05 L12.7500152,-1.31130219e-05 C13.437516,-1.31130219e-05 14.0000167,0.562487558 14.0000167,1.24998838 Z' }),
        viewBox: '0 0 14 11'
      }, this.props));
    }
  }]);

  return FormButton;
}(_react2.default.Component);

exports.default = FormButton;