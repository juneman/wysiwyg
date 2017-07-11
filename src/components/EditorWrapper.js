import React from 'react';
import PropTypes from 'prop-types';
import tinyColor from 'tinycolor2';
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

    const applyAnimationWithDelay = (delay, styles={}) => {
      return Object.assign(styles, {
        animationName: 'editor-slide-in',
        animationTimingFunction: 'ease-out',
        animationDuration: `${0.15 + delay}s`,
        animationIterationCount: 1,
        animationDirection: 'normal',
        animationFillMode: 'both',
        animationDelay: `${delay}s`
      });
    };

    let buttons;

    if (isEditing) {
      buttons = (
        <div className="editing">
          {children}
          <div name="EditorWrapperEditingActionsContainer" style={{ position: 'absolute', bottom: -50, left: -20, marginTop: 10, display: 'flex' }}>
            { toolbarNode &&
              <div name="EditorWrapperEditingToolbar" style={applyAnimationWithDelay(0, toolbarStyles) } ref={(el) => this.toolbar = el}>
                { toolbarNode }
              </div>
            }
            <div name="EditorWrapperEditingActions" style={editingButtonStyles}>
              <OkButton
                style={ applyAnimationWithDelay(0.05, {marginRight: 5}) }
                shadow={true}
                color="#00b850"
                hoverColor={tinyColor("#00b850").lighten(5).toHexString()}
                onClick={ onSave } />
              <CancelButton
                style={applyAnimationWithDelay(0.1, {marginRight: 5, opacity: 0.8})}
                secondary
                shadow={true}
                color="#eee"
                hoverColor={tinyColor("#eee").lighten(5).toHexString()}
                onClick={() => onCancel()} />
              { (disableDeleteButton) ? null : <DeleteButton secondary style={applyAnimationWithDelay(0.15, {marginRight: 5})} shadow={true} color="#eb6e5e"hoverColor={tinyColor("#eb6e5e").lighten(5).toHexString()} onClick={() => onRemove()} /> }
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
              hoverColor={tinyColor("#f4ad42").lighten(5).toHexString()}
              onClick={() => onEdit()}
            />
          </div>
          {children}
        </div>
      );
    }

    return (
      <div name="EditorWrapper" className="zone-content" ref={(el) => this.wrapper = el}>
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
