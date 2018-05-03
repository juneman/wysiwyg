import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DropTarget, DragSource } from 'react-dnd';
import { List, Map } from 'immutable';

import * as rowActions from '../actions/rowActions';
import * as zoneActions from '../actions/zoneActions';

import { DRAGABLE_ITEMS } from '../helpers/constants';

import AddButtonHorizRule from './AddButtonHorizRule';
import MoveVertButton from '../icons/MoveVertButton';
import DragZone from './DragZone';

const dragHandleStyle = {
  position: 'absolute',
  left: -8,
  top: '50%',
  transition: 'opacity 0.15s ease-out',
  transform: 'translateY(-50%) scale(0.8)',
  height: 24,
  width: 24,
  borderRadius: 4,
  cursor: '-webkit-grab'

};

const baseHoverStateStyle = {
  backgroundColor: 'rgba(255,186,76,0.13)'
};

const baseOverStyle = {
  background: '#FFAA39',
  pointerEvents: 'none',
  position: 'absolute',
  width: '100%',
  opacity: 0,
  height: 4,
  left: 0,
  top: -2,
  transition: 'opacity 0.15s ease-out'
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
      isHoveringOverContainer: false
    };
    this.setIsHoveringOverContainer = this.setIsHoveringOverContainer.bind(this);
    this.moveZoneToNewColumn = this.moveZoneToNewColumn.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { isInEditMode } = this.props;

    if (nextProps.isInEditMode && !isInEditMode) {
      this.setState({
        isHoveringOverContainer: false
      });
    }
  }

  setIsHoveringOverContainer(isHoveringOverContainer) {
    const { isInEditMode } = this.props;

    if (isInEditMode) return;

    this.setState({
      isHoveringOverContainer
    });
  }

  moveZoneToNewColumn(sourceRow, sourceZone){
    const { addZone, removeZone } = this.props;

    addZone(sourceZone.get('type'), null, sourceZone.get('persistedState').toJS());
    removeZone(sourceRow, sourceZone);

  }

  render() {
    const { row, basePadding, connectDropTarget, connectDragPreview, connectDragSource, isMovable, isOver,  internalAllowedEditorTypes, onEditorMenuOpen, onEditorMenuClose, shouldCloseMenu, resetShouldCloseMenu, isInEditMode, addZone } = this.props;
    const { isHoveringOverContainer } = this.state;

    return connectDropTarget(connectDragPreview(
      <div className="row-container"
        onMouseOver={() => this.setIsHoveringOverContainer(true) }
        onMouseOut={() => this.setIsHoveringOverContainer(false) }
        style={{
          ...((isHoveringOverContainer && !isOver) && !isInEditMode) ? baseHoverStateStyle : {},
          position: 'relative',
          margin: basePadding ? `0 -${basePadding}px` : 0,
          padding: basePadding ? `0 ${basePadding}px` : 0
        }}>
      <div style={{...baseOverStyle, ...(isOver && !isHoveringOverContainer && !isInEditMode) ? {opacity: 1} : {}}}></div>
      { isMovable && !isInEditMode &&
        connectDragSource(
          <section role="drag-handle-to-reorder" style={
            {
              ...dragHandleStyle,
              opacity: isHoveringOverContainer ? 1: 0
            } }>
            <MoveVertButton
              smallButton
              color='#FFAA39'/>
            </section>)
      }
      <Row
        {...this.props}
      />
      <DragZone
        moveZoneToNewColumn={ this.moveZoneToNewColumn }
        rowId={row.get('id')}
        isHoveringOverContainer={isHoveringOverContainer} />
      <AddButtonHorizRule
          basePadding={basePadding}
          orientation="vertical"
          isHoveringOverContainer={ isHoveringOverContainer && !isInEditMode }
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
  dispatch: PropTypes.func,
  row: PropTypes.instanceOf(Map),
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
  removeZone: PropTypes.func,
  insertZone: PropTypes.func,
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
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    if(sourceProps.rowIndex !== targetProps.rowIndex) {
      if (targetProps.rowIndex > sourceProps.rowIndex) {
        baseOverStyle.top = null;
        baseOverStyle.bottom = -2;
      } else if  ( targetProps.rowIndex < sourceProps.rowIndex) {
        baseOverStyle.top = -2;
        baseOverStyle.bottom = null;
      }
    }
  },
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