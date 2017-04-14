import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import RowContainer from './RowContainer';
import HTMLParser from 'html-parse-stringify2';
import uuid from 'uuid/v4';
import { Map, List, fromJS } from 'immutable';

import AddButton from '../icons/AddButton';

import { convertBoundingBox, flattenHTML } from '../helpers/domHelpers';

import EditorSelector from './EditorSelector';
import FullAddElement from './FullAddElement';

export class Canvas extends React.Component {
  constructor(props) {
    super(props);

    const rows = fromJS(props.rows) || List();

    this.state = {
      originalRows: rows,
      rows,
      showEditorSelector: false,
      isEditing: false,
      position: Map(),
      addButtonPosition: Map()
    };
  }

  getChildContext() {
    return {
      cloudinary: this.props.cloudinary
    };
  }

  componentDidMount() {
    this.setBoundingBox();
  }

  componentDidUpdate() {
    this.setBoundingBox();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rows) {
      const rows = fromJS(nextProps.rows) || List();
      this.setState({
        originalRows: rows,
        rows
      });
    }
  }

  render() {
    const { rows, showEditorSelector, isEditing, addButtonPosition, position } = this.state;
    const { height, width } = this.props;

    const canvasStyles = {
      height,
      width,
      padding: (rows.size) ? '3px 0' : null
    };

    const rowNodes = (rows.size) ? rows.map((row, i) => {
      return (
        <RowContainer 
          key={row.get('id')}
          row={row}
          rowIndex={i}
          onSave={(row) => this.save(i, row)}
          onRemoveRow={() => this.removeRow(row.get('id'))}
          onToggleEditMode={(isEditing) => this.setState({isEditing})}
          onDrop={(sourceIndex, targetIndex) => this.moveRows(sourceIndex, targetIndex)}
          isCanvasInEditMode={isEditing}
          canvasPosition={position}
        />
      );
    }) : null;

    const fullScreenAdd = (!showEditorSelector && !rows.size) ? (
      <div ref={(el) => this.fullScreenAdd = el}>
        <FullAddElement
          height={height}
          width={width}
          onClick={() => this.handleAddNew()}
          onUpload={(imageDetails) => this.handleAddImage(imageDetails)}
          onDragImage={() => {}}
        />
      </div>
    ) : null;

    let addNewRow;
    if (showEditorSelector) {
      const editorSelectorPosition = addButtonPosition.set('left',
        position.get('left') + ((position.get('width') - 550) / 2));

      addNewRow = (
        <EditorSelector
          setPosition={editorSelectorPosition}
          onSelect={(type, zones) => this.addRow(type, zones)}
          onCancel={() => this.setState({showEditorSelector: false})}
        />
      );
    } else if (!isEditing && rows.size) {
      addNewRow = (
        <div style={{textAlign: 'center'}}>
          <a
            href="#"
            id="addBtn"
            onClick={(e) => this.handleAddNew(e)}
            ref={(el) => this.addButton = el}
          ><AddButton shadow={true} /></a>
        </div>
      );
    }

    return (
      <div className="canvas" style={canvasStyles} ref={(el) => this.wrapper = el}>
        { rowNodes }
        { fullScreenAdd }
        { addNewRow }
      </div>
    );
  }

  setBoundingBox() {
    // Find the position of the AddButton to overlay the EditorSelector
    const update = {};
    let addButtonPosition;
    if (this.addButton) {
      addButtonPosition = convertBoundingBox(this.addButton.getBoundingClientRect());
    } else if (this.fullScreenAdd) {
      addButtonPosition = convertBoundingBox(this.fullScreenAdd.getBoundingClientRect());
      addButtonPosition = addButtonPosition.set('top', addButtonPosition.get('top') + (addButtonPosition.get('height') / 4));
    }
    if (addButtonPosition && !addButtonPosition.equals(this.state.addButtonPosition)) {
      update.addButtonPosition = addButtonPosition;
    }
    if (this.wrapper) {
      const position = convertBoundingBox(this.wrapper.getBoundingClientRect());
      if (!position.equals(this.state.position)) {
        update.position = position;
      }
    }
    if (Object.keys(update).length) {
      this.setState(update);
    }
  }

  handleAddNew(e) {
    if (e) e.preventDefault();
    this.setState({
      showEditorSelector: true
    });
  }

  handleAddImage(imageDetails) {
    // Trim what we save from Cloudinary down to just these fields
    const { url, height, width } = imageDetails;
    const { position } = this.state;

    // Make sure the uploaded image does not have a larger size than the canvas
    let heightOverride = (height > position.get('height')) ? position.get('height') : undefined;
    let widthOverride = (width > position.get('width')) ? position.get('width') : undefined;

    const rowsToAdd = [
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
    ];

    this.addRow('Image', rowsToAdd);
  }

  addRow(type, rowsToAdd) {
    const { rows } = this.state;

    rowsToAdd = rowsToAdd || [{
      id: uuid(),
      zones: [
        {
          id: uuid(),
          type,
          persistedState: {}
        }
      ]
    }];

    let updatedRows = rows;
    rowsToAdd.forEach((row) => {
      updatedRows = updatedRows.push(fromJS(row));
    });
    
    this.setState({
      rows: updatedRows,
      showEditorSelector: false
    });
  }

  removeRow(id) {
    const { rows } = this.state;
    const rowIndex = rows.findIndex((row) => row.get('id') === id);
    if (rowIndex === -1) {
      return;
    }
    const updatedRows = rows.splice(rowIndex, 1);
    this.setState({
      rows: updatedRows
    });
    this.save(updatedRows);
  }

  moveRows(sourceIndex, targetIndex) {
    if (sourceIndex === targetIndex) {
      return;
    }
    const { rows } = this.state;
    const sourceRow = rows.get(sourceIndex);
    const updatedRows = rows.delete(sourceIndex)
      .insert(targetIndex, sourceRow);

    this.setState({
      rows: updatedRows
    });
    this.save(updatedRows);
  }

  save(index, row) {
    const { rows, originalRows, position } = this.state;
    const { onSave } = this.props;
    const width = position.get('width');
    const height = position.get('height');

    // In v4 of Immutable, switch to isImmutable()
    let updatedRows = (index && !row) ? index : rows;

    if (row) {
      updatedRows = rows.set(index, row);
      this.setState({
        rows: updatedRows
      });
    }

    // Compare against what the component originally received
    // as inbound props to see if we should bubble up a Save event
    const shouldCallSave = rows.equals(originalRows) ? false : true;

    if (onSave && shouldCallSave) {
      const rowsHtml = updatedRows.toJS().map(row => row.html);      
      const html = flattenHTML(`
        <div class="canvas" style="width:${width};height:${height};">
          ${rowsHtml}
        </div>
      `);

      const ast = HTMLParser.parse(html);

      // Flatten the Immutable object before pushing it up to the public API
      const rowsWithoutHtml = updatedRows.toJS().map(row => {
        // HTML shouldn't be persisted
        delete row.html;
        if (row.zones.length) {
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
  rows: PropTypes.array,
  cloudinary: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    uploadUrl: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired
  })
};

Canvas.childContextTypes = {
  cloudinary: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    uploadUrl: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired
  })
};

export default DragDropContext(HTML5Backend)(Canvas);

