import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';

import { convertBoundingBox } from '../helpers/domHelpers';
import { DRAGABLE_ITEMS } from '../helpers/constants';
import Zone from './Zone';

/**
 * A React component for each row of the editor
 * @class
 */
export class Row extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: Map()
    };
  }

  componentDidMount() {
    this.setBoundingBox();
  }

  render() {
    const { row, connectDragSource, isMovable } = this.props;
    const { position } = this.state;

    const zoneNodes = row.get('zones').map((zone, i) => {
      return (
        <Zone
          key={zone.get('id')}
          zone={zone}
          row={row}
          rowPosition={position}
          columnIndex={i}
        />
      );
    });

    const gridStyle = {
      position: 'relative',
      gridTemplateColumns: `repeat(${zoneNodes.length}, 1fr)`
    };

    return (isMovable) ? (
      connectDragSource(
        <div className="row" style={gridStyle} ref={(el) => this.wrapper = el}>
          {zoneNodes}
        </div>
      )
    ) : (
      <div
        className="row"
        style={gridStyle}
        ref={(el) => this.wrapper = el}
      >
        {zoneNodes}
      </div>
    );
  }

  setBoundingBox() {
    if (!this.wrapper) {
      return;
    }
    const position = convertBoundingBox(this.wrapper.getBoundingClientRect());
    if (!position.equals(this.state.position)) {
      this.setState({position});
    }
  }

}

Row.propTypes = {
  row: PropTypes.instanceOf(Map).isRequired,
  connectDragSource: PropTypes.func,
  isDragging: PropTypes.bool,
  isMovable: PropTypes.bool.isRequired
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

function mapStateToProps(state) {
  return {
    isMovable: (!state.editor.get('isCanvasInEditMode') && state.rows.size > 1) ? true : false
  };
}

export default connect(mapStateToProps)(DragSource(DRAGABLE_ITEMS.ROW, rowSource, collect)(Row));
