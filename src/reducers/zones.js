import Actions from '../helpers/actionConstants';
import { Map } from 'immutable';

export default function zones(state = Map(), action) {
  let newState = state;

  if (!action) {
    return newState;
  }

  switch (action.type) {
    case Actions.ZONES_UPDATE_HTML:
      newState = newState.merge(Map({ [action.id]: Map({ html: action.html }) }));
      break;
    case Actions.ZONES_REMOVE_ONE:
      newState = newState.delete(action.id);
      break;
  }

  return newState;
}
