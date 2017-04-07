import React from 'react';
import AddButton from '../icons/AddButton';
import SvgIcons from '../icons/SvgIcons';
import Row from './Row';
import HTMLParser from 'html-parse-stringify2';
import uuid from 'uuid/v4';
import isEqual from 'lodash.isequal';

import { convertBoundingBox } from '../helpers/domHelpers';

import EditorSelector from './EditorSelector';
import FullAddElement from './FullAddElement';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: this.props.rows || [],
      showEditorSelector: false,
      isEditing: false,
      position: {},
      addButtonPosition: {}
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
      padding: (rows && rows.length) ? '3px 0' : null
    };

    const rowNodes = (rows && rows.length) ? rows.map((row, i) => {
      return (
        <Row 
          key={row.id}
          onSave={(row) => this.save(i, row)}
          onRemoveRow={() => this.removeRow(row.id)}
          onToggleEditMode={(isEditing) => this.setState({isEditing})}
          isCanvasInEditMode={isEditing}
          {...row}
        />
      );
    }) : null;

    const fullScreenAdd = (!showEditorSelector && (!rows || !rows.length)) ? (
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

      const editorSelectorPosition = Object.assign({}, addButtonPosition, {
        left: position.left + ((position.width - 550) / 2)
      });

      addNewRow = (
        <EditorSelector
          setPosition={editorSelectorPosition}
          onSelect={(type) => this.addRow(type)}
          onCancel={() => this.setState({showEditorSelector: false})}
        />
      );
    } else if (!isEditing && rows && rows.length) {
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
        <SvgIcons />
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
      addButtonPosition.top = addButtonPosition.top + (addButtonPosition.height / 4);
    }
    if (addButtonPosition && !isEqual(addButtonPosition, this.state.addButtonPosition)) {
      update.addButtonPosition = addButtonPosition;
    }
    if (this.wrapper) {
      const position = convertBoundingBox(this.wrapper.getBoundingClientRect());
      if (!isEqual(position, this.state.position)) {
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
    rows.push({
      id: uuid(),
      zones: [
        {
          id: uuid(),
          type,
          value: {}
        }
      ]
    });
    this.setState({
      rows,
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

    if (row) {
      rows[index] = Object.assign({}, row);
      this.setState({
        rows
      });
    }
    if (onSave) {
      const rowsHtml = rows.map(row => row.html);      
      const html = (`<div class="canvas">${rowsHtml}</div>`)
        .replace(/ {2}/g, '')
        .replace(/(\r\n|\r|\n)/g, '');

      const ast = HTMLParser.parse(html);

      // Trim HTML out of what we perist up to the API
      const rowsWithoutHtml = rows.map(zone => {
        const r = Object.assign({}, zone);
        delete r.html;
        if (r.zones && r.zones.length) {
          r.zones = r.zones.map(zone => {
            const z = Object.assign({}, zone);
            delete z.html;
            return z;
          });
        }
        return r;
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
  height: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  onSave: React.PropTypes.func,
  rows: React.PropTypes.array
};
