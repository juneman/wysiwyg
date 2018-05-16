import * as editorActions from '../../src/actions/editorActions';
import types from '../../src/helpers/actionConstants';
import { expect } from 'chai';
import { Map } from 'immutable';

describe('Editor Actions', () => {

  it('should create an action to change the screen size', () => {
    const expectedAction = {
      type: types.EDITOR_BROWSER_RESIZE,
      browserWidth: 10,
      browserHeight: 11
    };
    expect(editorActions.screenResize(10, 11)).to.eql(expectedAction);
  });

  it('should create an action to start editing', () => {
    const zone = Map();
    const expectedAction = {
      type: types.EDITOR_EDITING_START,
      zone
    };
    expect(editorActions.startEditing(zone)).to.eql(expectedAction);
  });

  it('should create an action to stop editing', () => {
    const zone = Map();
    const expectedAction = {
      type: types.EDITOR_EDITING_CANCEL,
      zone
    };
    expect(editorActions.cancelEditing(zone)).to.eql(expectedAction);
  });

  it('should create an action to update a zone', () => {
    const zone = Map();
    const row = Map();
    const expectedAction = {
      type: types.EDITOR_UPDATE_ZONE,
      row,
      zone
    };
    expect(editorActions.updateZone(row, zone)).to.eql(expectedAction);
  });

  it('should create an action to setCanvasPosition', () => {
    const canvasPosition = Map();
    const expectedAction = {
      type: types.EDITOR_SET_CANVAS_POSITION,
      canvasPosition
    };
    expect(editorActions.setCanvasPosition(canvasPosition)).to.eql(expectedAction);
  });

  it('should create an action to update a draft', () => {
    const draftPersistedState = Map();
    const expectedAction = {
      type: types.EDITOR_UPDATE_DRAFT,
      draftPersistedState
    };
    expect(editorActions.updateDraft({draftPersistedState})).to.eql(expectedAction);
  });

  it('should create an action to toggle editor action', () => {
    const expectedAction = {
      type: types.EDITOR_ACTIONS_TOGGLE,
      name: 'hyperlink',
      isActive: true
    };
    expect(editorActions.toggleEditorAction('hyperlink', true)).to.eql(expectedAction);
  });

  it('should create an action to start moving', () => {
    const row = Map();
    const expectedAction = {
      type: types.EDITOR_MOVING_ROW_START,
      row
    };
    expect(editorActions.startMoving(row)).to.eql(expectedAction);
  });

  it('should create an action to stop moving', () => {
    const row = Map();
    const expectedAction = {
      type: types.EDITOR_MOVING_ROW_END,
      row
    };
    expect(editorActions.endMoving(row)).to.eql(expectedAction);
  });

  it('should create an action to move rows', () => {
    const expectedAction = {
      type: types.EDITOR_MOVE_ROW,
      sourceIndex: 1,
      targetIndex: 2
    };
    expect(editorActions.moveRows(1, 2)).to.eql(expectedAction);
  });

  it('should create an action to save cloudinary data', () => {
    const cloudinary = Map();
    const expectedAction = {
      type: types.EDITOR_SETTINGS_CLOUDINARY,
      cloudinary
    };
    expect(editorActions.setCloudinarySettings(cloudinary)).to.eql(expectedAction);
  });

  it('should create an action to save userProperties data', () => {
    const userProperties = Map();
    const expectedAction = {
      type: types.EDITOR_SETTINGS_USER_PROPERTIES,
      userProperties
    };
    expect(editorActions.setUserProperties(userProperties)).to.eql(expectedAction);
  });

  it('should create an action to save userProperties data', () => {
    const sanitizeHtmlConfig = Map();
    const expectedAction = {
      type: types.EDITOR_SETTINGS_SANITIZE_HTML,
      sanitizeHtmlConfig
    };
    expect(editorActions.setSanitizeHtmlConfig(sanitizeHtmlConfig)).to.eql(expectedAction);
  });

  it('should create an action to save allowedEditorTypes data', () => {
    const allowedEditorTypes = Map();
    const expectedAction = {
      type: types.EDITOR_SETTINGS_ALLOWED_EDITOR_TYPES,
      allowedEditorTypes
    };
    expect(editorActions.setAllowedEditorTypes(allowedEditorTypes)).to.eql(expectedAction);
  });

  it('should create an action to set disableAddButton', () => {
    const disableAddButton = true;
    const expectedAction = {
      type: types.EDITOR_SETTINGS_DISABLE_ADD_BUTTON,
      disableAddButton
    };
    expect(editorActions.setDisableAddButton(disableAddButton)).to.eql(expectedAction);
  });

  it('should create an action to close all menus', () => {
    const expectedAction = {
      type: types.EDITOR_SETTINGS_SET_CLOSE_ALL
    };
    expect(editorActions.setCloseAll()).to.eql(expectedAction);
  });

});
