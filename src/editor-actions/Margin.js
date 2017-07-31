import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, secondaryMenuTitleStyle, textInputStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';
import Button from '../components/Button';

import MarginButton from '../icons/MarginButton';

export default class Margin extends React.Component {

  constructor(props) {
    super(props);

    const { persistedState } = props;

    this.state = {
      top: persistedState.get('top') || '',
      right: persistedState.get('right') || '',
      bottom: persistedState.get('bottom') || '',
      left: persistedState.get('left') || '',
      isMenuOpen: props.isActive || false
    };
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.isActive !== this.props.isActive) {
      this.setState({
        isMenuOpen: nextProps.isActive
      });
    }
  }

  render() {
    const { top, right, bottom, left, isMenuOpen } = this.state;
    const { isActive, hasRoomToRenderBelow } = this.props;

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      padding: 10,
      width: 300,
      animationName: `editor-slide-${(isMenuOpen) ? 'in' : 'out'}-${(hasRoomToRenderBelow) ? 'bottom' : 'top'}`,
      animationTimingFunction: 'ease-out',
      animationDuration: '0.15s',
      animationIterationCount: 1,
      animationFillMode: 'both'
    };
    if (!hasRoomToRenderBelow) {
      dropdownStyles.bottom = dropdownStyles.top;
      delete dropdownStyles.top;
    }

    const titleStyles = secondaryMenuTitleStyle;

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
        <div style={titleStyles}>Change Surrounding Margin (in pixels)</div>
        <div style={{marginTop: 20}}>
          <div>
            <label>Top:</label><br/>
            <input style={textInputStyle} value={top} placeholder="0" onChange={(e) => this.handleInputChange(e, 'top')} />
          </div>
          <div>
            <label>Right:</label><br/>
            <input style={textInputStyle} value={right} placeholder="0" onChange={(e) => this.handleInputChange(e, 'right')} />
          </div>
          <div>
            <label>Bottom:</label><br/>
            <input style={textInputStyle} value={bottom} placeholder="0" onChange={(e) => this.handleInputChange(e, 'bottom')} />
          </div>
          <div>
            <label>Left:</label><br/>
            <input style={textInputStyle} value={left} placeholder="0" onChange={(e) => this.handleInputChange(e, 'left')} />
          </div>
          <div style={{textAlign: 'right', marginTop: 20}}>
            <Button onClick={(e) => this.handleSave(e)}>Update</Button>
          </div>
        </div>
      </Menu>
    ) : null;

    return (
      <div>
        <a href="#" onClick={(e) => this.toggleDropdown(e)}><MarginButton {...buttonProps} /></a>
        { dropdownNodes }
      </div>
    );
  }

  toggleDropdown(e) {
    e.preventDefault();
    const { onToggleActive, isActive } = this.props;
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });

    if(isActive) {
      setTimeout(() => onToggleActive(!isActive), 200);
    } else {
      onToggleActive(!isActive);
    }
  }

  handleInputChange(e, name) {
    const val = e.currentTarget.value;
    const update = {};
    const parsedNumber = val && val.length ? parseInt(val) : val;

    if (!isNaN(parsedNumber)) {
      update[name] = parsedNumber;
      this.setState(update);
    }
  }

  handleSave(e) {
    if (e) {
      e.preventDefault();
    }
    const { localState, persistedState, onChange, onToggleActive } = this.props;
    const { top, right, bottom, left } = this.state;

    // const newPersistedState = persistedState
    //   .set('width', width)
    //   .delete('widthOverride')
    //   .delete('heightOverride');

    this.setState({
      isMenuOpen: false
    });

    setTimeout(() => onToggleActive(false), 200);

    // onChange({
    //   localState,
    //   persistedState: newPersistedState
    // });
  }

}

Margin.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  hasRoomToRenderBelow: PropTypes.bool
};
