'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _reactColor = require('react-color');

var _Menu = require('../components/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _editor = require('../helpers/styles/editor');

var _SquareButton = require('../icons/SquareButton');

var _SquareButton2 = _interopRequireDefault(_SquareButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BackgroundColor = function (_React$Component) {
  _inherits(BackgroundColor, _React$Component);

  function BackgroundColor() {
    _classCallCheck(this, BackgroundColor);

    return _possibleConstructorReturn(this, (BackgroundColor.__proto__ || Object.getPrototypeOf(BackgroundColor)).apply(this, arguments));
  }

  _createClass(BackgroundColor, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          isActive = _props.isActive,
          persistedState = _props.persistedState;


      var selectedColor = persistedState.get('backgroundColor') || '#C0C0C0';
      var buttonProps = {
        hideBackground: true,
        color: selectedColor
      };

      var dropdownStyles = {
        position: 'absolute',
        top: 45,
        left: 0,
        padding: 5
      };

      var titleStyles = _editor.secondaryMenuTitleStyle;

      var dropdownNodes = isActive ? _react2.default.createElement(
        _Menu2.default,
        { style: dropdownStyles },
        _react2.default.createElement(
          'div',
          { style: titleStyles },
          'Select a Background Color'
        ),
        _react2.default.createElement(_reactColor.CompactPicker, {
          onChangeComplete: function onChangeComplete(color) {
            return _this2.handleColor(color);
          },
          color: selectedColor
        })
      ) : null;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_SquareButton2.default, _extends({ onClick: function onClick() {
            return _this2.toggleDropdown();
          } }, buttonProps)),
        dropdownNodes
      );
    }
  }, {
    key: 'toggleDropdown',
    value: function toggleDropdown() {
      var _props2 = this.props,
          onToggleActive = _props2.onToggleActive,
          isActive = _props2.isActive;

      onToggleActive(!isActive);
    }
  }, {
    key: 'handleColor',
    value: function handleColor(color) {
      var _props3 = this.props,
          localState = _props3.localState,
          persistedState = _props3.persistedState,
          onChange = _props3.onChange;

      var toggledColor = color.hex;

      var newPersistedState = persistedState.set('backgroundColor', toggledColor);

      onChange({
        localState: localState,
        persistedState: newPersistedState
      });
    }
  }]);

  return BackgroundColor;
}(_react2.default.Component);

exports.default = BackgroundColor;


BackgroundColor.propTypes = {
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onToggleActive: _propTypes2.default.func.isRequired,
  isActive: _propTypes2.default.bool.isRequired
};