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

var FileUploadbutton = function (_React$Component) {
  _inherits(FileUploadbutton, _React$Component);

  function FileUploadbutton() {
    _classCallCheck(this, FileUploadbutton);

    return _possibleConstructorReturn(this, (FileUploadbutton.__proto__ || Object.getPrototypeOf(FileUploadbutton)).apply(this, arguments));
  }

  _createClass(FileUploadbutton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'file-upload',
        pathNode: _react2.default.createElement('path', { d: 'M20 13.5c0-0.125-0.047-0.266-0.141-0.359l-5.5-5.5c-0.094-0.094-0.219-0.141-0.359-0.141-0.125 0-0.266 0.047-0.359 0.141l-5.484 5.484c-0.094 0.109-0.156 0.234-0.156 0.375 0 0.281 0.219 0.5 0.5 0.5h3.5v5.5c0 0.266 0.234 0.5 0.5 0.5h3c0.266 0 0.5-0.234 0.5-0.5v-5.5h3.5c0.281 0 0.5-0.234 0.5-0.5zM30 18c0 3.313-2.688 6-6 6h-17c-3.859 0-7-3.141-7-7 0-2.719 1.578-5.187 4.031-6.328-0.016-0.234-0.031-0.453-0.031-0.672 0-4.422 3.578-8 8-8 3.25 0 6.172 1.969 7.406 4.969 0.719-0.625 1.641-0.969 2.594-0.969 2.203 0 4 1.797 4 4 0 0.766-0.219 1.516-0.641 2.156 2.719 0.641 4.641 3.063 4.641 5.844z' }),
        viewBox: '0 0 30 28'
      }, this.props));
    }
  }]);

  return FileUploadbutton;
}(_react2.default.Component);

exports.default = FileUploadbutton;