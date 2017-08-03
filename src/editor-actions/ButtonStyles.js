import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, secondaryMenuTitleStyle, textInputStyle, shortInputStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';

import AdvancedStylingButton from '../icons/AdvancedStylingButton';
import Button from '../components/Button';

export default class ButtonStyles extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      borderRadius: props.persistedState.get('borderRadius') || '',
      padding: props.persistedState.get('padding') || 5,
      fontSize: props.persistedState.get('fontSize') || 16,
      width: props.persistedState.get('width') || 100,
      className: props.persistedState.get('className') || '',
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
    const { borderRadius, padding, fontSize, width, className, isMenuOpen } = this.state;
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
      dropdownStyles.bottom = dropdownStyles.top + 55;
      delete dropdownStyles.top;
    }

    const titleStyles = secondaryMenuTitleStyle;

    const commonProps = {
      className: 'form-control',
      onClick: (e) => this.handleClick(e)
    };

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles} isMenuOpen={isMenuOpen}>
        <div style={titleStyles}>Advanced Button Options</div>
        <div>

          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
            <div style={{width: '45%', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{fontSize: '12px', lineHeight: '12px', width: '55px'}}>Border Radius</label>
              <input type="number" style={shortInputStyle} min={0} value={borderRadius} onChange={(e) => this.handleChange(e, 'borderRadius')} onClick={(e) => this.handleClick(e)} />
            </div>
            <div style={{width: '45%', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{fontSize: '12px', lineHeight: '12px', width: '55px'}}>Padding</label>
              <input type="number" style={shortInputStyle} min={0} value={padding} onChange={(e) => this.handleChange(e, 'padding')} onClick={(e) => this.handleClick(e)} />
            </div>
            <div style={{width: '45%', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{fontSize: '12px', lineHeight: '12px', width: '55px'}}>Font Size</label>
              <input type="number" style={shortInputStyle} min={10} value={fontSize} onChange={(e) => this.handleChange(e, 'fontSize')} onClick={(e) => this.handleClick(e)} />
            </div>
            <div style={{width: '45%', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <label style={{fontSize: '12px', lineHeight: '12px', width: '55px'}}>Width</label>
              <input type="number" style={shortInputStyle} min={25} value={width} onChange={(e) => this.handleChange(e, 'width')} onClick={(e) => this.handleClick(e)} />
            </div>
            <div>
              <label>Class Names (separate by space)</label>
              <input type="text" style={textInputStyle} value={className} onChange={(e) => this.handleChange(e, 'className')} onClick={(e) => this.handleClick(e)} />
            </div>
          </div>
          <div style={{gridColumn: '1 / 3', gridRow: 4, textAlign: 'right', marginTop: '10px'}}>
            <Button className="btn" onClick={(e) => this.handleSave(e)}>Save</Button>
          </div>
        </div>
      </Menu>
    ) : null;

    return (
      <div>
        <AdvancedStylingButton onClick={() => this.toggleDropdown() } {...buttonProps} />
        { dropdownNodes }
      </div>
    );
  }

  toggleDropdown() {
    const { onToggleActive, isActive } = this.props;
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
    onToggleActive(!isActive);
  }

  handleChange(e, field) {
    const { onChange, localState, persistedState } = this.props;

    const value = e.target.value;
    const update = {};
    update[field] = value;

    const newPersistedState = persistedState
        .set(field, value);

    this.setState(update);
    onChange({
        localState,
        persistedState: newPersistedState
      });
  }

  handleClick(e) {
    e.target.focus();
  }

  handleSave(e) {
    if (e) {
      e.preventDefault();
    }
    const { localState, persistedState, onChange, onToggleActive } = this.props;

    let newPersistedState = persistedState;

    Object.keys(this.state).forEach((key) => {
      const val = this.state[key];
      if (val && val.length) {
        newPersistedState = newPersistedState.set(key, val);
      } else {
        newPersistedState = newPersistedState.delete(key);
      }
    });

    onToggleActive(false);

    onChange({
      localState,
      persistedState: newPersistedState
    });
  }

}

ButtonStyles.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};
