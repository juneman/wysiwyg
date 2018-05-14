import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import { DRAGABLE_ITEMS } from '../helpers/constants';
import { colors } from '../helpers/styles/editor';

const dragDropZoneStyle = {
  position: 'absolute',
  background: colors.informationalBlue,
  height: '100%',
  width: 20,
  left: 0,
  top: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '4px 0 0 4px'
};

/**
 * A react component providing a Drag Handle
 * for dragging zones or rows
 * @class
 */
class DragHandle extends Component {

  render() {

    return(
      <div style={{
        ...dragDropZoneStyle
        }}>
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 32" width="8" height="12.8" fill="#fff">
          <title>move-dots</title>
          <path d="M8,4A4,4,0,1,1,4,0,4,4,0,0,1,8,4Zm8-4a4,4,0,1,0,4,4A4,4,0,0,0,16,0ZM4,12a4,4,0,1,0,4,4A4,4,0,0,0,4,12Zm12,0a4,4,0,1,0,4,4A4,4,0,0,0,16,12ZM4,24a4,4,0,1,0,4,4A4,4,0,0,0,4,24Zm12,0a4,4,0,1,0,4,4A4,4,0,0,0,16,24Z" transform="translate(0 0)"/>
        </svg>

      </div>
    );
  }
}

export default DragHandle;