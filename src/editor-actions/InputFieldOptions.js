import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, secondaryMenuTitleStyle, inputStyle, labelStyle, checkboxStyle, buttonStyle, dropdownStyle } from '../helpers/styles/editor';
import { INPUT_TYPES, INPUT_TYPES_LIST } from '../helpers/constants';
import Menu from '../components/Menu';
import Button from '../components/Button';
import DropDownMenu from '../components/DropDownMenu';
import SettingsButton from '../icons/SettingsButton';

export default class InputFieldOptions extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isRequired: props.persistedState.get('isRequired') || false,
      maxLength: props.persistedState.get('maxLength') || '',
      isMenuOpen: props.isActive || false,
      selectedInputType: props.persistedState.get('inputType') || INPUT_TYPES.TEXT
    };

    this.handleSelectInputType = this.handleSelectInputType.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.isActive !== this.props.isActive) {
      this.setState({
        isMenuOpen: nextProps.isActive
      });
    }
  }

  render() {
    const { isRequired, maxLength, isMenuOpen, selectedInputType } = this.state;
    const { isActive, hasRoomToRenderBelow } = this.props;

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      ...dropdownStyle,
      width: 300,
      zIndex: 15,
      animationName: `editor-slide-${(isMenuOpen) ? 'in' : 'out'}-${(hasRoomToRenderBelow) ? 'bottom' : 'top'}`,
    };
    if (!hasRoomToRenderBelow) {
      dropdownStyles.bottom = dropdownStyles.top;
      delete dropdownStyles.top;
    }

    const titleStyles = secondaryMenuTitleStyle;

    const row = {
      marginTop: 20,
      display: 'flex'
    };

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
        <div style={titleStyles}>Text Field Options</div>

          <div style={row}>
            <input id="field-is-required" type="checkbox" style={checkboxStyle} checked={isRequired} onChange={(e) => this.handleIsRequired(e)} />
            <label htmlFor="field-is-required">Required Field</label>
          </div>
          <div style={{marginTop: 20}}>
            <DropDownMenu
              className="form-control"
              label="Type"
              unsearchable
              selectedValue={ selectedInputType }
              options={ INPUT_TYPES_LIST }
              onSelect={ this.handleSelectInputType }/>
          </div>
          <div style={{ ...row, flexDirection: 'column' }}>
            <label htmlFor="field-max-length" style={ labelStyle }>Maximum Length</label>
            <input id="field-max-length" style={ inputStyle } type="number" min="0" max="1000" step="1" value={maxLength} className="form-control" placeholder="None (Unlimited)" onChange={(e) => this.handleMaxLength(e)} onClick={(e) => this.handleClick(e)} />
          </div>

      </Menu>
    ) : null;

    return (
      <div style={{marginRight: 10}}>
        <SettingsButton
          onClick={() => this.toggleDropdown()}
          text="Field Options"
          {...buttonProps}  />
        { dropdownNodes }
      </div>
    );
  }

  toggleDropdown() {
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

  handleIsRequired(e) {
    const isRequired = e.target.checked;
    this.setState({
      isRequired
    }, this.handleSave);
  }

  handleClick(e) {
    e.target.focus();
  }

  handleSelectInputType(value) {
    this.setState({
      selectedInputType: value
    }, this.handleSave);
  }

  handleMaxLength(e) {
    const maxLength = +e.target.value;
    this.setState({
      maxLength
    }, this.handleSave);
  }

  handleSave() {
    const { localState, persistedState, onChange, onToggleActive } = this.props;
    const { isRequired, maxLength, selectedInputType } = this.state;

    const newPersistedState = persistedState
      .set('isRequired', isRequired)
      .set('maxLength', maxLength)
      .set('inputType', selectedInputType || INPUT_TYPES.TEXT);

    onChange({
      localState,
      persistedState: newPersistedState
    });
  }

}

InputFieldOptions.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  hasRoomToRenderBelow: PropTypes.bool
};
