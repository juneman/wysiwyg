import * as rowActions from '../../src/actions/rowActions';
import types from '../../src/helpers/actionConstants';
import { expect } from 'chai';
import { Map, List } from 'immutable';

describe('Row Actions', () => {

  it('should create an action to add a row', () => {
    const row = Map();
    const expectedAction = {
      type: types.ROWS_ADD_ONE,
      row
    };
    expect(rowActions.addRow(row)).to.eql(expectedAction);
  });

  it('should create an action to add many rows', () => {
    const rows = List();
    const expectedAction = {
      type: types.ROWS_ADD_MANY,
      rows
    };
    expect(rowActions.addRows(rows)).to.eql(expectedAction);
  });

  it('should create an action to replace all rows', () => {
    const rows = List();
    const expectedAction = {
      type: types.ROWS_REPLACE_ALL,
      rows,
      activeZoneId: '1'
    };
    expect(rowActions.replaceRows(rows, '1')).to.eql(expectedAction);
  });

  it('should create an action to remove a row', () => {
    const expectedAction = {
      type: types.ROWS_REMOVE_ONE,
      id: '1'
    };
    expect(rowActions.removeRow('1')).to.eql(expectedAction);
  });

});