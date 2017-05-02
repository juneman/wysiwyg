import editorSelectorReducer from '../../src/reducers/editorSelector';
import types from '../../src/helpers/actionConstants';
import { expect } from 'chai';
import { Map, is, fromJS } from 'immutable';

describe('Rows Reducer', () => {

  it('return the initial state', () => {
    const state = editorSelectorReducer();
    expect(is(state, fromJS({
      isOpen: false,
      menuPosition: {},
      addButtonPosition: {}
    })));
  });

  it('should set isOpen=false if rows are added with ROWS_ADD_ONE', () => {
    const state = editorSelectorReducer(undefined, {
      type: types.ROWS_ADD_ONE
    });
    expect(state.get('isOpen')).to.equal(false);
  });

  it('should set isOpen=false if rows are added with ROWS_ADD_MANY', () => {
    const state = editorSelectorReducer(undefined, {
      type: types.ROWS_ADD_MANY
    });
    expect(state.get('isOpen')).to.equal(false);
  });

  it('should show the editor and set the addButtonPosition', () => {
    const addButtonPosition = Map();
    const state = editorSelectorReducer(undefined, {
      type: types.EDITOR_SELECTOR_SHOW,
      addButtonPosition
    });
    expect(state.get('isOpen')).to.equal(true);
    expect(state.get('addButtonPosition')).to.equal(addButtonPosition);
  });

  it('should hide the editor', () => {
    const addButtonPosition = Map();
    const state = editorSelectorReducer(undefined, {
      type: types.EDITOR_SELECTOR_HIDE,
      addButtonPosition
    });
    expect(state.get('isOpen')).to.equal(false);
  });

});