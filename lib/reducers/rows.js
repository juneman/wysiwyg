'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rows;

var _actionConstants = require('../helpers/actionConstants');

var _actionConstants2 = _interopRequireDefault(_actionConstants);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function rows() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.List)();
  var action = arguments[1];

  var newState = state;
  var rowIndex = void 0;
  var sourceRow = void 0;

  if (!action) {
    return newState;
  }

  switch (action.type) {
    case _actionConstants2.default.ROWS_ADD_ONE:
      newState = addManyRows(newState, (0, _immutable.List)([action.row]));
      break;
    case _actionConstants2.default.ROWS_ADD_MANY:
      newState = addManyRows(newState, action.rows);
      break;
    case _actionConstants2.default.ROWS_REPLACE_ALL:
      newState = action.rows;
      break;
    case _actionConstants2.default.ROWS_REMOVE_ONE:
      rowIndex = newState.findIndex(function (row) {
        return row.get('id') === action.id;
      });
      if (rowIndex === -1) {
        break;
      }
      newState = newState.splice(rowIndex, 1);
      break;
    case _actionConstants2.default.EDITOR_UPDATE_ZONE:
      newState = newState.map(function (row) {
        if (!row.get('zones') || !row.get('zones').size) {
          return row;
        }
        var zoneIndex = row.get('zones').findIndex(function (zone) {
          return zone.get('id') === action.zone.get('id');
        });
        if (zoneIndex === -1) {
          return row;
        }
        return row.set('zones', row.get('zones').set(zoneIndex, action.zone));
      });
      break;
    case _actionConstants2.default.EDITOR_MOVE_ROW:
      sourceRow = newState.get(action.sourceIndex);
      newState = newState.delete(action.sourceIndex).insert(action.targetIndex, sourceRow);
      break;
  }

  return newState;
}

function addManyRows(state, rows) {
  var newState = state;

  // Find the index of any rows with no zones, which we'll replace
  var blankRowIndex = newState.findIndex(function (row) {
    return !row.get('zones') || row.get('zones').size === 0;
  });

  rows.forEach(function (row) {
    if (blankRowIndex !== -1) {
      newState = newState.set(blankRowIndex, row);
      blankRowIndex = -1;
    } else {
      newState = newState.push(row);
    }
  });
  return newState;
}