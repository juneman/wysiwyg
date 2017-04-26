import Actions from '../helpers/actionConstants';

export function show(addButtonPosition) {
  return {
    type: Actions.EDITOR_SELECTOR_SHOW,
    addButtonPosition
  };
}

export function hide() {
  return {
    type: Actions.EDITOR_SELECTOR_HIDE
  };
}
