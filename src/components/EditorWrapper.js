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
    const { position, toolbarPosition } = this.state;
    const {
      isEditing,
      isHover,
      children,
      rowPosition,
      zonePosition,
      toolbarNode,
      onSave,
      onCancel,
      onRemove,
      onEdit,
      disableDeleteButton
    } = this.props;

    const { height: rowHeight = 0 } = rowPosition.toJS();
    const { height: zoneHeight = 0 } = zonePosition.toJS();
    const { width: posWidth = 0 } = position.toJS();
    const { width: toolbarWidth = 0 } = toolbarPosition.toJS();

    const hoverButtonStyles = {
      position: 'absolute',
      width: posWidth,
      height: zoneHeight,
      top: 0,
      left: 0,
      zIndex: 100
    };

    const innerButtonStyle = {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    };

    const editingButtonStyles = {
      position: 'absolute',
      left: toolbarWidth + 20,
      top: rowHeight + 10,
      whiteSpace: 'nowrap'
    };

    const toolbarStyles = {
      position: 'absolute',
      left: 0,
      top: rowHeight + 10,
      zIndex: 100
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
        <div className="hover" style={{position: 'relative'}}>
          <div style={hoverButtonStyles}>
            <div style={innerButtonStyle}>
              <EditButton
                shadow={true}
                color="#f4ad42"
                onClick={() => onEdit()}
              />
            </div>
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
  zonePosition: PropTypes.instanceOf(Map).isRequired,
  toolbarNode: PropTypes.node,
  disableDeleteButton: PropTypes.bool
};
