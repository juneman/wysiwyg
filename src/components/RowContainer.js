import React, {Component} from 'react';
import PropTypes from 'prop-types';
import tinyColor from 'tinycolor2';
import { connect } from 'react-redux';
import { DropTarget, DragSource } from 'react-dnd';
import { List, Map } from 'immutable';

import { DRAGABLE_ITEMS, MAX_ZONES } from '../helpers/constants';
import { colors, draggingOverlayStyle } from '../helpers/styles/editor';

import AddButtonArea from './AddButtonArea';
import DragZone from './DragZone';
import DragHandle from './DragHandle';

const dragHandleStyle = {
  position: 'absolute',
  left: -20,
  top: 0,
  transition: 'opacity 0.15s ease-out',
  height: '100%',
  width: 20,
  cursor: '-webkit-grab'

};


const baseHoverStateStyle = {
  backgroundColor: tinyColor(colors.informationalBlue).setAlpha(0.14).toRgbString()
};

const baseOverStyle = {
  background: colors.informationalBlue,
  pointerEvents: 'none',
  position: 'absolute',
  width: 'calc(100% + 24px)',
  opacity: 0,
  height: 2,
  left: -12,
  top: -2,
  transition: 'opacity 0.15s ease-out',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
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

    removeZone(sourceRow, sourceZone);
    addZone(sourceZone.get('type'), null, sourceZone.get('persistedState').toJS());

  }

  render() {
    const { row, basePadding, connectDropTarget, connectDragPreview, connectDragSource, isMovable, isOver,  internalAllowedEditorTypes, onEditorMenuOpen, onEditorMenuClose, shouldCloseMenu, resetShouldCloseMenu, isInEditMode, addZone, isDragging } = this.props;
    const { isHoveringOverContainer } = this.state;

    const numZones = row.get('zones').size;

    return connectDropTarget(
      <div className="row-container"
        onMouseEnter={() => this.setIsHoveringOverContainer(true) }
        onMouseLeave={() => this.setIsHoveringOverContainer(false) }
        style={{
          ...((isHoveringOverContainer && !isOver) && !isInEditMode) ? baseHoverStateStyle : {},
          position: 'relative',
          margin: basePadding ? `0 -${basePadding}px` : 0,
          padding: basePadding ? `0 ${basePadding}px` : 0
        }}>
      { (!isInEditMode && !isDragging && !isHoveringOverContainer) &&
        <div style={{...baseOverStyle, ...isOver ? {opacity: 1} : {}}}>
          <svg id="right-side-caret" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 24" height="12" preserveAspectRatio="xMidYMid meet">
            <title>Left Side Caret - Move Row</title>
            <path fill={colors.informationalBlue} d="M0,4V20a4,4,0,0,0,4,4H31L46,12.52,31,0H4A4,4,0,0,0,0,4Z" transform="translate(0 0)"/>
          </svg>

          <svg id="left-side-caret" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 24" height="12" preserveAspectRatio="xMidYMid meet">
            <title>Right Side Caret - Move Row</title>
            <path fill={colors.informationalBlue} d="M46,4V20a4,4,0,0,1-4,4H15L0,12.52,15,0H42A4,4,0,0,1,46,4Z"/>
          </svg>

        </div>
      }
      { isMovable && !isInEditMode && !isDragging &&
        connectDragSource(
          <section role="drag-handle-to-reorder" style={
            {
              ...dragHandleStyle,
              opacity: isHoveringOverContainer ? 1: 0
            } }>
              <DragHandle/>
            </section>
          )
      }
      {
        connectDragPreview(
          <div style={ isDragging ? {opacity: 0} : null}>
            <Row
              setIsHoveringOverRowContainer={this.setIsHoveringOverContainer}
              {...this.props}
            />
          </div>
        )
      }
      { numZones < MAX_ZONES &&
        <DragZone
          moveZoneToNewColumn={ this.moveZoneToNewColumn }
          rowId={row.get('id')}
          isHoveringOverContainer={isHoveringOverContainer} />
      }
      { !isInEditMode && numZones < MAX_ZONES &&
        <AddButtonArea
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
      }
      { isDragging &&
        <div style={draggingOverlayStyle}></div>
      }
      </div>
    );
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
  basePadding: PropTypes.number,
  isDragging: PropTypes.bool,
  rowIndex: PropTypes.number,
  totalRows: PropTypes.number
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