import React from 'react';
import PropTypes from 'prop-types';

import Row from './Row';
import HTMLParser from 'html-parse-stringify2';
import uuid from 'uuid/v4';
import { Map, List, fromJS } from 'immutable';

import AddButton from '../icons/AddButton';

import { convertBoundingBox, flattenHTML } from '../helpers/domHelpers';

import EditorSelector from './EditorSelector';
import FullAddElement from './FullAddElement';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: fromJS(props.rows) || List(),
      showEditorSelector: false,
      isEditing: false,
      position: Map(),
      addButtonPosition: Map()
    };
  }

  componentDidMount() {
    this.setBoundingBox();
  }

  componentDidUpdate() {
    this.setBoundingBox();
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
        <Row 
          key={row.get('id')}
          row={row}
          onSave={(row) => this.save(i, row)}
          onRemoveRow={() => this.removeRow(row.id)}
          onToggleEditMode={(isEditing) => this.setState({isEditing})}
          isCanvasInEditMode={isEditing}
        />
      );
    }) : null;

    const fullScreenAdd = (!showEditorSelector && !rows.size) ? (
      <div ref={(el) => this.fullScreenAdd = el}>
        <FullAddElement
          height={height}
          width={width}
          onClick={() => this.handleAddNew()}
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
          onSelect={(type) => this.addRow(type)}
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

  addRow(type) {
    const { rows } = this.state;
    const updatedRows = rows.push(fromJS({
      id: uuid(),
      zones: [
        {
          id: uuid(),
          type,
          persistedState: {}
        }
      ]
    }));
    this.setState({
      rows: updatedRows,
      showEditorSelector: false
    });
  }

  removeRow(id) {
    const { rows } = this.state;
    rows.splice(
      rows.findIndex((row) => row.id === id), 1
    );
    this.setState({
      rows
    });
    this.save();
  }

  save(index, row) {
    const { rows } = this.state;
    const { onSave } = this.props;

    let updatedRows = rows;

    if (row) {
      updatedRows = rows.set(index, row);
      this.setState({
        rows: updatedRows
      });
    }
    if (onSave) {
      const rowsHtml = updatedRows.toJS().map(row => row.html);      
      const html = flattenHTML(`<div class="canvas">${rowsHtml}</div>`);

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
  rows: PropTypes.array
};
