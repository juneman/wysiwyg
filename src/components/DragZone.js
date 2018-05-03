import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import { DRAGABLE_ITEMS } from '../helpers/constants';

const dragZoneStyle = {
  background: '#0bdc66',
  position: 'absolute',
  height: '100%',
  opacity: 0,
  width: 2,
  right: 10,
  top: 0,
  transition: 'opacity 0.15s ease-out'
};

/**
 * A Stateless react component providing a dropzone
 * for dragging zones into an existing row
 * @class
 */
const DragZone = ({ isOver, connectDropTarget }) => connectDropTarget(<div style={{...dragZoneStyle, ...{ opacity: (isOver) ? 1 : 0.5 }}}/>);

DragZone.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool
};

const zoneTarget = {
  hover(targetProps, monitor) {
    // const sourceProps = monitor.getItem();
    // if(sourceProps.rowIndex !== targetProps.rowIndex) {
    //   if (targetProps.rowIndex > sourceProps.rowIndex) {
    //     baseOverStyle.top = null;
    //     baseOverStyle.bottom = -2;
    //   } else if  ( targetProps.rowIndex < sourceProps.rowIndex) {
    //     baseOverStyle.top = -2;
    //     baseOverStyle.bottom = null;
    //   }
    // }
    console.log('hovering');
  },
  drop(targetProps, monitor) {
    // const sourceProps = monitor.getItem();
    // sourceProps.rowIndex >= 0 && targetProps.rowIndex >= 0 &&
    console.log('dropped in add-zone section');
      // targetProps.onDrop(sourceProps.rowIndex, targetProps.rowIndex);
  }
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true })
  };
}

export default DropTarget(DRAGABLE_ITEMS.ZONE, zoneTarget, collectTarget)(DragZone);