import * as editorSelectorActions from '../../src/actions/editorSelectorActions';
import types from '../../src/helpers/actionConstants';
import { expect } from 'chai';
import { Map } from 'immutable';

describe('Editor Selector Actions', () => {

  it('should create an action to show the selector', () => {
    const addButtonPosition = Map();
    const expectedAction = {
      type: types.EDITOR_SELECTOR_SHOW,
      addButtonPosition
    };
    expect(editorSelectorActions.show(addButtonPosition)).to.eql(expectedAction);
  });

  it('should create an action to show the selector', () => {
    const expectedAction = {
      type: types.EDITOR_SELECTOR_HIDE
    };
    expect(editorSelectorActions.hide()).to.eql(expectedAction);
  });

});