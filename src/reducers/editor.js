import Actions from '../helpers/actionConstants';
import { fromJS, Map } from 'immutable';

const initialState = fromJS({
  canvasPosition: {},
  activeZoneId: null,
  hoverZoneId: null,
  movableRowId: null,
  hoverRowId: null,
  activeEditorAction: null,
  isCanvasInEditMode: false,
  draftHtml: '',
  draftPersistedState: {},
  localState: {},
  cloudinary: {},
  userProperties: []
});

export default function editorSelector(state = initialState, action) {
  let newState = state;

  switch(action.type) {
    case Actions.EDITOR_EDITING_START:
      newState = newState
        .set('isCanvasInEditMode', true)
        .set('activeZoneId', action.zone.get('id'))
        .set('draftPersistedState', action.zone.get('persistedState') || Map())
        .set('draftHtml', '')
        .set('localState', Map());
      break;
    case Actions.EDITOR_EDITING_CANCEL:
    case Actions.ROWS_REMOVE_ONE:
      newState = newState
        .set('isCanvasInEditMode', false)
        .set('activeZoneId', null)
        .set('hoverZoneId', null)
        .set('hoverRowId', null)
        .set('movableRowId', null)
        .set('activeEditorAction', null)
        .set('draftPersistedState', Map())
        .set('draftHtml', '')
        .set('localState', Map());
      break;
    case Actions.EDITOR_SET_CANVAS_POSITION:
      newState = newState.set('canvasPosition', action.canvasPosition);
      break;
    case Actions.EDITOR_UPDATE_DRAFT:
      newState = newState
        .set('localState', action.localState)
        .set('draftHtml', action.html)
        .set('draftPersistedState', action.draftPersistedState);
      break;
    case Actions.EDITOR_ZONE_HOVER_TOGGLE:
      newState = newState.set('hoverZoneId', (action.isOver) ? action.zone.get('id') : null);
      break;
    case Actions.EDITOR_ROW_HOVER_TOGGLE:
      newState = newState.set('hoverRowId', (action.isOver) ? action.row.get('id') : null);
      break;
    case Actions.EDITOR_ACTIONS_TOGGLE:
      newState = newState.set('activeEditorAction', (action.isActive) ? action.name : null);
      break;
    case Actions.EDITOR_MOVING_ROW_START:
      newState = newState.set('movableRowId', action.row.get('id'));
      break;
    case Actions.EDITOR_MOVING_ROW_END:
      newState = newState.set('movableRowId', null);
      break;
    case Actions.EDITOR_SETTINGS_CLOUDINARY:
      newState = newState.set('cloudinary', action.cloudinary);
      break;
    case Actions.EDITOR_SETTINGS_USER_PROPERTIES:
      newState = newState.set('userProperties', action.userProperties);
      break;
  }

  return newState;
}
