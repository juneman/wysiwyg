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

var _draftJs = require('draft-js');

var _editor = require('../helpers/styles/editor');

var _Menu = require('../components/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _FontStyleButton = require('../icons/FontStyleButton');

var _FontStyleButton2 = _interopRequireDefault(_FontStyleButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// https://draftjs.org/docs/advanced-topics-custom-block-render-map.html
var styleOptions = [{
  name: 'Normal',
  value: 'unstyled'
}, {
  name: 'Header 1',
  value: 'header-one'
}, {
  name: 'Header 2',
  value: 'header-two'
}, {
  name: 'Header 3',
  value: 'header-three'
}, {
  name: 'Header 4',
  value: 'header-four'
}];

var TextStyle = function (_React$Component) {
  _inherits(TextStyle, _React$Component);

  function TextStyle(props) {
    _classCallCheck(this, TextStyle);

    var _this = _possibleConstructorReturn(this, (TextStyle.__proto__ || Object.getPrototypeOf(TextStyle)).call(this, props));

    var currentBlockType = _this.findCurrentBlockType(props.localState);

    _this.state = {
      blockType: currentBlockType
    };
    return _this;
  }

  _createClass(TextStyle, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var currentBlockType = this.findCurrentBlockType(nextProps.localState);
      if (currentBlockType !== this.state.blockType) {
        this.setState({
          blockType: currentBlockType
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var blockType = this.state.blockType;
      var isActive = this.props.isActive;


      var buttonProps = (0, _editor.getButtonProps)(isActive);

      var dropdownStyles = {
        position: 'absolute',
        top: 45,
        left: 0,
        padding: 10,
        width: 300
      };

      var titleStyles = _editor.secondaryMenuTitleStyle;

      var dropdownNodes = isActive ? _react2.default.createElement(
        _Menu2.default,
        { style: dropdownStyles },
        _react2.default.createElement(
          'div',
          { style: titleStyles },
          'Text Style'
        ),
        _react2.default.createElement(
          'select',
          { className: 'form-control', onChange: function onChange(e) {
              return _this2.handleSave(e);
            }, value: blockType },
          styleOptions.map(function (styleOption) {
            return _react2.default.createElement(
              'option',
              { key: styleOption.value, value: styleOption.value },
              styleOption.name
            );
          })
        )
      ) : null;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_FontStyleButton2.default, _extends({ onClick: function onClick() {
            return _this2.toggleDropdown();
          } }, buttonProps)),
        dropdownNodes
      );
    }
  }, {
    key: 'findCurrentBlockType',
    value: function findCurrentBlockType(localState) {
      var editorState = localState.get('editorState');
      var currentBlockType = 'unstyled';
      if (editorState) {
        currentBlockType = _draftJs.RichUtils.getCurrentBlockType(editorState);
      }
      return currentBlockType;
    }
  }, {
    key: 'toggleDropdown',
    value: function toggleDropdown() {
      var _props = this.props,
          onToggleActive = _props.onToggleActive,
          isActive = _props.isActive;

      this.setState({
        blockType: 'unstyled'
      });
      onToggleActive(!isActive);
    }
  }, {
    key: 'handleSave',
    value: function handleSave(e) {
      e.preventDefault();
      this.handleFormat(e.target.value);
    }
  }, {
    key: 'handleFormat',
    value: function handleFormat(selectedValue) {
      var _props2 = this.props,
          localState = _props2.localState,
          persistedState = _props2.persistedState,
          onChange = _props2.onChange,
          onToggleActive = _props2.onToggleActive;


      var newLocalState = localState.set('editorState', _draftJs.RichUtils.toggleBlockType(localState.get('editorState'), selectedValue));

      this.setState({
        blockType: 'unstyled'
      });

      onToggleActive(false);

      onChange({
        localState: newLocalState,
        persistedState: persistedState
      });
    }
  }]);

  return TextStyle;
}(_react2.default.Component);

exports.default = TextStyle;


TextStyle.propTypes = {
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onToggleActive: _propTypes2.default.func.isRequired,
  isActive: _propTypes2.default.bool.isRequired
};