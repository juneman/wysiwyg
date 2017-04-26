import Actions from '../helpers/actionConstants';

export function addRow(row) {
  return {
    type: Actions.ROWS_ADD_ONE,
    row
  };
}

export function addRows(rows) {
  return {
    type: Actions.ROWS_ADD_MANY,
    rows
  };
}

export function updateRow(row) {
  return {
    type: Actions.ROWS_UPDATE_ONE,
    row
  };
}

export function replaceRows(rows) {
  return {
    type: Actions.ROWS_REPLACE_ALL,
    rows
  };
}

export function removeRow(id) {
  return {
    type: Actions.ROWS_REMOVE_ONE,
    id
  };
}