'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = editorSelector;

var _actionConstants = require('../helpers/actionConstants');

var _actionConstants2 = _interopRequireDefault(_actionConstants);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = (0, _immutable.fromJS)({
  isOpen: false,
  menuPosition: {},
  addButtonPosition: {}
});

function editorSelector() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var newState = state;

  switch (action.type) {
    case _actionConstants2.default.ROWS_ADD_ONE:
    case _actionConstants2.default.ROWS_ADD_MANY:
      newState = newState.set('isOpen', false);
      break;
    case _actionConstants2.default.EDITOR_SELECTOR_SHOW:
      newState = newState.set('isOpen', true).set('addButtonPosition', action.addButtonPosition);
      break;
    case _actionConstants2.default.EDITOR_SELECTOR_HIDE:
      newState = newState.set('isOpen', false);
      break;
  }

  return newState;
}