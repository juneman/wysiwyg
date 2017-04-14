import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { DragSource } from 'react-dnd';

import { DRAGABLE_ITEMS } from '../helpers/constants';
import Zone from './Zone';

export class Row extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMovable: false
    };
  }

  render() {
    const {
      row,
      onToggleEditMode,
      isCanvasInEditMode,
      connectDragSource,
    } = this.props;

    const { isMovable } = this.state;

    const zoneNodes = row.get('zones').map((zone, i) => {
      return (
        <Zone
          key={zone.get('id')}
          zone={zone}
          columnIndex={i}
          onSave={(zone) => this.save(i, zone)}
          onRemove={() => this.remove()}
          onToggleEditMode={(isEnabled) => onToggleEditMode(isEnabled)}
          onMoveRowStart={() => this.setState({isMovable: true})}
          onMoveRowEnd={() => this.setState({isMovable: false})}
          isCanvasInEditMode={isCanvasInEditMode}
        />
      );
    });

    const gridStyle = {
      gridTemplateColumns: `repeat(${zoneNodes.length}, 1fr)`
    };

    return (isMovable) ? (
      connectDragSource(
        <div className="row" style={gridStyle}>
          {zoneNodes}
        </div>
      )
    ) : (
      <div className="row" style={gridStyle}>
        {zoneNodes}
      </div>
    );
  }

  save(index, zone) {
    const { row, onSave } = this.props;
    const updatedZones = row.get('zones').set(index, zone);
    const zonesHtml = updatedZones.toJS().map(zone => zone.html).join('\n');
    const updatedRow = row
      .set('zones', updatedZones)
      .set('html', `<div class="row">${zonesHtml}</div>`);
    onSave(updatedRow);
  }

  remove() {
    this.props.onRemoveRow();
  }

}

Row.propTypes = {
  row: PropTypes.instanceOf(Map).isRequired,
  isCanvasInEditMode: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
  onToggleEditMode: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func,
  isDragging: PropTypes.bool
};

const rowSource = {
  beginDrag(props) {
    return {
      row: props.row,
      rowIndex: props.rowIndex
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

export default DragSource(DRAGABLE_ITEMS.ROW, rowSource, collect)(Row);