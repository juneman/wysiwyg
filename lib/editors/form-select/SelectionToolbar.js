'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = SelectionToolbar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _Menu = require('../../components/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Toolbar = require('../../components/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _SelectionFieldOptions = require('../../editor-actions/SelectionFieldOptions');

var _SelectionFieldOptions2 = _interopRequireDefault(_SelectionFieldOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actions = [{
  Component: _SelectionFieldOptions2.default,
  name: 'selectionfield-options'
}];

function SelectionToolbar(props) {
  return _react2.default.createElement(
    _Menu2.default,
    null,
    _react2.default.createElement(_Toolbar2.default, _extends({
      actions: actions
    }, props))
  );
}

SelectionToolbar.propTypes = {
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  onChange: _propTypes2.default.func.isRequired
};