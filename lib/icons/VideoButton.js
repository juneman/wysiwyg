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

var VideoButton = function (_React$Component) {
  _inherits(VideoButton, _React$Component);

  function VideoButton() {
    _classCallCheck(this, VideoButton);

    return _possibleConstructorReturn(this, (VideoButton.__proto__ || Object.getPrototypeOf(VideoButton)).apply(this, arguments));
  }

  _createClass(VideoButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'video',
        pathNode: _react2.default.createElement('path', { d: 'M28 5.5v17c0 0.406-0.25 0.766-0.609 0.922-0.125 0.047-0.266 0.078-0.391 0.078-0.266 0-0.516-0.094-0.703-0.297l-6.297-6.297v2.594c0 2.484-2.016 4.5-4.5 4.5h-11c-2.484 0-4.5-2.016-4.5-4.5v-11c0-2.484 2.016-4.5 4.5-4.5h11c2.484 0 4.5 2.016 4.5 4.5v2.578l6.297-6.281c0.187-0.203 0.438-0.297 0.703-0.297 0.125 0 0.266 0.031 0.391 0.078 0.359 0.156 0.609 0.516 0.609 0.922z' }),
        viewBox: '0 0 28 28'
      }, this.props));
    }
  }]);

  return VideoButton;
}(_react2.default.Component);

exports.default = VideoButton;