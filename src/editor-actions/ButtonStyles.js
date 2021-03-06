import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, secondaryMenuTitleStyle, shortInputStyle, buttonStyleOptionStyle, labelStyle, dropdownStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';

import AdvancedStylingButton from '../icons/AdvancedStylingButton';
import Button from '../components/Button';

export default class ButtonStyles extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      borderRadius: props.persistedState.get('borderRadius') || 3,
      padding: props.persistedState.get('padding'),
      fontSize: props.persistedState.get('fontSize') || 14,
      width: props.persistedState.get('width') || 110,
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
    const { borderRadius, padding, fontSize, width, isMenuOpen } = this.state;
    const { isActive, hasRoomToRenderBelow } = this.props;

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      ...dropdownStyle,
      width: 300,
      animationName: `editor-slide-${(isMenuOpen) ? 'in' : 'out'}-${(hasRoomToRenderBelow) ? 'bottom' : 'top'}`
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
        <div style={titleStyles}>Advanced Button Options (In Pixels)</div>
        <div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div style={buttonStyleOptionStyle}>
              <label style={labelStyle}>Roundness</label>
              <input type="number" style={shortInputStyle} min={0} value={borderRadius} onChange={(e) => this.handleChange(e, 'borderRadius')} onClick={(e) => this.handleClick(e)} />
            </div>
            <div style={buttonStyleOptionStyle}>
              <label style={labelStyle}>Padding</label>
              <input type="number" style={shortInputStyle} min={0} value={padding} onChange={(e) => this.handleChange(e, 'padding')} onClick={(e) => this.handleClick(e)} />
            </div>
            <div style={buttonStyleOptionStyle}>
              <label style={labelStyle}>Font Size</label>
              <input type="number" style={shortInputStyle} min={10} value={fontSize} onChange={(e) => this.handleChange(e, 'fontSize')} onClick={(e) => this.handleClick(e)} />
            </div>
            <div style={buttonStyleOptionStyle}>
              <label style={labelStyle}>Width</label>
              <input type="number" style={shortInputStyle} min={25} value={width} onChange={(e) => this.handleChange(e, 'width')} onClick={(e) => this.handleClick(e)} />
            </div>
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

}

ButtonStyles.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};
