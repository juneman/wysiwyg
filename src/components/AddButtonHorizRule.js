import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { connect } from 'react-redux';

import AddButtonContainer from './AddButtonContainer';

// Distance threshold before button repositions to
// opposite side
const BUTTON_POSITION_ALLOWANCE = 100;
const ADD_ROW_EXPANDED = 32;
const ADD_ROW_COLLAPSED = 2;
const ADD_ZONE_EXPANDED = 32;
const ADD_ZONE_COLLAPSED = 0;

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
      hasRoomToRenderOnRight: true,
      isHorizontalOrientation: props.orientation == 'horizontal',
      win: null
    };

    this.handleAddNew = this.handleAddNew.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount() {
    this.setBoundingBox();
    this.setHasRoomToRenderOnRight();

    this.setState({
      win: this.getWindow()
    });

  }

  componentWillUnmount() {
    const win = this.getWindow();
    if (win) {
        win.removeEventListener('mouseup', this.handleMouseUp);
    }

  }
  getWindow() {
    if (this.wrapper && this.wrapper.ownerDocument) {
      return this.wrapper.ownerDocument.defaultView;
    }
    return null;
  }


  handleMouseUp(e) {
    if(this.wrapper && !this.wrapper.contains(e.path[0])) {
      this.setState({
        showEditorSelector: false
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { shouldCloseMenu, resetShouldCloseMenu, onEditorMenuClose } = this.props;
    const { showEditorSelector, win } = this.state;
    this.setHasRoomToRenderOnRight();

    if (shouldCloseMenu && showEditorSelector) {
      this.setState({ showEditorSelector: false });
      resetShouldCloseMenu();
      onEditorMenuClose();
    }

    if (win) {
      if(prevState.showEditorSelector && !showEditorSelector) {
          win.removeEventListener('mouseup', this.handleMouseUp);
      } else if(!prevState.showEditorSelector && showEditorSelector) {
        win.addEventListener('mouseup', this.handleMouseUp);
      }

    }

  }

  render() {
    const { onSelectEditorType, internalAllowedEditorTypes, isHoveringOverContainer } = this.props;
    const { showEditorSelector, isHoveringOverAddButton, isHorizontalOrientation } = this.state;

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
      transform: 'translateY(-50%) translateZ(0)'
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
      transition: 'opacity 0.15s ease-out, height 0.15s ease-out, transform 0s',
      backfaceVisibility: 'hidden',
      transform: 'translateZ(0)',
      zIndex: 100
    };

    if (!isHorizontalOrientation) {
      hrStyle = {
       ...hrStyle,
        height: '100%',
        top: 0,
        width: ADD_ZONE_COLLAPSED,
        transform: 'translateZ(0) translateX(-1px)',
        transformOrigin: 'center right',
        transition: 'width 0.15s ease-out, transform 0s, opacity 0.3s ease-out 0.1s',
      };

      addButtonStyle = {
        ...addButtonStyle,
        pointerEvents: 'none',
        top: '50%',
        left: null,
        right: 0,
        transform: `translateY(-50%) translateX(37.5%) scale(0.75)`,
        transformOrigin: 'center right'
      };

      containerStyle = {
        ...containerStyle,
        position: 'absolute',
        width: ADD_ZONE_COLLAPSED,
        minWidth: ADD_ZONE_COLLAPSED,
        top: 0,
        right: 2,
        left: null,
        height: '100%',
        minHeight: '100%',
        transition: 'opacity 0.15s ease-out, width 0.15s ease-out, transform 0s',
      };

      if (isHoveringOverAddButton || showEditorSelector) {
        //alter styles to expanded view
          hrStyle = {
            ...hrStyle,
            width: ADD_ZONE_EXPANDED,
            border: '2px dashed  #00b850',
            opacity: 1
          };

          addButtonStyle = {
            ...addButtonStyle,
            transform: `translateY(-50%) translateX(37.5%) scale(1)`
          };

          containerStyle = {
            ...containerStyle,
            zIndex: 110,
            width: ADD_ZONE_EXPANDED,
          };
        }
    } else {
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

      }
    }



    if (isHoveringOverContainer || showEditorSelector) {
      //alter styles whenever a users mouse is over any part of the wysiwyg editor
      hrStyle = {
        ...hrStyle,
        opacity: 0.5
      };

      addButtonStyle = {
        ...addButtonStyle,
        pointerEvents: 'all'
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
        <div style={ (isHorizontalOrientation) ? wrapperStyle : {zIndex: 10}} ref={(el) => this.wrapper = el}>
          <div
            style={addButtonStyle}
            onClick={ this.handleAddNew }
            onMouseOver={() => !isHoveringOverAddButton && this.setState({ isHoveringOverAddButton: true })}
            onMouseOut={() => isHoveringOverAddButton && this.setState({ isHoveringOverAddButton: false })}
            ref={(el) => this.addButton = el}
          >
            <AddButtonContainer
              onSelectEditorType={ onSelectEditorType }
              showEditorSelector={ showEditorSelector }
              smallButton={ !isHorizontalOrientation }
              internalAllowedEditorTypes={ internalAllowedEditorTypes }
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

AddButtonHorizRule.defaultProps ={
  orientation: 'horizontal'
};

AddButtonHorizRule.propTypes = {
  onSelectEditorType: PropTypes.func.isRequired,
  internalAllowedEditorTypes: PropTypes.instanceOf(List).isRequired,
  isHoveringOverContainer: PropTypes.bool,
  onEditorMenuOpen: PropTypes.func,
  onEditorMenuClose: PropTypes.func,
  shouldCloseMenu: PropTypes.bool,
  resetShouldCloseMenu: PropTypes.func,
  orientation: PropTypes.string
};