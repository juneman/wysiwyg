'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.screenResize = screenResize;
exports.startEditing = startEditing;
exports.cancelEditing = cancelEditing;
exports.updateZone = updateZone;
exports.setCanvasPosition = setCanvasPosition;
exports.updateDraft = updateDraft;
exports.toggleZoneHover = toggleZoneHover;
exports.toggleRowHover = toggleRowHover;
exports.toggleEditorAction = toggleEditorAction;
exports.startMoving = startMoving;
exports.endMoving = endMoving;
exports.moveRows = moveRows;
exports.setCloudinarySettings = setCloudinarySettings;
exports.setUserProperties = setUserProperties;
exports.setSanitizeHtmlConfig = setSanitizeHtmlConfig;
exports.setAllowedEditorTypes = setAllowedEditorTypes;
exports.setDisableAddButton = setDisableAddButton;

var _actionConstants = require('../helpers/actionConstants');

var _actionConstants2 = _interopRequireDefault(_actionConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function screenResize(browserWidth, browserHeight) {
  return {
    type: _actionConstants2.default.EDITOR_BROWSER_RESIZE,
    browserWidth: browserWidth,
    browserHeight: browserHeight
  };
}

function startEditing(zone) {
  return {
    type: _actionConstants2.default.EDITOR_EDITING_START,
    zone: zone
  };
}

function cancelEditing(zone) {
  return {
    type: _actionConstants2.default.EDITOR_EDITING_CANCEL,
    zone: zone
  };
}

function updateZone(row, zone) {
  return {
    type: _actionConstants2.default.EDITOR_UPDATE_ZONE,
    row: row,
    zone: zone
  };
}

function setCanvasPosition(canvasPosition) {
  return {
    type: _actionConstants2.default.EDITOR_SET_CANVAS_POSITION,
    canvasPosition: canvasPosition
  };
}

function updateDraft(update) {
  return _extends({
    type: _actionConstants2.default.EDITOR_UPDATE_DRAFT
  }, update);
}

function toggleZoneHover(zone, isOver) {
  return {
    type: _actionConstants2.default.EDITOR_ZONE_HOVER_TOGGLE,
    zone: zone,
    isOver: isOver
  };
}

function toggleRowHover(row, isOver) {
  return {
    type: _actionConstants2.default.EDITOR_ROW_HOVER_TOGGLE,
    row: row,
    isOver: isOver
  };
}

function toggleEditorAction(name, isActive) {
  return {
    type: _actionConstants2.default.EDITOR_ACTIONS_TOGGLE,
    name: name,
    isActive: isActive
  };
}

function startMoving(row) {
  return {
    type: _actionConstants2.default.EDITOR_MOVING_ROW_START,
    row: row
  };
}

function endMoving(row) {
  return {
    type: _actionConstants2.default.EDITOR_MOVING_ROW_END,
    row: row
  };
}

function moveRows(sourceIndex, targetIndex) {
  return {
    type: _actionConstants2.default.EDITOR_MOVE_ROW,
    sourceIndex: sourceIndex,
    targetIndex: targetIndex
  };
}

function setCloudinarySettings(cloudinary) {
  return {
    type: _actionConstants2.default.EDITOR_SETTINGS_CLOUDINARY,
    cloudinary: cloudinary
  };
}

function setUserProperties(userProperties) {
  return {
    type: _actionConstants2.default.EDITOR_SETTINGS_USER_PROPERTIES,
    userProperties: userProperties
  };
}

function setSanitizeHtmlConfig(sanitizeHtmlConfig) {
  return {
    type: _actionConstants2.default.EDITOR_SETTINGS_SANITIZE_HTML,
    sanitizeHtmlConfig: sanitizeHtmlConfig
  };
}

function setAllowedEditorTypes(allowedEditorTypes) {
  return {
    type: _actionConstants2.default.EDITOR_SETTINGS_ALLOWED_EDITOR_TYPES,
    allowedEditorTypes: allowedEditorTypes
  };
}

function setDisableAddButton(disableAddButton) {
  return {
    type: _actionConstants2.default.EDITOR_SETTINGS_DISABLE_ADD_BUTTON,
    disableAddButton: disableAddButton
  };
}