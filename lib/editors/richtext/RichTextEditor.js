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

var _draftJs = require('draft-js');

var _convert = require('../../helpers/draft/convert');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RichTextEditor = function (_React$Component) {
  _inherits(RichTextEditor, _React$Component);

  function RichTextEditor() {
    _classCallCheck(this, RichTextEditor);

    return _possibleConstructorReturn(this, (RichTextEditor.__proto__ || Object.getPrototypeOf(RichTextEditor)).apply(this, arguments));
  }

  _createClass(RichTextEditor, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var persistedState = this.props.persistedState;

      var htmlContent = persistedState.get('content') || '<p>Edit This Text</p>';
      var initialEditorState = _draftJs.EditorState.createWithContent((0, _convert.convertFromHTML)(htmlContent), _convert.decorator);
      this.handleEditorStateChange(initialEditorState);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var persistedState = this.props.persistedState;


      var htmlContent = persistedState.get('content') || '<p>Edit This Text</p>';

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
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.editorShadowRoot = this.wrapper.getRootNode();
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

      var content = persistedState.get('content') || '<p>Edit This Text</p>';

      var wrapperStyle = {};

      // The draft editor needs a little breathing room
      if (isEditing) {
        wrapperStyle.minHeight = 60;
      }

      return _react2.default.createElement(
        'div',
        { className: 'rich-text', ref: function ref(el) {
            return _this2.wrapper = el;
          }, style: wrapperStyle },
        isEditing ? editorState ? _react2.default.createElement(_draftJs.Editor, {
          ref: function ref(editor) {
            return _this2.editor = editor;
          },
          editorState: editorState,
          customStyleFn: _convert.customStyleFn,
          blockStyleFn: _convert.blockStyleFn,
          onChange: function onChange(editorState) {
            return _this2.handleEditorStateChange(editorState);
          }
        }) : null : _react2.default.createElement('div', {
          dangerouslySetInnerHTML: {
            __html: content
          }
        })
      );
    }

    // Instance Method

  }, {
    key: 'focus',
    value: function focus() {
      if (this.editor) {
        this.editor.focus();
      }
    }
  }, {
    key: 'handleEditorStateChange',
    value: function handleEditorStateChange(editorState) {
      var _props2 = this.props,
          persistedState = _props2.persistedState,
          localState = _props2.localState;


      var htmlContent = (0, _convert.convertToHTML)(editorState);

      var newPersistedState = persistedState.set('content', htmlContent);
      var newLocalState = localState.set('editorState', editorState);

      this.props.onChange({
        persistedState: newPersistedState,
        localState: newLocalState,
        html: this.generateHTML(newPersistedState)
      });
    }
  }, {
    key: 'generateHTML',
    value: function generateHTML(persistedState) {
      var height = persistedState.get('height');
      var width = persistedState.get('width');
      var content = persistedState.get('content') || '';

      var styles = '';
      if (height) {
        styles += 'height:' + height + ';';
      }
      if (width) {
        styles += 'width:' + width + ';';
      }
      var stylesTag = styles && styles.length ? ' style="' + styles + '"' : '';

      var html = '<div class="rich-text"' + stylesTag + '><div>' + content + '</div></div>';
      return html;
    }
  }]);

  return RichTextEditor;
}(_react2.default.Component);

exports.default = RichTextEditor;


RichTextEditor.propTypes = {
  isEditing: _propTypes2.default.bool.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired
};