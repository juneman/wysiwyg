import Actions from '../helpers/actionConstants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  isOpen: false,
  menuPosition: {},
  addButtonPosition: {}
});

export default function editorSelector(state = initialState, action) {
  let newState = state;

  if (!action || !action.type) {
    return newState;
  }

  switch (action.type) {
    case Actions.ROWS_ADD_ONE:
    case Actions.ROWS_ADD_MANY:
      newState = newState.set('isOpen', false);
      break;
    case Actions.EDITOR_SELECTOR_SHOW:
      newState = newState
        .set('isOpen', true)
        .set('addButtonPosition', action.addButtonPosition);
      break;
    case Actions.EDITOR_SETTINGS_SET_CLOSE_ALL:
    case Actions.EDITOR_SELECTOR_HIDE:
      newState = newState.set('isOpen', false);
      break;
  }

  return newState;
}