import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RowContainer from './RowContainer';
import HTMLParser from 'html-parse-stringify2';
import uuid from 'uuid/v4';
import { Map, List, fromJS, is } from 'immutable';

import { convertBoundingBox } from '../helpers/domHelpers';
import { EDITOR_TYPES } from '../helpers/constants';

import FullAddElement from './FullAddElement';
import AddButtonHorizRule from './AddButtonHorizRule';

import * as rowActions from '../actions/rowActions';
import * as zoneActions from '../actions/zoneActions';
import * as editorSelectorActions from '../actions/editorSelectorActions';
import * as editorActions from '../actions/editorActions';

/**
 * A React component that acts as the main
 * wrapper around the other components of the WYSIWYG editor
 * @class
 */
export class Canvas extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rowsLoaded: false
    };
  }

  componentDidMount() {
    const {
      dispatch,
      cloudinary,
      rows,
      startEditable,
      userProperties,
      allowedEditorTypes,
      sanitizeHtml,
      disableAddButton,
      basePadding,
      shouldDisableXSS
    } = this.props;

    window.editorShadowRoot = this.wrapper.getRootNode();

    this.setBoundingBox();
    if (rows && !rows.isEmpty()) {
      const activeZoneId = (startEditable) ? rows.get(0).get('zones').get(0) : null;
      dispatch(rowActions.replaceRows(rows, activeZoneId));
    }
    if (cloudinary) {
      dispatch(editorActions.setCloudinarySettings(cloudinary));
    }
    if (basePadding) {
      dispatch(editorActions.setBasePadding(basePadding));
    }
    if (userProperties && !userProperties.isEmpty()) {
      this.props.dispatch(editorActions.setUserProperties(userProperties));
    }
    if (allowedEditorTypes && !allowedEditorTypes.isEmpty()) {
      dispatch(editorActions.setAllowedEditorTypes(allowedEditorTypes));
    }
    if (disableAddButton !== undefined) {
      dispatch(editorActions.setDisableAddButton(disableAddButton));
    }
    if (sanitizeHtml && !sanitizeHtml.isEmpty()) {
      dispatch(editorActions.setSanitizeHtmlConfig(sanitizeHtml));
    }

    dispatch(editorActions.setShouldDisableXSS(shouldDisableXSS === true));

    this.setState({
      rowsLoaded: true
    });
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, isInEditMode } = this.props;
    const { rowsLoaded } = this.state;

    if (rowsLoaded && !is(nextProps.internalRows, this.props.internalRows)) {
      this.save(nextProps.internalRows, nextProps.internalZones);
    }
    if (!is(nextProps.cloudinary, this.props.cloudinary)) {
      dispatch(editorActions.setCloudinarySettings(nextProps.cloudinary));
    }
    if (!is(nextProps.userProperties, this.props.userProperties)) {
      dispatch(editorActions.setUserProperties(nextProps.userProperties));
    }
    if (!is(nextProps.allowedEditorTypes, this.props.allowedEditorTypes)) {
      dispatch(editorActions.setAllowedEditorTypes(nextProps.allowedEditorTypes));
    }
    if (nextProps.disableAddButton !== this.props.disableAddButton) {
      dispatch(editorActions.setDisableAddButton(nextProps.disableAddButton));
    }
    if (!nextProps.sanitizeHtml.isEmpty() && !is(nextProps.sanitizeHtml, this.props.sanitizeHtml)) {
      dispatch(editorActions.setSanitizeHtmlConfig(nextProps.sanitizeHtml));
    }
    if (nextProps.isInEditMode !== isInEditMode && !!nextProps.onEditStart && !!nextProps.onEditEnd) {
      nextProps.isInEditMode ? nextProps.onEditStart() : nextProps.onEditEnd();
    }
  }

  render() {
    const {
      basePadding,
      internalRows,
      showAddButton,
      style,
      internalAllowedEditorTypes,
      allowedEditorTypes,
      height,
      isHoveringOverContainer,
      onEditorMenuOpen,
      onEditorMenuClose,
      shouldCloseMenu,
      resetShouldCloseMenu,
      numPages,
      isInEditMode
    } = this.props;

    const rowNodes = (internalRows.size) ? internalRows.map((row, i) => {
      return (row.get('zones') && row.get('zones').size) ? (
        <RowContainer
          numPages={numPages}
          key={row.get('id')}
          basePadding={basePadding}
          row={row}
          rowIndex={i}
          addZone={ (type, defaultAction, existingProps) => this.addZone(type, row.get('id'), defaultAction, existingProps)}
          removeZone={ this.removeZone.bind(this) }
          moveZone={ this.moveZone.bind(this) }
          isInEditMode={isInEditMode}
          onDrop={(sourceRowIndex, targetRowIndex) => this.moveRows(sourceRowIndex, targetRowIndex)}
          internalAllowedEditorTypes={ internalAllowedEditorTypes }
          onEditorMenuOpen={ onEditorMenuOpen }
          onEditorMenuClose={ onEditorMenuClose }
          shouldCloseMenu={ shouldCloseMenu }
          resetShouldCloseMenu={ resetShouldCloseMenu }
        />
      ): (
        <FullAddElement
          baseHeight={ height }
          key={row.get('id')}
          allowedEditorTypes={allowedEditorTypes}
          onUpload={(imageDetails) => this.handleAddImage(imageDetails)}
          onSelectEditorType={ (type, rowsToAdd, defaultAction) => this.addRow(type, rowsToAdd, defaultAction) }
          internalAllowedEditorTypes={ internalAllowedEditorTypes }
        />
      );
    }) : null;

    const fullScreenAddNode = (!internalRows.size) ? (
      <FullAddElement
        baseHeight={ height }
        allowedEditorTypes={allowedEditorTypes}
        onUpload={(imageDetails) => this.handleAddImage(imageDetails)}
        onSelectEditorType={ (type, rowsToAdd, defaultAction) => this.addRow(type, rowsToAdd, defaultAction) }
        internalAllowedEditorTypes={ internalAllowedEditorTypes }
      />
    ) : null;

    const addButtonNode = (showAddButton) ? (
      <AddButtonHorizRule
        basePadding={basePadding}
        isHoveringOverContainer={ isHoveringOverContainer }
        onSelectEditorType={ (type, rowsToAdd, defaultAction) => {
            this.addRow(type, rowsToAdd, defaultAction);
            onEditorMenuClose && onEditorMenuClose();
        } }
        moveZoneToNewRow={this.moveZoneToNewRow.bind(this)}
        internalAllowedEditorTypes={ internalAllowedEditorTypes }
        onEditorMenuOpen={ onEditorMenuOpen }
        onEditorMenuClose={ onEditorMenuClose }
        shouldCloseMenu={ shouldCloseMenu }
        resetShouldCloseMenu={ resetShouldCloseMenu }
      />
    ) : null;


    return (
      <div className="canvas"
        style={ style }
        ref={ (el) => this.wrapper = el }>
        { this.renderKeyframeStyles() }
        { this.renderDraftJSStyles() }
        { rowNodes }
        { fullScreenAddNode }
        { addButtonNode }
      </div>
    );
  }

  renderDraftJSStyles() {
    return(
      <style>
        {
          `
          .public-DraftEditorPlaceholder-root {
            position: absolute;
            z-index: 0;
            opacity: 0.8;
            transition: opacity 0.15s ease-out;
          }

          .public-DraftEditorPlaceholder-hasFocus {
            opacity: 0.5;
          }

          `
        }
      </style>
    );
  }

  renderKeyframeStyles() {
    return (
      <style>
        {
          `@-webkit-keyframes editor-slide-in-bottom {
              0% {-webkit-transform:translate3d(0, -15px, 0); opacity: 0}
              100% {-webkit-transform:translate3d(0, 0px, 0); opacity: 1)}
          }

          @-webkit-keyframes editor-slide-out-bottom {
              0% {-webkit-transform:translate3d(0, 0px, 0); opacity: 1)}
              100% {-webkit-transform:translate3d(0, -15px, 0); opacity: 0}
          }

          @-webkit-keyframes editor-slide-in-top {
              0% {-webkit-transform:translate3d(0, 15px, 0); opacity: 0}
              100% {-webkit-transform:translate3d(0, 0px, 0); opacity: 1)}
          }

          @-webkit-keyframes editor-slide-out-top {
              0% {-webkit-transform:translate3d(0, 0px, 0); opacity: 1)}
              100% {-webkit-transform:translate3d(0, 15px, 0); opacity: 0}
          }
          `
        }
      </style>
    );
  }


  setBoundingBox() {
    const { dispatch, canvasPosition } = this.props;
    if (this.wrapper) {
      const position = convertBoundingBox(this.wrapper.getBoundingClientRect());
      if (!position.equals(canvasPosition)) {
        dispatch(editorActions.setCanvasPosition(position));
      }
    }
  }

  handleAddImage(imageDetails) {
    // Trim what we save from Cloudinary down to just these fields
    const { url, height, width } = imageDetails;
    const { canvasPosition } = this.props;

    const urlWithoutProtocol = url.replace(/^https?\:\/\//i, "//");

    // Make sure the uploaded image does not have a larger size than the canvas
    let heightOverride = (height > canvasPosition.get('height')) ? canvasPosition.get('height') : null;
    let widthOverride = (width > canvasPosition.get('width')) ? canvasPosition.get('width') : null;

    const rowsToAdd = fromJS([
      {
        id: uuid(),
        zones: [
          {
            id: uuid(),
            type: 'Image',
            persistedState: {
              url: urlWithoutProtocol,
              width,
              height,
              heightOverride,
              widthOverride
            }
          }
        ]
      }
    ]);

    this.addRow('Image', rowsToAdd);
  }

  addZone(type, rowId, defaultAction, existingProps = {}) {
    const { dispatch, internalRows } = this.props;
    const zoneToAdd = fromJS(
      {
        id: uuid(),
        type,
        persistedState: {
          marginTop: (internalRows.findIndex((row) => row.get('id') == rowId) > 0 && ![EDITOR_TYPES.VIDEO, EDITOR_TYPES.HERO, EDITOR_TYPES.HTML].includes(type)) ? 16 : 0,
          ...existingProps
        }
      }
    );

    dispatch(rowActions.addZone(rowId, zoneToAdd));

    // start editing immediately, if zone is new
    if(Object.keys(existingProps) == 0) {
      dispatch(editorActions.startEditing(zoneToAdd));
    }
    if (defaultAction) {
      dispatch(editorActions.toggleEditorAction(defaultAction, true));
    }
  }

  removeZone(row, zone, confirmDelete){
    const { dispatch } = this.props;

    if(row.get('zones').size == 1) {
      this.removeRow(row.get('id'));
    } else {
      if (confirmDelete && !confirm("Are you sure you want to delete this?")) return false;
      dispatch(editorActions.cancelEditing(zone));
      dispatch(rowActions.removeZone(row, zone));
      dispatch(zoneActions.removeZone(zone.get('id')));
    }
  }

  moveZoneToNewRow(row, zone){
    const { dispatch } = this.props;

    this.removeZone(row, zone);

    const rowsToAdd = fromJS([{
      id: uuid(),
      zones: [
        zone
      ]
    }]);

    dispatch(rowActions.addRows(rowsToAdd));

  }


  addRow(type, rowsToAdd, defaultAction) {
    const { dispatch, internalRows } = this.props;

    rowsToAdd = rowsToAdd || fromJS([{
      id: uuid(),
      zones: [
        {
          id: uuid(),
          type,
          persistedState: {
            marginTop: (internalRows.size > 0 && ![EDITOR_TYPES.VIDEO, EDITOR_TYPES.HERO, EDITOR_TYPES.HTML].includes(type)) ? 16 : 0
          }
        }
      ]
    }]);

    dispatch(rowActions.addRows(rowsToAdd));

    // If only one element is added, let's start editing immediately
    if (rowsToAdd.size === 1 && rowsToAdd.get(0).get('zones').size === 1) {
      const activeZone = rowsToAdd.get(0).get('zones').get(0);
      dispatch(editorActions.startEditing(activeZone));
      if (defaultAction) {
        dispatch(editorActions.toggleEditorAction(defaultAction, true));
      }
    }
  }

  removeRow(id) {
    this.props.dispatch(rowActions.removeRow(id));
  }

  moveRows(sourceIndex, targetIndex) {
    if (sourceIndex === targetIndex) {
      return;
    }
    this.props.dispatch(editorActions.moveRows(sourceIndex, targetIndex));
  }

  moveZone(
    sourceZone,
    sourceColumnIndex,
    sourceRowId,
    targetZone,
    targetColumnIndex,
    targetRowId
  ) {
    if (sourceZone.get('id') === targetZone.get('id') && sourceRowId === targetRowId) {
      return;
    }
    this.props.dispatch(editorActions.moveZone(
      sourceZone,
      sourceColumnIndex,
      sourceRowId,
      targetZone,
      targetColumnIndex,
      targetRowId
    ));
  }

  buildHtml(rows, zonesWithHtml) {
    let html = '';
    rows.forEach((row) => {
      const zones = row.get('zones');
      let zoneBlocks = [];
      if (zones && zones.size) {
        zoneBlocks = zones.map(zone => {
          const zoneId = zone.get('id');
          const zoneHTML = zonesWithHtml.has(zoneId) ? zonesWithHtml.get(zoneId).get('html') : "";
          const zoneWidth = `${ 100 / (zones.size|| 1) }%`;
          return `
            <div class="zone-container" style="display: inline-block; width: ${ zoneWidth }">
              <div class="zone">
                <div class="zone-content">
                  ${zoneHTML}
                </div>
              </div>
            </div>
          `;
        });
      }
      html += `
        <div class="row-container">
          <div class="row" style="display: flex;">
            ${zoneBlocks.join('\n')}
          </div>
        </div>
      `;
    });
    return html;
  }

  save(internalRows, internalZones) {
    const { onSave, style } = this.props;

    if (onSave) {
      // Build the final HTML
      const rowsHtml = this.buildHtml(internalRows, internalZones);

      let html = '';

      if (rowsHtml){
        // Rendering here with ReactDOMServer to convert the optional style object to CSS
        html = ReactDOMServer.renderToStaticMarkup(
          <div className="canvas" style={style}>|ROWS|</div>
        ).replace('|ROWS|', rowsHtml);
      }

      const ast = HTMLParser.parse(html);

      // Flatten the Immutable object before pushing it up to the public API
      onSave({
        rows: internalRows.toJS(),
        ast,
        html: HTMLParser.stringify(ast)
      });
    }
  }

}

Canvas.propTypes = {
  style: PropTypes.object,
  onSave: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
  shouldDisableXSS: PropTypes.bool.isRequired,
  rows: PropTypes.instanceOf(List),
  internalRows: PropTypes.instanceOf(List).isRequired,
  internalZones: PropTypes.instanceOf(Map).isRequired,
  cloudinary: PropTypes.instanceOf(Map).isRequired,
  userProperties: PropTypes.instanceOf(List).isRequired,
  sanitizeHtml: PropTypes.instanceOf(Map).isRequired,
  allowedEditorTypes: PropTypes.instanceOf(List).isRequired,
  internalAllowedEditorTypes: PropTypes.instanceOf(List).isRequired,
  canvasPosition: PropTypes.instanceOf(Map).isRequired,
  showAddButton: PropTypes.bool.isRequired,
  startEditable: PropTypes.bool,
  disableAddButton: PropTypes.bool,
  maxRows: PropTypes.number,
  height: PropTypes.string,
  basePadding: PropTypes.number,
  isHoveringOverContainer: PropTypes.bool,
  isInEditMode: PropTypes.bool,
  onEditStart: PropTypes.func,
  onEditEnd: PropTypes.func,
  onEditorMenuOpen: PropTypes.func,
  onEditorMenuClose: PropTypes.func,
  shouldCloseMenu: PropTypes.bool,
  resetShouldCloseMenu: PropTypes.func,
  numPages: PropTypes.number
};

function mapStateToProps(state, ownProps) {
  return {
    // Convert these to immutable if they're passed in from the public API
    rows: (ownProps.rows) ? fromJS(ownProps.rows) : List(),
    cloudinary: (ownProps.cloudinary) ? fromJS(ownProps.cloudinary) : Map(),
    userProperties: (ownProps.userProperties && ownProps.userProperties.length) ? fromJS(ownProps.userProperties) : List(),
    sanitizeHtml: (ownProps.sanitizeHtml) ? fromJS(ownProps.sanitizeHtml) : Map(),
    allowedEditorTypes: (ownProps.allowedEditorTypes) ? fromJS(ownProps.allowedEditorTypes) : List(),
    isInEditMode: state.editor.get('isCanvasInEditMode'),

    // Internal mappings some of the above properties

    internalRows: state.rows,
    internalZones: state.zones,
    internalAllowedEditorTypes: state.editor.get('allowedEditorTypes'),

    canvasPosition: state.editor.get('canvasPosition'),

    showAddButton: (!ownProps.maxRows || ownProps.maxRows < state.rows.size)
     && !state.editor.get('disableAddButton')
     && !state.editor.get('isCanvasInEditMode')
     && state.rows.size
     && (state.rows.every((row) => row.get('zones') && row.get('zones').size))
     ? true : false
  };
}

export default connect(mapStateToProps)(Canvas);
