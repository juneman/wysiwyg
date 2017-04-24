import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { convertBoundingBox } from '../helpers/domHelpers';
import OkButton from '../icons/OkButton';
import EditButton from '../icons/EditButton';
import CancelButton from '../icons/CancelButton';
import DeleteButton from '../icons/DeleteButton';
import MoveVertButton from '../icons/MoveVertButton';

export default class EditorWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: Map()
    };
  }

  componentDidMount() {
    this.setBoundingBox();
  }

  componentDidUpdate() {
    this.setBoundingBox();
  }

  render() {
    const { position } = this.state;
    const {
      isEditing,
      isHover,
      children,
      zonePosition,
      toolbarNode,
      onSave,
      onCancel,
      onRemove,
      onMoveRowStart,
      onMoveRowEnd,
      onEdit
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
      left: zonePosition.get('right') - 150,
      top: zonePosition.get('bottom') + 5
    };

    const toolbarStyles = {
      position: 'absolute',
      left: zonePosition.get('left'),
      top: zonePosition.get('bottom')
    };

    let buttons;
    
    if (isEditing) {
      buttons = (
        <div>
          {children}
          <div style={editingButtonStyles}>
            <OkButton shadow={true} color="#0bdc66" onClick={() => onSave()} />
            <CancelButton shadow={true} color="#C0C0C0" onClick={() => onCancel()} />
            <DeleteButton shadow={true} color="#FF0000" onClick={() => onRemove()} />
          </div>
          { (toolbarNode) ? (
            <div style={toolbarStyles}>
              { toolbarNode }
            </div>
          ) : null}
        </div>
      );
    } else if (isHover) {
      buttons = (
        <div className="edit">
          <div style={hoverButtonStyles}>
            <MoveVertButton
              shadow={true}
              color="#cebea5"
              cursor="ns-resize"
              onMouseDown={() => onMoveRowStart()}
              onMouseUp={() => onMoveRowEnd()}
            />
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
      <div ref={(el) => this.wrapper = el}>
        {(buttons) ? buttons : children}
      </div>
    );
  }

  setBoundingBox() {
    if (!this.wrapper) {
      return;
    }
    const position = convertBoundingBox(this.wrapper.getBoundingClientRect());
    if (!position.equals(this.state.position)) {
      this.setState({position});
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
  onMoveRowStart: PropTypes.func.isRequired,
  onMoveRowEnd: PropTypes.func.isRequired,
  zonePosition: PropTypes.instanceOf(Map).isRequired,
  toolbarNode: PropTypes.node
};