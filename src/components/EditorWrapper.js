import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { convertBoundingBox } from '../helpers/domHelpers';
import OkButton from '../icons/OkButton';
import EditButton from '../icons/EditButton';
import CancelButton from '../icons/CancelButton';
import DeleteButton from '../icons/DeleteButton';
const MENU_WIDTH_ALLOWANCE = 300;

/**
 * A React component that wraps a Zone component when
 * editing is active. It provides the toolbars for Save/Cancel/etc
 * @class
 */
export default class EditorWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasRoomToRenderRight: true
    };
  }


  componentDidMount() {
    this.setHasRoomToRenderRight();
  }

  componentDidUpdate() {
    this.setHasRoomToRenderRight();
  }

  setHasRoomToRenderRight() {
    const hasRoomToRenderRight = ((window.innerWidth - this.wrapper.getBoundingClientRect().right) > MENU_WIDTH_ALLOWANCE);
    if (hasRoomToRenderRight != this.state.hasRoomToRenderRight){
      this.setState({ hasRoomToRenderRight });
    }
  }

  render() {
    const {
      isEditing,
      isHover,
      children,
      toolbarNode,
      inlineActionsNode,
      onSave,
      onCancel,
      onRemove,
      onEdit,
      disableDeleteButton
    } = this.props;

    const { hasRoomToRenderRight } = this.state;

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

    const editorWrapperStyles = {
      position: 'absolute',
      bottom: -50,
      left: -20,
      marginTop: 10,
      display: 'flex'
    };
    if (!hasRoomToRenderRight) {
      editorWrapperStyles.right = editorWrapperStyles.left;
      delete editorWrapperStyles.left;
    }

    const applyAnimationWithDelay = (delay, styles={}) => ({
      ...styles,
      animationName: 'editor-slide-in-bottom',
      animationTimingFunction: 'ease-out',
      animationDuration: `${0.15 + delay}s`,
      animationIterationCount: 1,
      animationDirection: 'normal',
      animationFillMode: 'both',
      animationDelay: `${delay}s`
    });

    const containerClass = isEditing ? "editing" : (isHover ? "hover" : "");
    return (
      <div name="EditorWrapper" className="zone-content" ref={(el) => this.wrapper = el}>
        <div className={ containerClass }>
          { isHover &&
            <div style={hoverButtonStyles}>
              <EditButton
                shadow={true}
                color="#f4ad42"
                onClick={ onEdit }
              />
            </div>
          }
          {
            children
          }
          { isEditing &&
            <div name="EditorWrapperEditingActionsContainer" style={ editorWrapperStyles }>
              { toolbarNode &&
                <div name="EditorWrapperEditingToolbar" style={ applyAnimationWithDelay(0, toolbarStyles) } ref={(el) => this.toolbar = el}>
                  { toolbarNode }
                </div>
              }
              <div name="EditorWrapperEditingActions" style={ editingButtonStyles }>
                <OkButton
                  style={ applyAnimationWithDelay(0.05, {marginRight: 5}) }
                  shadow={true}
                  color="#00b850"
                  onClick={ onSave } />
                <CancelButton
                  style={applyAnimationWithDelay(0.1, {marginRight: 5, opacity: 0.8})}
                  secondary
                  shadow={true}
                  color="#eee"
                  onClick={ onCancel } />
                { !disableDeleteButton &&
                  <DeleteButton
                    secondary
                    style={ applyAnimationWithDelay(0.15, { marginRight: 5 }) }
                    shadow={ true }
                    color="#eb6e5e"
                    onClick={ onRemove } />
                }
              </div>
            </div>
          }
          { isEditing && inlineActionsNode &&
            <div name="EditorWrapperInlineEditingActions">
              { inlineActionsNode }
            </div>
          }
        </div>
      </div>
    );
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
  inlineActionsNode: PropTypes.node,
  disableDeleteButton: PropTypes.bool
};
