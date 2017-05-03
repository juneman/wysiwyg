'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = RichTextToolbar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _Menu = require('../../components/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Toolbar = require('../../components/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _AlignmentInline = require('../../editor-actions/AlignmentInline');

var _AlignmentInline2 = _interopRequireDefault(_AlignmentInline);

var _Bold = require('../../editor-actions/Bold');

var _Bold2 = _interopRequireDefault(_Bold);

var _Italic = require('../../editor-actions/Italic');

var _Italic2 = _interopRequireDefault(_Italic);

var _FontColor = require('../../editor-actions/FontColor');

var _FontColor2 = _interopRequireDefault(_FontColor);

var _TextStyle = require('../../editor-actions/TextStyle');

var _TextStyle2 = _interopRequireDefault(_TextStyle);

var _HyperlinkInline = require('../../editor-actions/HyperlinkInline');

var _HyperlinkInline2 = _interopRequireDefault(_HyperlinkInline);

var _List = require('../../editor-actions/List');

var _List2 = _interopRequireDefault(_List);

var _UserProperty = require('../../editor-actions/UserProperty');

var _UserProperty2 = _interopRequireDefault(_UserProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actions = [{
  Component: _Bold2.default,
  name: 'bold'
}, {
  Component: _Italic2.default,
  name: 'italic'
}, {
  Component: _TextStyle2.default,
  name: 'text-style'
}, {
  Component: _FontColor2.default,
  name: 'font-color'
}, {
  separator: true
}, {
  Component: _List2.default,
  name: 'list'
}, {
  Component: _AlignmentInline2.default,
  name: 'alignment-inline'
}, {
  separator: true
}, {
  Component: _HyperlinkInline2.default,
  name: 'hyperlink-inline'
}, {
  Component: _UserProperty2.default,
  name: 'user-property'
}];

function RichTextToolbar(props) {
  return _react2.default.createElement(
    _Menu2.default,
    null,
    _react2.default.createElement(_Toolbar2.default, _extends({
      actions: actions
    }, props))
  );
}

RichTextToolbar.propTypes = {
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  onChange: _propTypes2.default.func.isRequired
};