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

var _Hyperlink = require('./Hyperlink');

var _Hyperlink2 = _interopRequireDefault(_Hyperlink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HyperlinkInline = function (_React$Component) {
  _inherits(HyperlinkInline, _React$Component);

  function HyperlinkInline() {
    _classCallCheck(this, HyperlinkInline);

    return _possibleConstructorReturn(this, (HyperlinkInline.__proto__ || Object.getPrototypeOf(HyperlinkInline)).apply(this, arguments));
  }

  _createClass(HyperlinkInline, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          localState = _props.localState,
          isActive = _props.isActive,
          onToggleActive = _props.onToggleActive;


      var href = '';
      var isNewWindow = false;

      var editorState = localState.get('editorState');

      if (editorState) {
        var selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
          var contentState = editorState.getCurrentContent();
          var startKey = editorState.getSelection().getStartKey();
          var startOffset = editorState.getSelection().getStartOffset();
          var blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
          var linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

          if (linkKey) {
            var linkInstance = contentState.getEntity(linkKey);
            var linkData = linkInstance.getData();
            isNewWindow = linkData.isNewWindow;
            href = linkData.href;
          }
        }
      }

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


      var editorState = localState.get('editorState');
      var contentState = editorState.getCurrentContent();
      var contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
        href: href,
        isNewWindow: isNewWindow
      });
      var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      var newEditorState = _draftJs.EditorState.set(editorState, { currentContent: contentStateWithEntity });
      var newLocalState = localState.set('editorState', _draftJs.RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));

      onChange({
        localState: newLocalState,
        persistedState: persistedState
      });
    }
  }]);

  return HyperlinkInline;
}(_react2.default.Component);

exports.default = HyperlinkInline;


HyperlinkInline.propTypes = {
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onToggleActive: _propTypes2.default.func.isRequired,
  isActive: _propTypes2.default.bool.isRequired
};