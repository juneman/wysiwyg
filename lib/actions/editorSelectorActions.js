'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.show = show;
exports.hide = hide;

var _actionConstants = require('../helpers/actionConstants');

var _actionConstants2 = _interopRequireDefault(_actionConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function show(addButtonPosition) {
  return {
    type: _actionConstants2.default.EDITOR_SELECTOR_SHOW,
    addButtonPosition: addButtonPosition
  };
}

function hide() {
  return {
    type: _actionConstants2.default.EDITOR_SELECTOR_HIDE
  };
}