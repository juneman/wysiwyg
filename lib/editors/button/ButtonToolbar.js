'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = ButtonToolbar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _Menu = require('../../components/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Toolbar = require('../../components/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _AlignmentBlock = require('../../editor-actions/AlignmentBlock');

var _AlignmentBlock2 = _interopRequireDefault(_AlignmentBlock);

var _Bold = require('../../editor-actions/Bold');

var _Bold2 = _interopRequireDefault(_Bold);

var _Italic = require('../../editor-actions/Italic');

var _Italic2 = _interopRequireDefault(_Italic);

var _FontColor = require('../../editor-actions/FontColor');

var _FontColor2 = _interopRequireDefault(_FontColor);

var _BackgroundColor = require('../../editor-actions/BackgroundColor');

var _BackgroundColor2 = _interopRequireDefault(_BackgroundColor);

var _ButtonAction = require('../../editor-actions/ButtonAction');

var _ButtonAction2 = _interopRequireDefault(_ButtonAction);

var _HyperlinkBlock = require('../../editor-actions/HyperlinkBlock');

var _HyperlinkBlock2 = _interopRequireDefault(_HyperlinkBlock);

var _ButtonStyles = require('../../editor-actions/ButtonStyles');

var _ButtonStyles2 = _interopRequireDefault(_ButtonStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actions = [{
  Component: _Bold2.default,
  name: 'bold'
}, {
  Component: _Italic2.default,
  name: 'italic'
}, {
  Component: _AlignmentBlock2.default,
  name: 'alignment-block'
}, {
  separator: true
}, {
  Component: _FontColor2.default,
  name: 'font-color'
}, {
  Component: _BackgroundColor2.default,
  name: 'background-color'
}, {
  Component: _ButtonStyles2.default,
  name: 'button-styles'
}, {
  separator: true
}, {
  Component: _ButtonAction2.default,
  name: 'button-action'
}, {
  Component: _HyperlinkBlock2.default,
  name: 'hyperlink-block'
}];

function ButtonToolbar(props) {
  return _react2.default.createElement(
    _Menu2.default,
    null,
    _react2.default.createElement(_Toolbar2.default, _extends({
      actions: actions
    }, props))
  );
}

ButtonToolbar.propTypes = {
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  onChange: _propTypes2.default.func.isRequired
};