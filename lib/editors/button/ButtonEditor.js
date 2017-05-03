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

var _htmlParseStringify = require('html-parse-stringify2');

var _htmlParseStringify2 = _interopRequireDefault(_htmlParseStringify);

var _striptags = require('striptags');

var _striptags2 = _interopRequireDefault(_striptags);

var _convert = require('../../helpers/draft/convert');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonEditor = function (_React$Component) {
  _inherits(ButtonEditor, _React$Component);

  function ButtonEditor() {
    _classCallCheck(this, ButtonEditor);

    return _possibleConstructorReturn(this, (ButtonEditor.__proto__ || Object.getPrototypeOf(ButtonEditor)).apply(this, arguments));
  }

  _createClass(ButtonEditor, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var persistedState = this.props.persistedState;

      var htmlContent = persistedState.get('content') || '<p>Button Text</p>';
      var initialEditorState = _draftJs.EditorState.createWithContent((0, _convert.convertFromHTML)(htmlContent), _convert.decorator);
      this.handleEditorStateChange(initialEditorState);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var persistedState = this.props.persistedState;


      var htmlContent = persistedState.get('content') || '<p>Button Text</p>';

      if (nextProps.isEditing && nextProps.localState.isEmpty()) {
        // If there is no editorState, create a new blank one
        var initialEditorState = _draftJs.EditorState.createWithContent((0, _convert.convertFromHTML)(htmlContent), _convert.decorator);
        this.handleEditorStateChange(initialEditorState);
      } else if (nextProps.isEditing) {
        // If editorState changes from the toolbar, push any changes up the chain
        var oldEditorState = this.props.localState.get('editorState');
        var newEditorState = nextProps.localState.get('editorState');
        if (oldEditorState !== newEditorState) {
          this.handleEditorStateChange(newEditorState);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          isEditing = _props.isEditing,
          persistedState = _props.persistedState,
          localState = _props.localState;

      var editorState = localState.get('editorState');

      var content = persistedState.get('content') || '<p>Button Text</p>';

      var _persistedState$toJS = persistedState.toJS(),
          textAlign = _persistedState$toJS.textAlign,
          className = _persistedState$toJS.className;

      var buttonStyleProps = ['backgroundColor', 'borderRadius', 'padding', 'width', 'fontSize'];
      var classNameString = className && className.length ? className : '';

      var containerStyle = {};
      if (textAlign) {
        containerStyle.textAlign = textAlign;
      }
      var buttonStyle = {};
      buttonStyleProps.forEach(function (key) {
        if (persistedState.get(key)) {
          buttonStyle[key] = persistedState.get(key);
        }
      });

      return _react2.default.createElement(
        'div',
        { className: 'button-wrapper', style: containerStyle },
        isEditing ? editorState ? _react2.default.createElement(
          'div',
          { className: 'btn', style: _extends({ display: 'inline-block' }, buttonStyle) },
          _react2.default.createElement(_draftJs.Editor, {
            editorState: editorState,
            customStyleFn: _convert.customStyleFn,
            blockStyleFn: _convert.blockStyleFn,
            onChange: function onChange(editorState) {
              return _this2.handleEditorStateChange(editorState);
            }
          })
        ) : null : _react2.default.createElement(
          'button',
          { className: 'btn ' + classNameString, style: buttonStyle, disabled: true },
          _react2.default.createElement('span', {
            dangerouslySetInnerHTML: { __html: content }
          })
        )
      );
    }
  }, {
    key: 'handleEditorStateChange',
    value: function handleEditorStateChange(editorState) {
      var _props2 = this.props,
          persistedState = _props2.persistedState,
          localState = _props2.localState,
          onChange = _props2.onChange;

      var htmlContent = (0, _convert.convertToHTML)(editorState);

      var newPersistedState = persistedState.set('content', htmlContent);
      var newLocalState = localState.set('editorState', editorState);

      onChange({
        persistedState: newPersistedState,
        localState: newLocalState,
        html: this.generateHTML(newPersistedState)
      });
    }
  }, {
    key: 'generateHTML',
    value: function generateHTML(persistedState) {
      var _buttonAttrs;

      var zone = this.props.zone;

      var _persistedState$toJS2 = persistedState.toJS(),
          _persistedState$toJS3 = _persistedState$toJS2.content,
          content = _persistedState$toJS3 === undefined ? '<p></p>' : _persistedState$toJS3,
          textAlign = _persistedState$toJS2.textAlign,
          backgroundColor = _persistedState$toJS2.backgroundColor,
          href = _persistedState$toJS2.href,
          isNewWindow = _persistedState$toJS2.isNewWindow,
          buttonAction = _persistedState$toJS2.buttonAction;

      var wrapperAttrs = {
        class: 'button-wrapper'
      };
      if (textAlign) {
        wrapperAttrs.style = 'text-align:' + textAlign + ';';
      }

      var buttonAttrs = (_buttonAttrs = {
        class: 'btn'
      }, _defineProperty(_buttonAttrs, 'data-field-id', zone.get('id')), _defineProperty(_buttonAttrs, 'value', (0, _striptags2.default)(content)), _buttonAttrs);
      if (backgroundColor) {
        buttonAttrs.style = 'background-color:' + backgroundColor + ';';
      }
      if (href) {
        buttonAttrs.href = href;
        buttonAttrs.target = isNewWindow ? '_target' : '_self';
      } else if (buttonAction) {
        buttonAttrs['data-step'] = buttonAction;
      }

      var contentAst = _htmlParseStringify2.default.parse(content);

      var ast = [];
      ast.push({
        type: 'tag',
        name: 'div',
        voidElement: false,
        attrs: wrapperAttrs,
        children: [{
          type: 'tag',
          name: href ? 'a' : 'button',
          voidElement: false,
          attrs: buttonAttrs,
          children: contentAst
        }]
      });

      return _htmlParseStringify2.default.stringify(ast);
    }
  }]);

  return ButtonEditor;
}(_react2.default.Component);

exports.default = ButtonEditor;


ButtonEditor.propTypes = {
  isEditing: _propTypes2.default.bool.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  zone: _propTypes2.default.instanceOf(_immutable.Map).isRequired
};