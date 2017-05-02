'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addRow = addRow;
exports.addRows = addRows;
exports.replaceRows = replaceRows;
exports.removeRow = removeRow;

var _actionConstants = require('../helpers/actionConstants');

var _actionConstants2 = _interopRequireDefault(_actionConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addRow(row) {
  return {
    type: _actionConstants2.default.ROWS_ADD_ONE,
    row: row
  };
}

function addRows(rows) {
  return {
    type: _actionConstants2.default.ROWS_ADD_MANY,
    rows: rows
  };
}

function replaceRows(rows, activeZoneId) {
  return {
    type: _actionConstants2.default.ROWS_REPLACE_ALL,
    rows: rows,
    activeZoneId: activeZoneId
  };
}

function removeRow(id) {
  return {
    type: _actionConstants2.default.ROWS_REMOVE_ONE,
    id: id
  };
}