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

var _htmlParseStringify = require('html-parse-stringify2');

var _htmlParseStringify2 = _interopRequireDefault(_htmlParseStringify);

var _draftJs = require('draft-js');

var _convert = require('../../helpers/draft/convert');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultContent = '<h1>Title Text</h1><h2>Subtitle Text</h2>';

var HeroEditor = function (_React$Component) {
  _inherits(HeroEditor, _React$Component);

  function HeroEditor() {
    _classCallCheck(this, HeroEditor);

    return _possibleConstructorReturn(this, (HeroEditor.__proto__ || Object.getPrototypeOf(HeroEditor)).apply(this, arguments));
  }

  _createClass(HeroEditor, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var persistedState = this.props.persistedState;

      var htmlContent = persistedState.get('content') || defaultContent;
      var initialEditorState = _draftJs.EditorState.createWithContent((0, _convert.convertFromHTML)(htmlContent), _convert.decorator);
      this.handleEditorStateChange(initialEditorState);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      var persistedState = this.props.persistedState;

      var htmlContent = persistedState.get('content') || defaultContent;
      if (nextProps.isEditing) {
        // If editorState changes from the toolbar, push any changes up the chain
        var oldEditorState = this.props.localState.get('editorState');
        var newEditorState = nextProps.localState.get('editorState');
        if (oldEditorState !== newEditorState) {
          this.handleEditorStateChange(newEditorState);
        } else if (!newEditorState) {
          var initialEditorState = _draftJs.EditorState.createWithContent((0, _convert.convertFromHTML)(htmlContent), _convert.decorator);
          this.handleEditorStateChange(initialEditorState);
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
          localState = _props.localState,
          zonePosition = _props.zonePosition;

      var _persistedState$toJS = persistedState.toJS(),
          url = _persistedState$toJS.url;

      var editorState = localState.get('editorState');
      var content = persistedState.get('content') || defaultContent;

      var wrapperStyle = {
        minHeight: 120,
        backgroundImage: url ? 'url(' + url + ')' : null,
        backgroundSize: 'cover',
        textAlign: 'center'
      };

      var textStyle = {
        width: zonePosition.get('width')
      };

      return _react2.default.createElement(
        'div',
        { className: 'hero', style: wrapperStyle },
        isEditing ? editorState ? _react2.default.createElement(
          'div',
          { style: textStyle },
          _react2.default.createElement(_draftJs.Editor, {
            ref: function ref(editor) {
              return _this2.editor = editor;
            },
            editorState: editorState,
            customStyleFn: _convert.customStyleFn,
            blockStyleFn: _convert.blockStyleFn,
            onChange: function onChange(editorState) {
              return _this2.handleEditorStateChange(editorState);
            }
          })
        ) : null : _react2.default.createElement('div', {
          className: 'hero-content',
          style: textStyle,
          dangerouslySetInnerHTML: {
            __html: content
          }
        })
      );
    }
  }, {
    key: 'generateHTML',
    value: function generateHTML(persistedState) {
      var zonePosition = this.props.zonePosition;

      var _persistedState$toJS2 = persistedState.toJS(),
          url = _persistedState$toJS2.url,
          content = _persistedState$toJS2.content;

      var contentAst = _htmlParseStringify2.default.parse(content);
      var wrapperStyles = [];
      wrapperStyles.push('min-height:120px');
      wrapperStyles.push('background-size:cover');
      wrapperStyles.push('text-align:center');
      if (url) {
        wrapperStyles.push('background-image:url(' + url + ')');
      }
      var textAttrs = {};
      if (zonePosition.get('width')) {
        textAttrs.style = 'width:' + zonePosition.get('width') + 'px;';
      }

      var ast = [{
        type: 'tag',
        name: 'div',
        voidElement: false,
        attrs: {
          class: 'hero',
          style: wrapperStyles.join(';') + ';'
        },
        children: [{
          type: 'tag',
          name: 'div',
          voidElement: false,
          attrs: _extends({
            class: 'hero-content'
          }, textAttrs),
          children: contentAst
        }]
      }];

      return _htmlParseStringify2.default.stringify(ast);
    }

    // Instance Method

  }, {
    key: 'focus',
    value: function focus() {
      var _this3 = this;

      // Wait to steal the focus until the next event loop
      setTimeout(function () {
        if (_this3.editor && _this3.editor.constructor && _this3.editor.constructor.name === 'DraftEditor') {
          _this3.editor.focus();
        }
      }, 0);
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
  }]);

  return HeroEditor;
}(_react2.default.Component);

exports.default = HeroEditor;


HeroEditor.propTypes = {
  isEditing: _propTypes2.default.bool.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  canvasPosition: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  zonePosition: _propTypes2.default.instanceOf(_immutable.Map).isRequired
};