import rowsReducer from '../../src/reducers/rows';
import types from '../../src/helpers/actionConstants';
import { expect } from 'chai';
import { Map, List, is, fromJS } from 'immutable';

describe('Rows Reducer', () => {

  it('return the initial state', () => {
    const state = rowsReducer();
    expect(is(state, List()));
  });

  it('should add a single row', () => {
    const row = Map();
    const state = rowsReducer(undefined, {
      type: types.ROWS_ADD_ONE,
      row
    });
    expect(state.size).to.equal(1);
    expect(state.get(0)).to.equal(row);
  });

  it('should attempt to replace an empty row first', () => {
    const existingRows = fromJS([{id: '1'}]);
    const row = Map({id: '2'});
    const state = rowsReducer(existingRows, {
      type: types.ROWS_ADD_ONE,
      row
    });
    expect(state.size).to.equal(1);
    expect(state.get(0)).to.equal(row);
  });

  it('should add multiple rows', () => {
    const rows = fromJS([{}, {}]);
    const state = rowsReducer(undefined, {
      type: types.ROWS_ADD_MANY,
      rows
    });
    expect(state.size).to.equal(2);
    expect(state).to.equal(rows);
  });

  it('should replace all existing rows with a new set', () => {
    const rows = fromJS([{}, {}, {}]);
    const newRows = fromJS([{}, {}]);
    expect(rows === newRows).to.not.be.ok;
    const state = rowsReducer(rows, {
      type: types.ROWS_REPLACE_ALL,
      rows: newRows
    });
    expect(state.size).to.equal(2);
    expect(state).to.equal(newRows);
  });

  it('should remove a single row', () => {
    const rows = fromJS([{id: '1'}, {id: '2'}, {id: '3'}]);
    const state = rowsReducer(rows, {
      type: types.ROWS_REMOVE_ONE,
      id: '2'
    });
    expect(state.size).to.equal(2);
    expect(state.get(0).get('id')).to.equal('1');
    expect(state.get(1).get('id')).to.equal('3');
  });

  it('should update just a single zone', () => {
    const rows = fromJS([{id: '1'}, {id: '2', zones: [{id: '4', data: 1}]}, {id: '3'}]);
    const state = rowsReducer(rows, {
      type: types.EDITOR_UPDATE_ZONE,
      zone: fromJS({id: '4', data: 2})
    });
    expect(state.size).to.equal(3);
    expect(state.get(0).get('id')).to.equal('1');
    expect(state.get(1).get('id')).to.equal('2');
    expect(state.get(2).get('id')).to.equal('3');
    expect(state.get(1).get('zones').get(0).get('data')).to.equal(2);
  });

  it('should move a row to a new spot', () => {
    const rows = fromJS([{id: '1'}, {id: '2'}, {id: '3'}]);
    const state = rowsReducer(rows, {
      type: types.EDITOR_MOVE_ROW,
      sourceIndex: 1,
      targetIndex: 0
    });
    expect(state.size).to.equal(3);
    expect(state.get(0).get('id')).to.equal('2');
    expect(state.get(1).get('id')).to.equal('1');
    expect(state.get(2).get('id')).to.equal('3');
  });

});