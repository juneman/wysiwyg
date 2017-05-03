'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _Hyperlink = require('./Hyperlink');

var _Hyperlink2 = _interopRequireDefault(_Hyperlink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HyperlinkBlock = function (_React$Component) {
  _inherits(HyperlinkBlock, _React$Component);

  function HyperlinkBlock() {
    _classCallCheck(this, HyperlinkBlock);

    return _possibleConstructorReturn(this, (HyperlinkBlock.__proto__ || Object.getPrototypeOf(HyperlinkBlock)).apply(this, arguments));
  }

  _createClass(HyperlinkBlock, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          persistedState = _props.persistedState,
          isActive = _props.isActive,
          onToggleActive = _props.onToggleActive;

      var _persistedState$toJS = persistedState.toJS(),
          href = _persistedState$toJS.href,
          isNewWindow = _persistedState$toJS.isNewWindow;

      return _react2.default.createElement(_Hyperlink2.default, {
        href: href,
        isNewWindow: isNewWindow,
        isActive: isActive,
        onToggleActive: onToggleActive,
        onChange: function onChange(href, isNewWindow) {
          return _this2.handleLink(href, isNewWindow);
        }
      });
    }
  }, {
    key: 'handleLink',
    value: function handleLink(href, isNewWindow) {
      var _props2 = this.props,
          localState = _props2.localState,
          persistedState = _props2.persistedState,
          onChange = _props2.onChange;


      var newPersistedState = persistedState.set('href', href).set('isNewWindow', isNewWindow || false).delete('buttonAction');

      onChange({
        localState: localState,
        persistedState: newPersistedState
      });
    }
  }]);

  return HyperlinkBlock;
}(_react2.default.Component);

exports.default = HyperlinkBlock;


HyperlinkBlock.propTypes = {
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onToggleActive: _propTypes2.default.func.isRequired,
  isActive: _propTypes2.default.bool.isRequired
};