import editorReducer from '../../src/reducers/editor';
import types from '../../src/helpers/actionConstants';
import { expect } from 'chai';
import { Map } from 'immutable';

describe('Editor Reducer', () => {

  it('return the initial state', () => {
    editorReducer();
  });

  it('should set the screenSize', () => {
    const state = editorReducer(undefined, {
      type: types.EDITOR_BROWSER_RESIZE,
      browserWidth: 100,
      browserHeight: 200
    });
    expect(state.get('screenSize').toJS()).to.eql({width: 100, height: 200});
  });

  it('should put the canvas into edit mode', () => {
    const persistedState = Map();
    const zone = Map({ id: '1' }, persistedState);

    const state = editorReducer(undefined, {
      type: types.EDITOR_EDITING_START,
      zone
    });

    expect(state.get('isCanvasInEditMode')).to.equal(true);
    expect(state.get('activeZoneId')).to.equal('1');
    expect(state.get('draftPersistedState')).to.equal(persistedState);
  });

  it('should get the canvas out of edit mode', () => {
    const state = editorReducer(undefined, {
      type: types.EDITOR_EDITING_CANCEL
    });

    expect(state.get('isCanvasInEditMode')).to.equal(false);
    expect(state.get('activeZoneId')).to.equal(null);
  });

  it('should set the canvas position', () => {
    const canvasPosition = Map();

    const state = editorReducer(undefined, {
      type: types.EDITOR_SET_CANVAS_POSITION,
      canvasPosition
    });

    expect(state.get('canvasPosition')).to.equal(canvasPosition);
  });

  it('should update a draft', () => {
    const localState = Map();
    const draftPersistedState = Map();
    const html = '<p>Test</p>';

    const state = editorReducer(undefined, {
      type: types.EDITOR_UPDATE_DRAFT,
      localState,
      draftPersistedState,
      html
    });

    expect(state.get('localState')).to.equal(localState);
    expect(state.get('draftPersistedState')).to.equal(draftPersistedState);
    expect(state.get('draftHtml')).to.equal(html);
  });

  it('should toggle hover on for a zone', () => {
    const zone = Map({ id: '1' });
    const state = editorReducer(undefined, {
      type: types.EDITOR_ZONE_HOVER_TOGGLE,
      zone,
      isOver: true
    });
    expect(state.get('hoverZoneId')).to.equal('1');
  });

  it('should toggle hover off for a zone', () => {
    const zone = Map({ id: '1' });
    const state = editorReducer(undefined, {
      type: types.EDITOR_ZONE_HOVER_TOGGLE,
      zone,
      isOver: false
    });
    expect(state.get('hoverZoneId')).to.equal(null);
  });

  it('should toggle hover on for a row', () => {
    const row = Map({ id: '1' });
    const state = editorReducer(undefined, {
      type: types.EDITOR_ROW_HOVER_TOGGLE,
      row,
      isOver: true
    });
    expect(state.get('hoverRowId')).to.equal('1');
  });

  it('should toggle hover off for a row', () => {
    const row = Map({ id: '1' });
    const state = editorReducer(undefined, {
      type: types.EDITOR_ROW_HOVER_TOGGLE,
      row,
      isOver: false
    });
    expect(state.get('hoverRowId')).to.equal(null);
  });

  it('should set the active editor on', () => {
    const state = editorReducer(undefined, {
      type: types.EDITOR_ACTIONS_TOGGLE,
      name: 'hyperlink',
      isActive: true
    });
    expect(state.get('activeEditorAction')).to.equal('hyperlink');
  });

  it('should set the active editor off', () => {
    const state = editorReducer(undefined, {
      type: types.EDITOR_ACTIONS_TOGGLE,
      name: 'hyperlink',
      isActive: false
    });
    expect(state.get('activeEditorAction')).to.equal(null);
  });

  it('should start a row moving', () => {
    const row = Map({ id: '1' });
    const state = editorReducer(undefined, {
      type: types.EDITOR_MOVING_ROW_START,
      row
    });
    expect(state.get('movableRowId')).to.equal('1');
  });

  it('should stop a row moving', () => {
    const state = editorReducer(undefined, {
      type: types.EDITOR_MOVING_ROW_END
    });
    expect(state.get('movableRowId')).to.equal(null);
  });

  it('should set the Cloudinary data', () => {
    const cloudinary = Map();
    const state = editorReducer(undefined, {
      type: types.EDITOR_SETTINGS_CLOUDINARY,
      cloudinary
    });
    expect(state.get('cloudinary')).to.equal(cloudinary);
  });

  it('should set the UserProperties data', () => {
    const userProperties = Map();
    const state = editorReducer(undefined, {
      type: types.EDITOR_SETTINGS_USER_PROPERTIES,
      userProperties
    });
    expect(state.get('userProperties')).to.equal(userProperties);
  });

  it('should set the sanitizeHtmlConfig data', () => {
    const sanitizeHtmlConfig = Map();
    const state = editorReducer(undefined, {
      type: types.EDITOR_SETTINGS_SANITIZE_HTML,
      sanitizeHtmlConfig
    });
    expect(state.get('sanitizeHtmlConfig')).to.equal(sanitizeHtmlConfig);
  });

  it('should set the allowedEditorTypes data', () => {
    const allowedEditorTypes = Map();
    const state = editorReducer(undefined, {
      type: types.EDITOR_SETTINGS_ALLOWED_EDITOR_TYPES,
      allowedEditorTypes
    });
    expect(state.get('allowedEditorTypes')).to.equal(allowedEditorTypes);
  });

  it('should set the disableAddButton', () => {
    const state = editorReducer(undefined, {
      type: types.EDITOR_SETTINGS_DISABLE_ADD_BUTTON,
      disableAddButton: true
    });
    expect(state.get('disableAddButton')).to.equal(true);
  });

  it('should put the canvas into edit mode if we replace all rows and there is an active zone', () => {
    const persistedState = Map();
    const zone = Map({ id: '1' }, persistedState);

    const state = editorReducer(undefined, {
      type: types.ROWS_REPLACE_ALL,
      activeZoneId: zone
    });

    expect(state.get('isCanvasInEditMode')).to.equal(true);
    expect(state.get('activeZoneId')).to.equal('1');
    expect(state.get('draftPersistedState')).to.equal(persistedState);
  });

});