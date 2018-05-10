import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { DropTarget } from 'react-dnd';

import { DRAGABLE_ITEMS } from '../helpers/constants';
import { colors } from '../helpers/styles/editor';

import AddButtonContainer from './AddButtonContainer';

// Distance threshold before button repositions to
// opposite side
const ADD_ROW_EXPANDED = 40;
const ADD_ROW_COLLAPSED = 2;
const ADD_ZONE_EXPANDED = 32;
const ADD_ZONE_COLLAPSED = 0;

/**
 * A React component renders an Add button to
 * add a new row to the Canvas
 * @class
 */
class AddButtonHorizRule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditorSelector: false,
      isHoveringOverAddButton: false,
      isHorizontalOrientation: props.orientation == 'horizontal',
      win: null
    };

    this.handleAddNew = this.handleAddNew.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setBoundingBox();
    this.setState({
      win: this.getWindow()
    });

  }

  componentWillUnmount() {
    const win = this.getWindow();
    if (win) {
        win.removeEventListener('click', this.handleClick, true);
    }

  }
  getWindow() {
    if (this.wrapper && this.wrapper.ownerDocument) {
      return this.wrapper.ownerDocument.defaultView;
    }
    return null;
  }


  handleClick(e) {
    const { onEditorMenuClose, resetShouldCloseMenu } = this.props;
    if(this.wrapper && !this.wrapper.contains(e.path[0])) {
      this.setState({
        showEditorSelector: false
      });

      if (!e.path.find((pathItem) => pathItem.className === "add-row")) {
        resetShouldCloseMenu();
        onEditorMenuClose && onEditorMenuClose();
      }
    }


  }

  componentDidUpdate(prevProps, prevState) {
    const { shouldCloseMenu, resetShouldCloseMenu, onEditorMenuClose } = this.props;
    const { showEditorSelector, win } = this.state;

    if (shouldCloseMenu && showEditorSelector) {
      this.setState({ showEditorSelector: false });
      resetShouldCloseMenu();
      onEditorMenuClose();
    }

    if (win) {
      if(prevState.showEditorSelector && !showEditorSelector) {
        win.removeEventListener('click', this.handleClick, true);
      } else if(!prevState.showEditorSelector && showEditorSelector) {
        win.addEventListener('click', this.handleClick, true);
      }

    }

  }

  render() {
    const { onSelectEditorType, internalAllowedEditorTypes, isHoveringOverContainer, connectDropTarget, canDrop, isOver } = this.props;
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
      border: `1px solid ${colors.green}`,
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
      position: 'absolute',
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
            border: `2px dotted  ${colors.green}`,
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
      if (isHoveringOverAddButton || showEditorSelector  || (canDrop && isOver)) {
        //alter styles to expanded view
          hrStyle = {
            ...hrStyle,
            height: ADD_ROW_EXPANDED,
            border: `2px dashed  ${colors.green}`,
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

    return connectDropTarget(
      <div className="add-row" style={containerStyle}>
        <div style={ (isHorizontalOrientation) ? wrapperStyle : {zIndex: 10} } ref={(el) => this.wrapper = el}>
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
  orientation: PropTypes.string,
  connectDropTarget: PropTypes.func,
  isOver: PropTypes.bool,
  canDrop: PropTypes.bool
};


const zoneTarget = {
  canDrop(props) {
    return props.orientation !== 'vertical' && props.moveZoneToNewRow !== undefined;
  },
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    targetProps.moveZoneToNewRow(sourceProps.row, sourceProps.zone);
  }
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

export default DropTarget(DRAGABLE_ITEMS.ZONE, zoneTarget, collectTarget)(AddButtonHorizRule);