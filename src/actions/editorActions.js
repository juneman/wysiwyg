import Actions from '../helpers/actionConstants';

export function startEditing(zone) {
  return {
    type: Actions.EDITOR_EDITING_START,
    zone
  };
}

export function cancelEditing(zone) {
  return {
    type: Actions.EDITOR_EDITING_CANCEL,
    zone
  };
}

export function updateZone(row, zone) {
  return {
    type: Actions.EDITOR_UPDATE_ZONE,
    row,
    zone
  };
}

export function setCanvasPosition(canvasPosition) {
  return {
    type: Actions.EDITOR_SET_CANVAS_POSITION,
    canvasPosition
  };
}

export function updateDraft(update) {
  return {
    type: Actions.EDITOR_UPDATE_DRAFT,
    ...update
  };
}

export function toggleZoneHover(zone, isOver) {
  return {
    type: Actions.EDITOR_ZONE_HOVER_TOGGLE,
    zone,
    isOver
  };
}

export function toggleRowHover(row, isOver) {
  return {
    type: Actions.EDITOR_ROW_HOVER_TOGGLE,
    row,
    isOver
  };
}

export function toggleEditorAction(name, isActive) {
  return {
    type: Actions.EDITOR_ACTIONS_TOGGLE,
    name,
    isActive
  };
}

export function startMoving(row) {
  return {
    type: Actions.EDITOR_MOVING_ROW_START,
    row
  };
}

export function endMoving(row) {
  return {
    type: Actions.EDITOR_MOVING_ROW_END,
    row
  };
}

export function moveRows(sourceIndex, targetIndex) {
  return {
    type: Actions.EDITOR_MOVE_ROW,
    sourceIndex,
    targetIndex
  };
}

export function setCloudinarySettings(cloudinary) {
  return {
    type: Actions.EDITOR_SETTINGS_CLOUDINARY,
    cloudinary
  };
}

export function setBasePadding(basePadding) {
  return {
    type: Actions.EDITOR_SET_BASE_PADDING,
    basePadding
  };
}

export function setUserProperties(userProperties) {
  return {
    type: Actions.EDITOR_SETTINGS_USER_PROPERTIES,
    userProperties
  };
}

export function setSanitizeHtmlConfig(sanitizeHtmlConfig) {
  return {
    type: Actions.EDITOR_SETTINGS_SANITIZE_HTML,
    sanitizeHtmlConfig
  };
}

export function setAllowedEditorTypes(allowedEditorTypes) {
  return {
    type: Actions.EDITOR_SETTINGS_ALLOWED_EDITOR_TYPES,
    allowedEditorTypes
  };
}

export function setDisableAddButton(disableAddButton) {
  return {
    type: Actions.EDITOR_SETTINGS_DISABLE_ADD_BUTTON,
    disableAddButton
  };
}

export function setCloseAll() {
  return {
    type: Actions.EDITOR_SETTINGS_SET_CLOSE_ALL
  };
}

export function setAceEditorConfig(aceEditorConfig) {
  return {
    type: Actions.EDITOR_SETTINGS_ACE_EDITOR,
    aceEditorConfig
  };
}

export function setShouldDisableXSS(shouldDisableXSS) {
  return {
    type: Actions.EDITOR_SHOULD_DISABLE_XSS,
    shouldDisableXSS
  };
}
