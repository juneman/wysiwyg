import React from 'react';
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

export class Canvas extends React.Component {

  componentDidMount() {
    this.setBoundingBox();
  }

  componentDidUpdate() {
    this.setBoundingBox();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.internalRows !== this.props.internalRows) {
      this.save(nextProps.internalRows);
    }
    if (!nextProps.rows.isEmpty() && this.props.internalRows.isEmpty()) {
      this.props.dispatch(rowActions.replaceRows(nextProps.rows));
    }
    if (!is(nextProps.rows, this.props.rows)) {
      this.props.dispatch(rowActions.replaceRows(nextProps.rows));
    }
    if (!is(nextProps.cloudinary, this.props.internalCloudinary)) {
      this.props.dispatch(editorActions.setCloudinarySettings(nextProps.cloudinary));
    }
    if (!is(nextProps.userProperties, this.props.internalUserProperties)) {
      this.props.dispatch(editorActions.setUserProperties(nextProps.userProperties));
    }
  }

  render() {
    const { height, width, internalRows, showAddButton, showEditorSelector, addButtonPosition } = this.props;

    const canvasStyles = {
      height,
      width,
      padding: (internalRows.size) ? '3px 0' : null
    };

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
          width={width}
          onClickAdd={(addButtonPosition) => this.showEditorSelector(addButtonPosition)}
          onUpload={(imageDetails) => this.handleAddImage(imageDetails)}
        />
      );
    }) : null;

    const fullScreenAddNode = (!internalRows.size) ? (
      <FullAddElement
        height={height}
        width={width}
        onClickAdd={(addButtonPosition) => this.showEditorSelector(addButtonPosition)}
        onUpload={(imageDetails) => this.handleAddImage(imageDetails)}
      />
    ) : null;

    const editorSelectorNode = showEditorSelector ? (
      <EditorSelector
        addButtonPosition={addButtonPosition}
        onSelect={(type, rowsToAdd, defaultAction) => this.addRow(type, rowsToAdd, defaultAction)}
      />
    ) : null;

    const addButtonNode = (showAddButton) ? (
      <AddButtonHorizRule
        onClick={(addButtonPosition) => this.showEditorSelector(addButtonPosition)}
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
    if (rowsToAdd.size === 1) {
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

  showEditorSelector(addButtonPosition) {
    this.props.dispatch(editorSelectorActions.show(addButtonPosition));
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
    const { onSave, canvasPosition } = this.props;
    const width = canvasPosition.get('width');
    const height = canvasPosition.get('height');

    if (onSave) {
      // Build the final HTML
      const rowsHtml = this.buildHtml(internalRows);

      const html = flattenHTML(`
        <div class="canvas" style="width:${width};height:${height};">
          ${rowsHtml}
        </div>
      `);

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
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onSave: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
  rows: PropTypes.instanceOf(List),
  internalRows: PropTypes.instanceOf(List).isRequired,
  cloudinary: PropTypes.instanceOf(Map).isRequired,
  internalCloudinary: PropTypes.instanceOf(Map).isRequired,
  userProperties: PropTypes.instanceOf(List).isRequired,
  internalUserProperties: PropTypes.instanceOf(List).isRequired,
  showEditorSelector: PropTypes.bool.isRequired,
  addButtonPosition: PropTypes.instanceOf(Map).isRequired,
  canvasPosition: PropTypes.instanceOf(Map).isRequired,
  showAddButton: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    // Convert these to immutable if they're passed in from the public API
    rows: (ownProps.rows) ? fromJS(ownProps.rows) : List(),
    cloudinary: (ownProps.cloudinary) ? fromJS(ownProps.cloudinary) : Map(),
    userProperties: (ownProps.userProperties && ownProps.userProperties.length) ? fromJS(ownProps.userProperties) : List(),
    
    internalCloudinary: state.editor.get('cloudinary'),
    internalUserProperties: state.editor.get('userProperties'),
    internalRows: state.rows,
    showEditorSelector: state.editorSelector.get('isOpen'),
    canvasPosition: state.editor.get('canvasPosition'),
    addButtonPosition: state.editorSelector.get('addButtonPosition'),

    showAddButton: !state.editor.get('isCanvasInEditMode')
     && state.rows.size
     && (state.rows.every((row) => row.get('zones') && row.get('zones').size))
     ? true : false
  };
}

export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(Canvas));

