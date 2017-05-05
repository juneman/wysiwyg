import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';

import RowContainer from './RowContainer';
import HTMLParser from 'html-parse-stringify2';
import uuid from 'uuid/v4';
import { Map, List, fromJS, is } from 'immutable';

import { convertBoundingBox, flattenHTML } from '../helpers/domHelpers';

import EditorSelector from './EditorSelector';
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
      aceEditorConfig
    } = this.props;

    this.setBoundingBox();
    if (rows && !rows.isEmpty()) {
      const activeZoneId = (startEditable) ? rows.get(0).get('zones').get(0) : null;
      dispatch(rowActions.replaceRows(rows, activeZoneId));
    }
    if (cloudinary) {
      dispatch(editorActions.setCloudinarySettings(cloudinary));
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
    if (aceEditorConfig && !aceEditorConfig.isEmpty()) {
      dispatch(editorActions.setAceEditorConfig(aceEditorConfig));
    }
  }

  componentDidUpdate() {
    this.setBoundingBox();
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    if (nextProps.internalRows !== this.props.internalRows) {
      this.save(nextProps.internalRows);
    }
    if (!is(nextProps.rows, this.props.rows)) {
      const activeZoneId = (nextProps.startEditable) ? nextProps.rows.get(0).get('zones').get(0) : null;
      dispatch(rowActions.replaceRows(nextProps.rows, activeZoneId));
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
  }

  render() {
    const {
      internalRows,
      showAddButton,
      showEditorSelector,
      addButtonPosition,
      screenSize,
      canvasPosition,
      style,
      internalAllowedEditorTypes,
      allowedEditorTypes
    } = this.props;

    const canvasStyles = Object.assign({}, {
      position: 'relative',
      padding: (internalRows.size) ? '3px 0' : null,
      fontFamily: 'Sans-Serif'
    }, style);

    const { height: canvasHeight } = canvasPosition.toJS();

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
          key={row.get('id')}
          allowedEditorTypes={allowedEditorTypes}
          onClickAdd={(addButtonPosition) => this.toggleEditorSelector(addButtonPosition)}
          onUpload={(imageDetails) => this.handleAddImage(imageDetails)}
        />
      );
    }) : null;

    const fullScreenAddNode = (!internalRows.size) ? (
      <FullAddElement
        height={canvasHeight}
        allowedEditorTypes={allowedEditorTypes}
        onClickAdd={(addButtonPosition) => this.toggleEditorSelector(addButtonPosition)}
        onUpload={(imageDetails) => this.handleAddImage(imageDetails)}
      />
    ) : null;

    const editorSelectorNode = showEditorSelector ? (
      <EditorSelector
        canvasPosition={canvasPosition}
        addButtonPosition={addButtonPosition}
        screenSize={screenSize}
        allowedEditorTypes={internalAllowedEditorTypes}
        onSelect={(type, rowsToAdd, defaultAction) => this.addRow(type, rowsToAdd, defaultAction)}
      />
    ) : null;

    const addButtonNode = (showAddButton) ? (
      <AddButtonHorizRule
        onClick={(addButtonPosition) => this.toggleEditorSelector(addButtonPosition)}
      />
    ) : null;

    return (
      <div className="canvas" style={canvasStyles} ref={(el) => this.wrapper = el}>
        { rowNodes }
        { fullScreenAddNode }
        { addButtonNode }
        { editorSelectorNode }
      </div>
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

  toggleEditorSelector(addButtonPosition) {
    const { showEditorSelector } = this.props;
    if (showEditorSelector) {
      this.props.dispatch(editorSelectorActions.hide());
    } else {
      this.props.dispatch(editorSelectorActions.show(addButtonPosition));
    }
  }

  moveRows(sourceIndex, targetIndex) {
    if (sourceIndex === targetIndex) {
      return;
    }
    this.props.dispatch(editorActions.moveRows(sourceIndex, targetIndex));
  }

  buildHtml(rows) {
    let html = '';
    rows.forEach((row) => {
      const zones = row.get('zones');
      let zoneBlocks = [];
      if (zones && zones.size) {
        zoneBlocks = zones.map(zone => zone.get('html'));
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

  save(internalRows) {
    const { onSave, style } = this.props;

    if (onSave) {
      // Build the final HTML
      const rowsHtml = this.buildHtml(internalRows);

      // Rendering here with ReactDOMServer to convert the optional style object to CSS
      const html = flattenHTML(
        ReactDOMServer.renderToStaticMarkup(
          <div className="canvas" style={style}>|ROWS|</div>
        )
        .replace('|ROWS|', rowsHtml)
      );

      const ast = HTMLParser.parse(html);

      // Flatten the Immutable object before pushing it up to the public API
      const rowsWithoutHtml = internalRows.toJS().map(row => {
        // HTML shouldn't be persisted
        delete row.html;
        if (row.zones && row.zones.length) {
          row.zones = row.zones.map(zone => {
            delete zone.html;
            return zone;
          });
        }
        return row;
      });

      onSave({
        rows: rowsWithoutHtml,
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
  rows: PropTypes.instanceOf(List),
  internalRows: PropTypes.instanceOf(List).isRequired,
  cloudinary: PropTypes.instanceOf(Map).isRequired,
  userProperties: PropTypes.instanceOf(List).isRequired,
  sanitizeHtml: PropTypes.instanceOf(Map).isRequired,
  allowedEditorTypes: PropTypes.instanceOf(List).isRequired,
  internalAllowedEditorTypes: PropTypes.instanceOf(List).isRequired,
  aceEditorConfig: PropTypes.instanceOf(Map),
  showEditorSelector: PropTypes.bool.isRequired,
  addButtonPosition: PropTypes.instanceOf(Map).isRequired,
  canvasPosition: PropTypes.instanceOf(Map).isRequired,
  screenSize: PropTypes.instanceOf(Map).isRequired,
  showAddButton: PropTypes.bool.isRequired,
  startEditable: PropTypes.bool,
  disableAddButton: PropTypes.bool,
  maxRows: PropTypes.number
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
    
    // Internal mappings some of the above properties
    internalRows: state.rows,
    internalAllowedEditorTypes: state.editor.get('allowedEditorTypes'),
    
    showEditorSelector: state.editorSelector.get('isOpen'),
    canvasPosition: state.editor.get('canvasPosition'),
    screenSize: state.editor.get('screenSize'),
    addButtonPosition: state.editorSelector.get('addButtonPosition'),

    showAddButton: (!ownProps.maxRows || ownProps.maxRows < state.rows.size)
     && !state.editor.get('disableAddButton')
     && !state.editor.get('isCanvasInEditMode')
     && state.rows.size
     && (state.rows.every((row) => row.get('zones') && row.get('zones').size))
     ? true : false
  };
}

export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(Canvas));

