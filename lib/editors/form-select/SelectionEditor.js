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

var _editor = require('../../helpers/styles/editor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectionEditor = function (_React$Component) {
  _inherits(SelectionEditor, _React$Component);

  function SelectionEditor() {
    _classCallCheck(this, SelectionEditor);

    return _possibleConstructorReturn(this, (SelectionEditor.__proto__ || Object.getPrototypeOf(SelectionEditor)).apply(this, arguments));
  }

  _createClass(SelectionEditor, [{
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
      var options = persistedState.get('options') || [];
      var optionString = localState.get('options') || options.join('\n') || '';
      var fieldType = persistedState.get('fieldType') || 'radio';
      var isRequired = persistedState.get('isRequired') || false;

      var placeholder = 'Place each option on a new line, e.g.\n      Apples\n      Oranges\n      Pineapples'.split('\n').map(function (row) {
        return row.trim();
      }).join('\n');

      var dropdownNodes = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'select',
          { className: 'form-control', required: isRequired },
          options.map(function (option) {
            return _react2.default.createElement(
              'option',
              { key: option },
              option
            );
          })
        )
      );

      var buttonListNodes = _react2.default.createElement(
        'div',
        null,
        options.map(function (option) {
          return _react2.default.createElement(
            'div',
            { key: option },
            _react2.default.createElement('input', { type: fieldType }),
            _react2.default.createElement(
              'label',
              null,
              option
            )
          );
        })
      );

      return _react2.default.createElement(
        'div',
        null,
        isEditing ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'label',
            null,
            editorState ? _react2.default.createElement(_draftJs.Editor, {
              ref: function ref(editor) {
                return _this2.editor = editor;
              },
              editorState: editorState,
              onChange: function onChange(editorState) {
                return _this2.handleEditorStateChange(editorState);
              }
            }) : null
          ),
          _react2.default.createElement('textarea', { type: 'text', rows: 5, style: _editor.textInputStyle, placeholder: placeholder, onChange: function onChange(e) {
              return _this2.handleInputChange(e);
            }, value: optionString })
        ) : _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'label',
            null,
            label
          ),
          fieldType === 'dropdown' ? dropdownNodes : buttonListNodes
        )
      );
    }

    // Instance Method

  }, {
    key: 'focus',
    value: function focus() {
      var _this3 = this;

      // Wait to steal the focus until the next event loop
      setTimeout(function () {
        if (_this3.editor) {
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
      var options = e.currentTarget.value;
      var _props3 = this.props,
          persistedState = _props3.persistedState,
          localState = _props3.localState,
          onChange = _props3.onChange;


      var optionsArray = options.split('\n').map(function (option) {
        return option.trim();
      }).filter(function (option) {
        return option && option.length;
      });

      var newLocalState = localState.set('options', options);
      var newPersistedState = persistedState.set('options', optionsArray);

      onChange({
        persistedState: newPersistedState,
        localState: newLocalState,
        html: this.generateHTML(newPersistedState)
      });
    }
  }, {
    key: 'generateHTML',
    value: function generateHTML(persistedState) {
      var _persistedState$toJS = persistedState.toJS(),
          _persistedState$toJS$ = _persistedState$toJS.label,
          label = _persistedState$toJS$ === undefined ? '' : _persistedState$toJS$,
          _persistedState$toJS$2 = _persistedState$toJS.options,
          options = _persistedState$toJS$2 === undefined ? [] : _persistedState$toJS$2,
          _persistedState$toJS$3 = _persistedState$toJS.isRequired,
          isRequired = _persistedState$toJS$3 === undefined ? false : _persistedState$toJS$3,
          _persistedState$toJS$4 = _persistedState$toJS.fieldType,
          fieldType = _persistedState$toJS$4 === undefined ? 'radio' : _persistedState$toJS$4;

      var requiredAttr = {};
      if (isRequired) {
        requiredAttr.required = '';
      }

      var radioChildren = options.map(function (option) {
        return {
          type: 'tag',
          name: 'div',
          voidElement: false,
          children: [{
            type: 'tag',
            name: 'input',
            voidElement: true,
            attrs: _extends({
              type: fieldType
            }, requiredAttr)
          }, {
            type: 'tag',
            name: 'label',
            voidElement: false,
            children: [{
              type: 'text',
              content: option
            }]
          }]
        };
      });

      var dropdownChildren = [{
        type: 'tag',
        name: 'select',
        voidElement: false,
        attrs: _extends({
          class: 'form-control'
        }, requiredAttr),
        children: options.map(function (option) {
          return {
            type: 'tag',
            name: 'option',
            voidElement: false,
            children: [{
              type: 'text',
              content: option
            }]
          };
        })
      }];

      var optionsChildren = fieldType === 'dropdown' ? dropdownChildren : radioChildren;

      var ast = [];
      ast.push({
        type: 'tag',
        name: 'div',
        voidElement: false,
        children: [{
          type: 'tag',
          name: 'div',
          voidElement: false,
          children: [{
            type: 'tag',
            name: 'label',
            voidElement: false,
            children: [{
              type: 'text',
              content: label
            }]
          }, {
            type: 'tag',
            name: 'div',
            voidElement: false,
            children: optionsChildren
          }]
        }]
      });

      return _htmlParseStringify2.default.stringify(ast);
    }
  }]);

  return SelectionEditor;
}(_react2.default.Component);

exports.default = SelectionEditor;


SelectionEditor.propTypes = {
  isEditing: _propTypes2.default.bool.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired
};