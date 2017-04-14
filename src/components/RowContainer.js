import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import { DRAGABLE_ITEMS } from '../helpers/constants';
import Row from './Row';

/**
 * A wrapper around the Row component to provide
 * a dropzone for resorting rows
 * @class
 */
class RowContainer extends React.Component {
  render() {
    const { connectDropTarget, isOver } = this.props;

    const style = {
      border: (isOver) ? '2px dashed #0bdc66' : null
    };

    return connectDropTarget(
      <div style={style}>
        <Row
          {...this.props}
        />
      </div>
    );
  }
}

RowContainer.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  onDrop: PropTypes.func.isRequired
};

const rowTarget = {
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    targetProps.onDrop(sourceProps.rowIndex, targetProps.rowIndex);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export default DropTarget(DRAGABLE_ITEMS.ROW, rowTarget, collect)(RowContainer);