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

  render() {
    const {
      isEditing,
      isHover,
      children,
      toolbarNode,
      onSave,
      onCancel,
      onRemove,
      onEdit,
      disableDeleteButton
    } = this.props;

    const hoverButtonStyles = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    };

    const editingButtonStyles = {
      whiteSpace: 'nowrap',
      display: 'flex',
      marginLeft: 20
    };

    const toolbarStyles = {
      zIndex: 100
    };

    let buttons;
    
    if (isEditing) {
      buttons = (
        <div className="editing">
          {children}
          <div name="EditorWrapperEditingActionsContainer" style={{ position: 'absolute', bottom: -50, left: -20, marginTop: 10, display: 'flex' }}>
            { toolbarNode &&
              <div name="EditorWrapperEditingToolbar" style={ toolbarStyles } ref={(el) => this.toolbar = el}>
                { toolbarNode }
              </div>
            }
            <div name="EditorWrapperEditingActions" style={editingButtonStyles}>
              <OkButton style={{marginRight: 5}} shadow={true} color="#00b850" onClick={ onSave } />
              <CancelButton style={{marginRight: 5}} secondary shadow={true} color="rgba(255, 255, 255, 0.8)" onClick={() => onCancel()} />
              { (disableDeleteButton) ? null : <DeleteButton secondary shadow={true} color="#eb6e5e" onClick={() => onRemove()} /> }
            </div>
          </div>
        </div>
      );
    } else if (isHover) {
      buttons = (
        <div className="hover">
          <div style={hoverButtonStyles}>
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
      <div name="EditorWrapper" className="content" ref={(el) => this.wrapper = el}>
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
  zonePosition: PropTypes.instanceOf(Map).isRequired,
  toolbarNode: PropTypes.node,
  disableDeleteButton: PropTypes.bool
};
