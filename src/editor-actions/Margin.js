import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, secondaryMenuTitleStyle, shortInputStyle, marginBoxStyle, marginBoxRowStyle, dropdownStyle } from '../helpers/styles/editor';
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
    const { isActive } = this.props;
    const { marginTop, marginRight, marginBottom, marginLeft } = this.state;

    if (nextProps.isActive !== isActive) {
      this.setState({
        isMenuOpen: nextProps.isActive
      });
    };

    const nextMarginTop = nextProps.persistedState.get('marginTop');
    const nextMarginRight = nextProps.persistedState.get('marginRight');
    const nextMarginBottom = nextProps.persistedState.get('marginBottom');
    const nextMarginLeft = nextProps.persistedState.get('marginLeft');

    if (nextMarginTop !== marginTop) {
      this.setState({
        marginTop: nextMarginTop
      });
    }
    if (nextMarginRight !== marginRight) {
      this.setState({
        marginRight: nextMarginRight
      });
    }
    if (nextMarginBottom !== marginBottom) {
      this.setState({
        marginBottom: nextMarginBottom
      });
    }
    if (nextMarginLeft !== marginLeft) {
      this.setState({
        marginLeft: nextMarginLeft
      });
    }
  }

  render() {
    const { marginTop, marginRight, marginBottom, marginLeft, isMenuOpen } = this.state;
    const { isActive, hasRoomToRenderBelow } = this.props;

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      ...dropdownStyle,
      width: 340,
      animationName: `editor-slide-${(isMenuOpen) ? 'in' : 'out'}-${(hasRoomToRenderBelow) ? 'bottom' : 'top'}`,
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <label style={{ marginRight: 5 }}>Top: </label>
            <input autoFocus style={shortInputStyle} value={marginTop} type='number' max={200} placeholder="0" onClickCapture={this.handleClick} onChange={(e) => this.handleInputChange(e, 'marginTop')} />
          </div>
          <div className='row' style={marginBoxRowStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <label style={{ marginRight: 5 }}>Left: </label>
              <input style={shortInputStyle} value={marginLeft} type='number' max={100} placeholder="0" onClickCapture={this.handleClick} onChange={(e) => this.handleInputChange(e, 'marginLeft')} />
            </div>
            <div style={marginBoxStyle}>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <label style={{ marginRight: 5 }}>Right: </label>
              <input style={shortInputStyle} value={marginRight} type='number' max={100} placeholder="0" onClickCapture={this.handleClick} onChange={(e) => this.handleInputChange(e, 'marginRight')} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
            <label style={{ marginRight: 5 }}>Bottom: </label>
            <input style={shortInputStyle} value={marginBottom} type='number' max={200} placeholder="0" onClickCapture={this.handleClick} onChange={(e) => this.handleInputChange(e, 'marginBottom')} />
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

  handleClick(e) {
    e.target.focus();
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
