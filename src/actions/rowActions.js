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

export function addZone(rowId, zone) {
  return {
    type: Actions.ROWS_ADD_ONE_ZONE,
    rowId,
    zone
  };
}

export function removeZone(row, zone) {
  return {
    type: Actions.ROWS_REMOVE_ONE_ZONE,
    row,
    zone
  };
}