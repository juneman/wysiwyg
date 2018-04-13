import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import { DRAGABLE_ITEMS } from '../helpers/constants';

import AddButtonHorizRule from './AddButtonHorizRule';
import Row from './Row';

/**
 * A React component wrapper around the Row component to provide
 * a dropzone for resorting rows
 * @class
 */
class RowContainer extends React.Component {
  render() {
    const { connectDropTarget, isOver, addButtonNode } = this.props;

    return connectDropTarget(
      <div className="row-container"
        style={{
          position: 'relative'
        }}>
        <Row
          {...this.props}
        />
        { addButtonNode }
      </div>
    );
  }
}

RowContainer.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  addButtonNode: PropTypes.node.isRequired,
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