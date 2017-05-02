'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = editorSelector;

var _actionConstants = require('../helpers/actionConstants');

var _actionConstants2 = _interopRequireDefault(_actionConstants);

var _immutable = require('immutable');

var _sanitizeHtml = require('sanitize-html');

var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = (0, _immutable.fromJS)({
  screenSize: {},
  canvasPosition: {},
  activeZoneId: null,
  hoverZoneId: null,
  movableRowId: null,
  hoverRowId: null,
  activeEditorAction: null,
  isCanvasInEditMode: false,
  disableAddButton: false,
  draftHtml: '',
  draftPersistedState: {},
  localState: {},
  cloudinary: {},
  userProperties: [],
  allowedEditorTypes: [],
  aceEditorConfig: {},
  sanitizeHtmlConfig: {
    allowedTags: _sanitizeHtml2.default.defaults.allowedTags.concat(['img', 'h1', 'h2']),
    allowedAttributes: false
  }
});

function editorSelector() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var newState = state;

  if (!action || !action.type) {
    return newState;
  }

  switch (action.type) {
    case _actionConstants2.default.EDITOR_BROWSER_RESIZE:
      newState = newState.set('screenSize', (0, _immutable.Map)({
        width: action.browserWidth,
        height: action.browserHeight
      }));
      break;
    case _actionConstants2.default.EDITOR_EDITING_START:
      newState = newState.set('isCanvasInEditMode', true).set('activeZoneId', action.zone.get('id')).set('draftPersistedState', action.zone.get('persistedState') || (0, _immutable.Map)()).set('draftHtml', '').set('localState', (0, _immutable.Map)());
      break;
    case _actionConstants2.default.EDITOR_SETTINGS_SET_CLOSE_ALL:
    case _actionConstants2.default.EDITOR_EDITING_CANCEL:
    case _actionConstants2.default.ROWS_REMOVE_ONE:
      newState = newState.set('isCanvasInEditMode', false).set('activeZoneId', null).set('hoverZoneId', null).set('hoverRowId', null).set('movableRowId', null).set('activeEditorAction', null).set('draftPersistedState', (0, _immutable.Map)()).set('draftHtml', '').set('localState', (0, _immutable.Map)());
      break;
    case _actionConstants2.default.EDITOR_SET_CANVAS_POSITION:
      newState = newState.set('canvasPosition', action.canvasPosition);
      break;
    case _actionConstants2.default.EDITOR_UPDATE_DRAFT:
      newState = newState.set('localState', action.localState).set('draftHtml', action.html).set('draftPersistedState', action.draftPersistedState);
      break;
    case _actionConstants2.default.EDITOR_ZONE_HOVER_TOGGLE:
      newState = newState.set('hoverZoneId', action.isOver ? action.zone.get('id') : null);
      break;
    case _actionConstants2.default.EDITOR_ROW_HOVER_TOGGLE:
      newState = newState.set('hoverRowId', action.isOver ? action.row.get('id') : null);
      break;
    case _actionConstants2.default.EDITOR_ACTIONS_TOGGLE:
      newState = newState.set('activeEditorAction', action.isActive ? action.name : null);
      break;
    case _actionConstants2.default.EDITOR_MOVING_ROW_START:
      newState = newState.set('movableRowId', action.row.get('id'));
      break;
    case _actionConstants2.default.EDITOR_MOVING_ROW_END:
      newState = newState.set('movableRowId', null);
      break;
    case _actionConstants2.default.EDITOR_SETTINGS_CLOUDINARY:
      newState = newState.set('cloudinary', action.cloudinary);
      break;
    case _actionConstants2.default.EDITOR_SETTINGS_USER_PROPERTIES:
      newState = newState.set('userProperties', action.userProperties);
      break;
    case _actionConstants2.default.EDITOR_SETTINGS_SANITIZE_HTML:
      newState = newState.set('sanitizeHtmlConfig', action.sanitizeHtmlConfig);
      break;
    case _actionConstants2.default.EDITOR_SETTINGS_ACE_EDITOR:
      newState = newState.set('aceEditorConfig', action.aceEditorConfig);
      break;
    case _actionConstants2.default.EDITOR_SETTINGS_ALLOWED_EDITOR_TYPES:
      newState = newState.set('allowedEditorTypes', action.allowedEditorTypes);
      break;
    case _actionConstants2.default.EDITOR_SETTINGS_DISABLE_ADD_BUTTON:
      newState = newState.set('disableAddButton', action.disableAddButton);
      break;
    case _actionConstants2.default.ROWS_REPLACE_ALL:
      if (action.activeZoneId) {
        newState = newState.set('isCanvasInEditMode', true).set('activeZoneId', action.activeZoneId.get('id')).set('draftPersistedState', action.activeZoneId.get('persistedState') || (0, _immutable.Map)()).set('draftHtml', '').set('localState', (0, _immutable.Map)());
      }
      break;
  }

  return newState;
}