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

var _draftJs = require('draft-js');

var _convert = require('../helpers/draft/convert');

var _editor = require('../helpers/styles/editor');

var _Menu = require('../components/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _FontColorButton = require('../icons/FontColorButton');

var _FontColorButton2 = _interopRequireDefault(_FontColorButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FontColor = function (_React$Component) {
  _inherits(FontColor, _React$Component);

  function FontColor() {
    _classCallCheck(this, FontColor);

    return _possibleConstructorReturn(this, (FontColor.__proto__ || Object.getPrototypeOf(FontColor)).apply(this, arguments));
  }

  _createClass(FontColor, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var isActive = this.props.isActive;


      var selectedColor = this.getCurrentInlineColor();
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
          'Select a Font Color'
        ),
        _react2.default.createElement(_reactColor.CompactPicker, {
          color: selectedColor,
          onChangeComplete: function onChangeComplete(color) {
            return _this2.handleColor(color);
          }
        })
      ) : null;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_FontColorButton2.default, _extends({ onClick: function onClick() {
            return _this2.toggleDropdown();
          } }, buttonProps)),
        dropdownNodes
      );
    }
  }, {
    key: 'toggleDropdown',
    value: function toggleDropdown() {
      var _props = this.props,
          onToggleActive = _props.onToggleActive,
          isActive = _props.isActive;

      onToggleActive(!isActive);
    }
  }, {
    key: 'getCurrentInlineColor',
    value: function getCurrentInlineColor() {
      var localState = this.props.localState;

      var editorState = localState.get('editorState');
      if (editorState) {
        var styles = editorState.getCurrentInlineStyle().toJS();
        if (styles.length) {
          var styleIndex = styles.findIndex(function (style) {
            return style.indexOf(_convert.CUSTOM_STYLE_PREFIX_COLOR) === 0;
          });
          if (styleIndex !== -1) {
            return styles[styleIndex].substring(_convert.CUSTOM_STYLE_PREFIX_COLOR.length);
          }
        }
      }
      return '#000';
    }
  }, {
    key: 'handleColor',
    value: function handleColor(color) {
      var _props2 = this.props,
          localState = _props2.localState,
          persistedState = _props2.persistedState,
          onChange = _props2.onChange;

      var editorState = localState.get('editorState');
      var toggledColor = color.hex;

      var styles = editorState.getCurrentInlineStyle().toJS();
      var nextEditorState = styles.reduce(function (state, styleKey) {
        if (styleKey.startsWith(_convert.CUSTOM_STYLE_PREFIX_COLOR)) {
          return _draftJs.RichUtils.toggleInlineStyle(state, styleKey);
        }
        return state;
      }, editorState);

      nextEditorState = _draftJs.RichUtils.toggleInlineStyle(nextEditorState, _convert.CUSTOM_STYLE_PREFIX_COLOR + toggledColor);

      var newLocalState = localState.set('editorState', nextEditorState);

      onChange({
        localState: newLocalState,
        persistedState: persistedState
      });
    }
  }]);

  return FontColor;
}(_react2.default.Component);

exports.default = FontColor;


FontColor.propTypes = {
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onToggleActive: _propTypes2.default.func.isRequired,
  isActive: _propTypes2.default.bool.isRequired
};