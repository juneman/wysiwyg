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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HtmlEditor = function (_React$Component) {
  _inherits(HtmlEditor, _React$Component);

  function HtmlEditor() {
    _classCallCheck(this, HtmlEditor);

    return _possibleConstructorReturn(this, (HtmlEditor.__proto__ || Object.getPrototypeOf(HtmlEditor)).apply(this, arguments));
  }

  _createClass(HtmlEditor, [{
    key: 'render',
    value: function render() {
      var persistedState = this.props.persistedState;


      var content = persistedState.get('content');

      var wrapperStyle = {
        minHeight: 50
      };

      return content ? _react2.default.createElement('div', {
        className: 'video-html',
        style: wrapperStyle,
        dangerouslySetInnerHTML: { __html: content }
      }) : _react2.default.createElement(
        'div',
        { className: 'placeholder' },
        'Add your Video Script'
      );
    }
  }, {
    key: 'handleEditorStateChange',
    value: function handleEditorStateChange(editorState) {
      var _props = this.props,
          persistedState = _props.persistedState,
          localState = _props.localState,
          onChange = _props.onChange;

      var content = editorState.getCurrentContent().getPlainText();

      var newPersistedState = persistedState.set('content', content);
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
      var content = persistedState.get('content') || '';

      return '<div class="video-html">' + content + '</div>';
    }
  }]);

  return HtmlEditor;
}(_react2.default.Component);

exports.default = HtmlEditor;


HtmlEditor.propTypes = {
  isEditing: _propTypes2.default.bool.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired
};