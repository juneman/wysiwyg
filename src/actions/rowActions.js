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

export function replaceRows(rows, activeZoneId) {
  return {
    type: Actions.ROWS_REPLACE_ALL,
    rows,
    activeZoneId
  };
}

export function removeRow(id) {
  return {
    type: Actions.ROWS_REMOVE_ONE,
    id
  };
}

export function insertZone(
  row,
  zone,
  columnIndex
) {
  return {
    type: Actions.ROWS_INSERT_ZONE,
    row,
    zone,
    columnIndex
  };
}

export function removeZone(row, zone) {
  return {
    type: Actions.ROWS_REMOVE_ONE_ZONE,
    row,
    zone
  };
}