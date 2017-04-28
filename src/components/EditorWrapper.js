import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { convertBoundingBox } from '../helpers/domHelpers';
import OkButton from '../icons/OkButton';
import EditButton from '../icons/EditButton';
import CancelButton from '../icons/CancelButton';
import DeleteButton from '../icons/DeleteButton';

/**
 * A React component that wraps a Zone component when
 * editing is active. It provides the toolbars for Save/Cancel/etc
 * @class
 */
export default class EditorWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: Map(),
      toolbarPosition: Map()
    };
  }

  componentDidMount() {
    this.setBoundingBox();
  }

  componentDidUpdate() {
    this.setBoundingBox();
  }

  render() {
    const { position, toolbarPosition } = this.state;
    const {
      isEditing,
      isHover,
      children,
      rowPosition,
      toolbarNode,
      onSave,
      onCancel,
      onRemove,
      onEdit,
      disableDeleteButton
    } = this.props;

    const hoverButtonStyles = {
      textAlign: 'center',
      position: 'absolute',
      width: position.get('width') || 100,
      top: position.get('top'),
      zIndex: 100
    };

    const editingButtonStyles = {
      position: 'absolute',
      left: (rowPosition && rowPosition.get('right')) ? rowPosition.get('right') - 150 : 0,
      top: (rowPosition && rowPosition.get('bottom')) ? rowPosition.get('bottom') : 0
    };
    
    // If the canvas is really small, make sure the buttons don't overlap the toolbar
    if (toolbarPosition.get('left') && editingButtonStyles.left < (toolbarPosition.get('left') + toolbarPosition.get('width'))) {
      editingButtonStyles.left = toolbarPosition.get('left') + toolbarPosition.get('width') + 20;
    }

    const toolbarStyles = {
      position: 'absolute',
      left: (rowPosition && rowPosition.get('left')) ? rowPosition.get('left') : 0,
      top: (rowPosition && rowPosition.get('bottom')) ? rowPosition.get('bottom') : 0
    };

    let buttons;
    
    if (isEditing) {
      buttons = (
        <div className="editing">
          {children}
          <div style={editingButtonStyles}>
            <OkButton shadow={true} color="#0bdc66" onClick={() => onSave()} />
            <CancelButton shadow={true} color="#C0C0C0" onClick={() => onCancel()} />
            { (disableDeleteButton) ? null : <DeleteButton shadow={true} color="#FF0000" onClick={() => onRemove()} /> }
          </div>
          { (toolbarNode) ? (
            <div style={toolbarStyles} ref={(el) => this.toolbar = el}>
              { toolbarNode }
            </div>
          ) : null}
        </div>
      );
    } else if (isHover) {
      buttons = (
        <div className="hover">
          <div key="edit" style={hoverButtonStyles}>
            <EditButton
              shadow={true}
              color="#f4ad42"
              onClick={() => onEdit()}
            />
          </div>
          {children}
        </div>
      );
    }

    return (
      <div className="content" ref={(el) => this.wrapper = el}>
        {(buttons) ? buttons : children}
      </div>
    );
  }

  setBoundingBox() {
    const update = {};
    if (this.wrapper) {
      const position = convertBoundingBox(this.wrapper.getBoundingClientRect());
      if (!position.equals(this.state.position)) {
        update.position = position;
      }
    }
    if (this.toolbar) {
      const toolbarPosition = convertBoundingBox(this.toolbar.getBoundingClientRect());
      if (!toolbarPosition.equals(this.state.toolbarPosition)) {
        update.toolbarPosition = toolbarPosition;
      }
    }
    if (Object.keys(update).length) {
      this.setState(update);
    }
  }
}

EditorWrapper.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  isHover: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  rowPosition: PropTypes.instanceOf(Map).isRequired,
  toolbarNode: PropTypes.node,
  disableDeleteButton: PropTypes.bool
};