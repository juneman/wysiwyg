'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A React component that gives a light wrapper
 * around toolbars and menus in a consistent format
 * @class
 */
var Menu = function (_React$Component) {
  _inherits(Menu, _React$Component);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
  }

  _createClass(Menu, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          className = _props.className,
          children = _props.children;


      var menuStyles = Object.assign({}, {
        backgroundColor: '#F6F6F6',
        borderRadius: 5,
        border: '1px solid #D0D0D0',
        boxShadow: '1px 1px 3px rgba(0,0,0,0.2)'
      }, style);

      return _react2.default.createElement(
        'div',
        { style: menuStyles, className: className },
        children
      );
    }
  }]);

  return Menu;
}(_react2.default.Component);

exports.default = Menu;


Menu.propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.element]).isRequired,
  style: _propTypes2.default.object,
  className: _propTypes2.default.string
};