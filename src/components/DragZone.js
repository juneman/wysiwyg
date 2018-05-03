import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import { DRAGABLE_ITEMS } from '../helpers/constants';

const dragDropZoneStyle = {
  position: 'absolute',
  height: '100%',
  width: 0,
  right: 0,
  top: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'stretch'
};

const dragNotificationBar = {
  width: 4,
  height: '100%',
  opacity: 0,
  transition: 'opacity 0.15s ease-out',
  background: '#0bdc66'
};

/**
 * A react component providing a dropzone
 * for dragging zones into an existing row
 * @class
 */
class DragZone extends Component {

  render() {
    const { zoneItem, isOver, connectDropTarget, canDrop } = this.props;

    return(
      connectDropTarget(
        <div style={{
          ...dragDropZoneStyle,
          ...( canDrop) ? { width: 22, cursor: 'pointer' } : {}
          }}>
          <div style={{
            ...dragNotificationBar,
            ...(canDrop && !isOver) ? { opacity: 0.1 } : {},
            ...(canDrop && isOver) ? { opacity: 1 } : {}
          }}/>
        </div>
      )
    );
  }
}

// = ({ zoneItem, isOver, connectDropTarget, canDrop }) =>

DragZone.propTypes = {
  isHoveringOverContainer: PropTypes.bool,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool,
  canDrop: PropTypes.bool,
  moveZoneToNewColumn: PropTypes.func
};

const zoneTarget = {
  canDrop(props, monitor) {

    const sourceProps = monitor.getItem();
    const rowId = sourceProps.row.get('id');
    return rowId !== props.rowId;
  },
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    targetProps.moveZoneToNewColumn(sourceProps.row, sourceProps.zone);
  }
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    isOverCurrent: monitor.isOver({ shallow: true })
  };
}

export default DropTarget(DRAGABLE_ITEMS.ZONE, zoneTarget, collectTarget)(DragZone);