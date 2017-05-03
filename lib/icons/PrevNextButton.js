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

var PrevNextButton = function (_React$Component) {
  _inherits(PrevNextButton, _React$Component);

  function PrevNextButton() {
    _classCallCheck(this, PrevNextButton);

    return _possibleConstructorReturn(this, (PrevNextButton.__proto__ || Object.getPrototypeOf(PrevNextButton)).apply(this, arguments));
  }

  _createClass(PrevNextButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_IconButton2.default, _extends({
        title: 'prev-next',
        pathNode: _react2.default.createElement('path', { d: 'M27.266 4.641c0.203 0.203 0.203 0.516 0 0.719l-2.203 2.203c-0.281 0.281-0.672 0.438-1.062 0.438h-21c-0.547 0-1-0.453-1-1v-4c0-0.547 0.453-1 1-1h9v-1c0-0.547 0.453-1 1-1h2c0.547 0 1 0.453 1 1v1h8c0.391 0 0.781 0.156 1.062 0.438zM12 19h4v8c0 0.547-0.453 1-1 1h-2c-0.547 0-1-0.453-1-1v-8zM25 12c0.547 0 1 0.453 1 1v4c0 0.547-0.453 1-1 1h-21c-0.391 0-0.781-0.156-1.062-0.438l-2.203-2.203c-0.203-0.203-0.203-0.516 0-0.719l2.203-2.203c0.281-0.281 0.672-0.438 1.062-0.438h8v-3h4v3h9z' }),
        viewBox: '0 0 28 28'
      }, this.props));
    }
  }]);

  return PrevNextButton;
}(_react2.default.Component);

exports.default = PrevNextButton;