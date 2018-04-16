import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { List } from 'immutable';

import { DRAGABLE_ITEMS } from '../helpers/constants';

import AddButtonHorizRule from './AddButtonHorizRule';
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
    const { connectDropTarget, internalAllowedEditorTypes, onEditorMenuOpen, onEditorMenuClose, shouldCloseMenu, resetShouldCloseMenu, isInEditMode, addZone } = this.props;
    const { isAddButtonVisible } = this.state;

    return connectDropTarget(
      <div className="row-container"
        onMouseOver={() => this.setIsAddButtonVisible(true) }
        onMouseOut={() => this.setIsAddButtonVisible(false) }
        style={{
          position: 'relative'
        }}>
        <Row
          {...this.props}
        />
        <AddButtonHorizRule
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
    );
  }
}

RowContainer.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  addButtonNode: PropTypes.node.isRequired,
  isOver: PropTypes.bool.isRequired,
  onDrop: PropTypes.func.isRequired,
  internalAllowedEditorTypes: PropTypes.instanceOf(List).isRequired,
  isInEditMode: PropTypes.bool,
  onEditorMenuOpen: PropTypes.func,
  onEditorMenuClose: PropTypes.func,
  shouldCloseMenu: PropTypes.bool,
  resetShouldCloseMenu: PropTypes.func,
  addZone: PropTypes.func
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