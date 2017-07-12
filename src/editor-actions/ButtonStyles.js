import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, secondaryMenuTitleStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';

import AdvancedStylingButton from '../icons/AdvancedStylingButton';

export default class ButtonStyles extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      borderRadius: props.persistedState.get('borderRadius') || '',
      padding: props.persistedState.get('padding') || '',
      fontSize: props.persistedState.get('fontSize') || '',
      width: props.persistedState.get('width') || '',
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
    const { isActive } = this.props;

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      padding: 10,
      width: 300
    };

    const titleStyles = secondaryMenuTitleStyle;

    const commonProps = {
      className: 'form-control',
      onClick: (e) => this.handleClick(e)
    };

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles} isMenuOpen={isMenuOpen}>
        <div style={titleStyles}>Advanced Button Options</div>
        <div style={{display: 'grid', gridGap: 10}}>
          <div style={{gridColumn: 1, gridRow: 1}}>
            <label>Border Radius</label>
            <input type="text" value={borderRadius} onChange={(e) => this.handleChange(e, 'borderRadius')} {...commonProps} />
          </div>
          <div style={{gridColumn: 2, gridRow: 1}}>
            <label>Padding</label>
            <input type="text" value={padding} onChange={(e) => this.handleChange(e, 'padding')} {...commonProps} />
          </div>
          <div style={{gridColumn: 1, gridRow: 2}}>
            <label>Font Size</label>
            <input type="text" value={fontSize} onChange={(e) => this.handleChange(e, 'fontSize')} {...commonProps} />
          </div>
          <div style={{gridColumn: 2, gridRow: 2}}>
            <label>Width</label>
            <input type="text" value={width} onChange={(e) => this.handleChange(e, 'width')} {...commonProps} />
          </div>
          <div style={{gridColumn: '1 / 3', gridRow: 3}}>
            <label>Class Names (sparate by space)</label>
            <input type="text" value={className} onChange={(e) => this.handleChange(e, 'className')} {...commonProps} />
          </div>
          <div style={{gridColumn: '1 / 3', gridRow: 4, textAlign: 'right'}}>
            <button className="btn" onClick={(e) => this.handleSave(e)}>Save</button>
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
    const value = e.target.value;
    const update = {};
    update[field] = value;
    this.setState(update);
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
