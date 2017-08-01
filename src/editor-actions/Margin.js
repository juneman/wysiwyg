import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, secondaryMenuTitleStyle, shortInputStyle, marginBoxStyle, marginBoxRowStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';
import Button from '../components/Button';

import MarginButton from '../icons/MarginButton';

export default class Margin extends React.Component {

  constructor(props) {
    super(props);

    const { persistedState } = props;

    this.state = {
      marginTop: persistedState.get('marginTop') || '',
      marginRight: persistedState.get('marginRight') || '',
      marginBottom: persistedState.get('marginBottom') || '',
      marginLeft: persistedState.get('marginLeft') || '',
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
    const { marginTop, marginRight, marginBottom, marginLeft, isMenuOpen } = this.state;
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
        <div style={titleStyles}>Surrounding Margin (in pixels)</div>
        <div style={{marginTop: 0}}>
          <div style={{textAlign: 'center'}}>
            <label>Top: </label>
            <input autoFocus style={shortInputStyle} value={marginTop} type='number' max={200} placeholder="0" onChange={(e) => this.handleInputChange(e, 'marginTop')} />
          </div>
          <div className='row' style={marginBoxRowStyle}>
            <div style={{width: '33%'}}>
              <label>Left: </label>
              <input style={shortInputStyle} value={marginLeft} type='number' max={100} placeholder="0" onChange={(e) => this.handleInputChange(e, 'marginLeft')} />
            </div>
            <div style={marginBoxStyle}>
            </div>
            <div style={{width: '33%'}}>
              <label>Right: </label>
              <input style={shortInputStyle} value={marginRight} type='number' max={100} placeholder="0" onChange={(e) => this.handleInputChange(e, 'marginRight')} />
            </div>
          </div>
          <div style={{textAlign: 'center', marginBottom: '10px'}}>
            <label>Bottom: </label>
            <input style={shortInputStyle} value={marginBottom} type='number' max={200} placeholder="0" onChange={(e) => this.handleInputChange(e, 'marginBottom')} />
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
    const { onChange, localState, persistedState, onToggleActive } = this.props;
    const val = e.currentTarget.value;
    const update = {};
    const parsedNumber = val && val.length ? parseInt(val) : val;

    if (!isNaN(parsedNumber)) {
      update[name] = parsedNumber;

      const newPersistedState = persistedState
        .set(name, parsedNumber)

      this.setState(update);

      onChange({
        localState,
        persistedState: newPersistedState
      });
    }
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
