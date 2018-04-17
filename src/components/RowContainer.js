import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DropTarget, DragSource } from 'react-dnd';
import { List } from 'immutable';

import { DRAGABLE_ITEMS } from '../helpers/constants';

import AddButtonHorizRule from './AddButtonHorizRule';

const dragHandleStyle = {
  background: '#FFAA39',
  position: 'absolute',
  left: 1,
  top: '50%',
  transition: 'opacity 0.15s ease-out',
  transform: 'translateY(-50%)',
  height: '100%',
  maxHeight: 48,
  width: 8,
  borderRadius: 4,
  cursor: '-webkit-grab'

};

import Row from './Row';
/**
 * A React component wrapper around the Row component to provide
 * a dropzone for resorting rows
 * @class
 */
class RowContainer extends Component {

  constructor(props) {
    super(props);
    this.state={
      isAddButtonVisible: null
    };
    this.setIsAddButtonVisible = this.setIsAddButtonVisible.bind(this);
  }

  setIsAddButtonVisible(isAddButtonVisible) {
    this.setState({
      isAddButtonVisible
    });
  }

  render() {
    const { basePadding, connectDropTarget, connectDragPreview, connectDragSource, isMovable, internalAllowedEditorTypes, onEditorMenuOpen, onEditorMenuClose, shouldCloseMenu, resetShouldCloseMenu, isInEditMode, addZone } = this.props;
    const { isAddButtonVisible } = this.state;

    return connectDropTarget(connectDragPreview(
      <div className="row-container"
        onMouseOver={() => this.setIsAddButtonVisible(true) }
        onMouseOut={() => this.setIsAddButtonVisible(false) }
        style={{
          position: 'relative',
          margin: basePadding ? `0 -${basePadding}px` : 0,
          padding: basePadding ? `0 ${basePadding}px` : 0
        }}>
        { isMovable &&
          connectDragSource(
            <section role="drag-handle-to-reorder" style={
              {
                ...dragHandleStyle,
                opacity: isAddButtonVisible ? 1: 0
              } }>
              </section>)
        }
        <Row
          {...this.props}
        />
        <AddButtonHorizRule
            basePadding={basePadding}
            orientation="vertical"
            isHoveringOverContainer={ isAddButtonVisible && !isInEditMode }
            onSelectEditorType={(type, rows, defaultAction) => addZone(type, defaultAction)}
            internalAllowedEditorTypes={ internalAllowedEditorTypes }
            onEditorMenuOpen={ onEditorMenuOpen }
            onEditorMenuClose={ onEditorMenuClose }
            shouldCloseMenu={ shouldCloseMenu }
            resetShouldCloseMenu={ resetShouldCloseMenu }
          />
      </div>
    ));
  }
}

RowContainer.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  addButtonNode: PropTypes.node.isRequired,
  isOver: PropTypes.bool.isRequired,
  isMovable: PropTypes.bool.isRequired,
  onDrop: PropTypes.func.isRequired,
  internalAllowedEditorTypes: PropTypes.instanceOf(List).isRequired,
  isInEditMode: PropTypes.bool,
  onEditorMenuOpen: PropTypes.func,
  onEditorMenuClose: PropTypes.func,
  shouldCloseMenu: PropTypes.bool,
  resetShouldCloseMenu: PropTypes.func,
  addZone: PropTypes.func,
  basePadding: PropTypes.number
};

const rowSource = {
  isDragging(props, monitor) {
    return props.row.get('id') === monitor.getItem().row.get('id');
  },
  beginDrag(props) {
    return {
      row: props.row,
      rowIndex: props.rowIndex
    };
  },
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

const rowTarget = {
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    // sourceProps.rowIndex >= 0 && targetProps.rowIndex >= 0 &&
      targetProps.onDrop(sourceProps.rowIndex, targetProps.rowIndex);
  }
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

function mapStateToProps(state) {
  return {
    isMovable: (!state.editor.get('isCanvasInEditMode') && state.rows.size > 1) ? true : false
  };
}

export default DropTarget(DRAGABLE_ITEMS.ROW, rowTarget, collectTarget)(DragSource(DRAGABLE_ITEMS.ROW, rowSource, collectSource)(connect(mapStateToProps)(RowContainer)));