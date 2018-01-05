import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RowContainer from './RowContainer';
import HTMLParser from 'html-parse-stringify2';
import uuid from 'uuid/v4';
import { Map, List, fromJS, is } from 'immutable';

import { convertBoundingBox } from '../helpers/domHelpers';

import FullAddElement from './FullAddElement';
import AddButtonHorizRule from './AddButtonHorizRule';

import * as rowActions from '../actions/rowActions';
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
      aceEditorConfig,
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

    if (aceEditorConfig && !aceEditorConfig.isEmpty()) {
      dispatch(editorActions.setAceEditorConfig(aceEditorConfig));
    }

    this.setState({
      rowsLoaded: true
    });
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, isInEditMode } = this.props;
    const { rowsLoaded } = this.state;

    if (rowsLoaded && (nextProps.internalRows !== this.props.internalRows)) {
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
    if (!nextProps.aceEditorConfig.isEmpty() && !is(nextProps.aceEditorConfig, this.props.aceEditorConfig)) {
      dispatch(editorActions.setAceEditorConfig(nextProps.aceEditorConfig));
    }
    if (nextProps.isInEditMode !== isInEditMode && !!nextProps.onEditStart && !!nextProps.onEditEnd) {
      nextProps.isInEditMode ? nextProps.onEditStart() : nextProps.onEditEnd();
    }
  }

  render() {
    const {
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
      resetShouldCloseMenu
    } = this.props;

    const rowNodes = (internalRows.size) ? internalRows.map((row, i) => {
      return (row.get('zones') && row.get('zones').size) ? (
        <RowContainer
          key={row.get('id')}
          row={row}
          rowIndex={i}
          onDrop={(sourceRowIndex, targetRowIndex) => this.moveRows(sourceRowIndex, targetRowIndex)}
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
        isHoveringOverContainer={ isHoveringOverContainer }
        onSelectEditorType={ (type, rowsToAdd, defaultAction) => {
            this.addRow(type, rowsToAdd, defaultAction);
            onEditorMenuClose();
        } }
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

  handleAddNew(e) {
    if (e) e.preventDefault();
    const { dispatch, canvasPosition } = this.props;
    dispatch(editorSelectorActions.show(canvasPosition));
  }

  handleAddImage(imageDetails) {
    // Trim what we save from Cloudinary down to just these fields
    const { url, height, width } = imageDetails;
    const { canvasPosition } = this.props;

    // Make sure the uploaded image does not have a larger size than the canvas
    let heightOverride = (height > canvasPosition.get('height')) ? canvasPosition.get('height') : undefined;
    let widthOverride = (width > canvasPosition.get('width')) ? canvasPosition.get('width') : undefined;

    const rowsToAdd = fromJS([
      {
        id: uuid(),
        zones: [
          {
            id: uuid(),
            type: 'Image',
            persistedState: {
              url,
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

  addRow(type, rowsToAdd, defaultAction) {
    const { dispatch } = this.props;

    rowsToAdd = rowsToAdd || fromJS([{
      id: uuid(),
      zones: [
        {
          id: uuid(),
          type,
          persistedState: {}
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
          <div class="row">
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

      // Rendering here with ReactDOMServer to convert the optional style object to CSS
      const html = ReactDOMServer.renderToStaticMarkup(
        <div className="canvas" style={style}>|ROWS|</div>
      ).replace('|ROWS|', rowsHtml);

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
  aceEditorConfig: PropTypes.instanceOf(Map),
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
  resetShouldCloseMenu: PropTypes.func
};

function mapStateToProps(state, ownProps) {
  return {
    // Convert these to immutable if they're passed in from the public API
    rows: (ownProps.rows) ? fromJS(ownProps.rows) : List(),
    cloudinary: (ownProps.cloudinary) ? fromJS(ownProps.cloudinary) : Map(),
    userProperties: (ownProps.userProperties && ownProps.userProperties.length) ? fromJS(ownProps.userProperties) : List(),
    sanitizeHtml: (ownProps.sanitizeHtml) ? fromJS(ownProps.sanitizeHtml) : Map(),
    allowedEditorTypes: (ownProps.allowedEditorTypes) ? fromJS(ownProps.allowedEditorTypes) : List(),
    aceEditorConfig: (ownProps.aceEditorConfig) ? fromJS(ownProps.aceEditorConfig) : Map(),
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
