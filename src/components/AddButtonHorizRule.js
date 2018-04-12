import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import AddButtonContainer from './AddButtonContainer';

// Distance threshold before button repositions to
// opposite side
const BUTTON_POSITION_ALLOWANCE = 100;
const ADD_ROW_EXPANDED = 32;
const ADD_ROW_COLLAPSED = 2;

/**
 * A React component renders an Add button to
 * add a new row to the Canvas
 * @class
 */
export default class AddButtonHorizRule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditorSelector: false,
      isHoveringOverAddButton: false,
      hasRoomToRenderOnRight: true
    };

    this.handleAddNew = this.handleAddNew.bind(this);
  }

  componentDidMount() {
    this.setBoundingBox();
    this.setHasRoomToRenderOnRight();
  }

  componentDidUpdate(prevProps, prevState) {
    const { shouldCloseMenu, resetShouldCloseMenu, onEditorMenuClose } = this.props;
    const { showEditorSelector } = this.state;
    this.setHasRoomToRenderOnRight();

    if (shouldCloseMenu && showEditorSelector) {
      this.setState({ showEditorSelector: false });
      resetShouldCloseMenu();
      onEditorMenuClose();
    }

  }

  render() {
    const { onSelectEditorType, internalAllowedEditorTypes, isHoveringOverContainer } = this.props;
    const { showEditorSelector, isHoveringOverAddButton, hasRoomToRenderOnRight } = this.state;

    let hrStyle = {
      boxSizing: 'border-box',
      height: ADD_ROW_COLLAPSED,
      position: 'absolute',
      top: Math.floor(ADD_ROW_EXPANDED/4),
      width: '100%',
      zIndex: 2,
      padding: 0,
      margin: 0,
      pointerEvents: 'none',
      background: '#d4fee6',
      border: '1px solid #00b850',
      opacity: 0,
      transition: 'height 0.15s ease-out, transform 0s, opacity 0.3s ease-out 0.1s',
      transformOrigin: 'center 25% 0px',
      backfaceVisibility: 'hidden',
      transform: `translateY(-50%) translateZ(0)`
    };

    let addButtonStyle = {
      position: 'absolute',
      top:  Math.floor(ADD_ROW_EXPANDED/4),
      left: '50%',
      cursor: 'pointer',
      zIndex: 10,
      transform: `translateX(-50%) translateY(-50%) scale(0.5)`,
      transformOrigin: 'center center 0px',
      transition: 'transform 0.15s ease-out'
    };

    let containerStyle = {
      boxSizing: 'border-box',
      position: 'relative',
      height: ADD_ROW_COLLAPSED,
      minHeight: ADD_ROW_COLLAPSED,
      pointerEvents: 'none',
      width: '100%',
      left: 0,
      right: 0,
      opacity: 0,
      transition: `opacity 0.15s ease-out, height 0.15s ease-out`,
      zIndex: 100
    };

    if (isHoveringOverAddButton || showEditorSelector) {
      //alter styles to expanded view
      hrStyle = {
        ...hrStyle,
        height: ADD_ROW_EXPANDED,
        border: '2px dashed  #00b850',
        opacity: 1
      };

      addButtonStyle = {
        ...addButtonStyle,
        transformOrigin: 'center center 0px',
        transform: `translateX(-50%) translateY(-50%) scale(1)`
      };

      containerStyle = {
        ...containerStyle,
        height: ADD_ROW_EXPANDED,
      };

    }

    if (isHoveringOverContainer || showEditorSelector) {
      //alter styles whenever a users mouse is over any part of the wysiwyg editor
      hrStyle = {
        ...hrStyle,
        opacity: 0.5
      };

      containerStyle = {
        ...containerStyle,
        opacity: 1
      };
    }



    const wrapperStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
      zIndex: 10,
    };

    return (
      <div className="add-row" style={containerStyle}>
        <div style={wrapperStyle} ref={(el) => this.wrapper = el}>
          <div
            style={addButtonStyle}
            onMouseOver={() => !isHoveringOverAddButton && this.setState({ isHoveringOverAddButton: true })}
            onMouseOut={() => isHoveringOverAddButton && this.setState({ isHoveringOverAddButton: false })}
            ref={(el) => this.addButton = el}
          >
            <AddButtonContainer
              onSelectEditorType={ onSelectEditorType }
              onClick={ this.handleAddNew }
              showEditorSelector={ showEditorSelector }
              internalAllowedEditorTypes={ internalAllowedEditorTypes }
              inverColor={ !isHoveringOverAddButton }
              shadow={false}
            />

          </div>
          <section style={hrStyle}
            onMouseOver={() => !isHoveringOverAddButton && this.setState({ isHoveringOverAddButton: true })}
            onMouseOut={() => isHoveringOverAddButton && this.setState({ isHoveringOverAddButton: false })}/>
        </div>
      </div>
    );
  }

  handleAddNew() {
    const { showEditorSelector } = this.state;
    const { onEditorMenuOpen, onEditorMenuClose } = this.props;

    this.setState({ showEditorSelector: !showEditorSelector });
    if (showEditorSelector) {
        onEditorMenuClose && onEditorMenuClose();
    } else {
        onEditorMenuOpen && onEditorMenuOpen();
    }
  }

  setHasRoomToRenderOnRight() {
    const hasRoomToRenderOnRight = ((window.innerWidth - this.addButton.parentElement.getBoundingClientRect().right) > BUTTON_POSITION_ALLOWANCE);
    if (hasRoomToRenderOnRight != this.state.hasRoomToRenderOnRight){
      this.setState({ hasRoomToRenderOnRight });
    }
  }

  setBoundingBox() {
    if (!this.addButton) {
      return;
    }
  }
}

AddButtonHorizRule.propTypes = {
  onSelectEditorType: PropTypes.func.isRequired,
  internalAllowedEditorTypes: PropTypes.instanceOf(List).isRequired,
  isHoveringOverContainer: PropTypes.bool,
  onEditorMenuOpen: PropTypes.func,
  onEditorMenuClose: PropTypes.func,
  shouldCloseMenu: PropTypes.bool,
  resetShouldCloseMenu: PropTypes.func
};
