import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import { DRAGABLE_ITEMS } from '../helpers/constants';
import { colors } from '../helpers/styles/editor';

const dragDropZoneStyle = {
  position: 'absolute',
  height: '100%',
  width: 0,
  right: 0,
  top: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'stretch',
  pointerEvents: 'none'
};

const dragNotificationBar = {
  width: 4,
  height: '100%',
  opacity: 0,
  transition: 'opacity 0.15s ease-out',
  background: colors.informationalBlue
};

/**
 * A react component providing a dropzone
 * for dragging zones into an existing row
 * @class
 */
class DragZone extends Component {

  render() {
    const { isOver, connectDropTarget, canDrop } = this.props;

    return(
      connectDropTarget(
        <div style={{
          ...dragDropZoneStyle,
          ...( canDrop) ? { pointerEvents: 'all', width: 32, cursor: 'pointer' } : {}
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