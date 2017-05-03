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

var _htmlParseStringify = require('html-parse-stringify2');

var _htmlParseStringify2 = _interopRequireDefault(_htmlParseStringify);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextAreaInputEditor = function (_React$Component) {
  _inherits(TextAreaInputEditor, _React$Component);

  function TextAreaInputEditor() {
    _classCallCheck(this, TextAreaInputEditor);

    return _possibleConstructorReturn(this, (TextAreaInputEditor.__proto__ || Object.getPrototypeOf(TextAreaInputEditor)).apply(this, arguments));
  }

  _createClass(TextAreaInputEditor, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var persistedState = this.props.persistedState;

      var content = persistedState.get('label') || 'Add Label...';
      var initialEditorState = _draftJs.EditorState.createWithContent(_draftJs.ContentState.createFromText(content));
      this.handleEditorStateChange(initialEditorState);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var persistedState = this.props.persistedState;


      var content = persistedState.get('label') || 'Add Label...';

      if (nextProps.isEditing && nextProps.localState.isEmpty()) {
        // If there is no editorState, create a new blank one
        var initialEditorState = _draftJs.EditorState.createWithContent(_draftJs.ContentState.createFromText(content));
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

      var label = persistedState.get('label') || 'Add Label...';
      var placeholder = persistedState.get('placeholder');
      var maxLength = persistedState.get('maxLength') || '';
      var isRequired = persistedState.get('isRequired') || false;

      var containerStyle = {};

      return _react2.default.createElement(
        'div',
        { style: containerStyle },
        isEditing ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'label',
            null,
            editorState ? _react2.default.createElement(_draftJs.Editor, {
              editorState: editorState,
              onChange: function onChange(editorState) {
                return _this2.handleEditorStateChange(editorState);
              }
            }) : null
          ),
          _react2.default.createElement('textarea', { type: 'text', className: 'form-control', onChange: function onChange(e) {
              return _this2.handleInputChange(e);
            }, value: placeholder, placeholder: 'Add Placeholder Text' })
        ) : _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'label',
            null,
            isRequired ? '*' : '',
            ' ',
            label
          ),
          _react2.default.createElement('textarea', { type: 'text', className: 'form-control', value: placeholder, disabled: true, maxLength: maxLength })
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

      var content = editorState.getCurrentContent().getPlainText();

      var newPersistedState = persistedState.set('label', content);
      var newLocalState = localState.set('editorState', editorState);

      onChange({
        persistedState: newPersistedState,
        localState: newLocalState,
        html: this.generateHTML(newPersistedState)
      });
    }
  }, {
    key: 'handleInputChange',
    value: function handleInputChange(e) {
      var label = e.currentTarget.value;
      var _props3 = this.props,
          persistedState = _props3.persistedState,
          localState = _props3.localState,
          onChange = _props3.onChange;


      var newPersistedState = persistedState.set('placeholder', label);

      onChange({
        persistedState: newPersistedState,
        localState: localState,
        html: this.generateHTML(newPersistedState)
      });
    }
  }, {
    key: 'generateHTML',
    value: function generateHTML(persistedState) {
      var zone = this.props.zone;

      var _persistedState$toJS = persistedState.toJS(),
          label = _persistedState$toJS.label,
          placeholder = _persistedState$toJS.placeholder,
          _persistedState$toJS$ = _persistedState$toJS.isRequired,
          isRequired = _persistedState$toJS$ === undefined ? false : _persistedState$toJS$,
          maxLength = _persistedState$toJS.maxLength;

      var inputAttrs = _defineProperty({
        class: 'form-control'
      }, 'data-field-id', zone.get('id'));
      if (isRequired) {
        inputAttrs.required = 'required';
      }
      if (maxLength) {
        inputAttrs['max-length'] = maxLength;
      }
      if (placeholder && placeholder.length) {
        inputAttrs.placeholder = placeholder;
      }

      var ast = [];
      ast.push({
        type: 'tag',
        name: 'div',
        voidElement: false,
        children: [{
          type: 'tag',
          name: 'div',
          voidElement: false,
          attrs: {
            class: 'field-label'
          },
          children: [{
            type: 'text',
            content: label
          }]
        }, {
          type: 'tag',
          name: 'textarea',
          attrs: inputAttrs,
          voidElement: true
        }]
      });

      return _htmlParseStringify2.default.stringify(ast);
    }
  }]);

  return TextAreaInputEditor;
}(_react2.default.Component);

exports.default = TextAreaInputEditor;


TextAreaInputEditor.propTypes = {
  isEditing: _propTypes2.default.bool.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  zone: _propTypes2.default.instanceOf(_immutable.Map).isRequired
};