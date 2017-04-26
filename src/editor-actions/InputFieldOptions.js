import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, secondaryMenuTitleStyle, textInputStyle, checkboxStyle, buttonStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';

import SettingsButton from '../icons/SettingsButton';

export default class InputFieldOptions extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isRequired: props.persistedState.get('isRequired') || false,
      maxLength: props.persistedState.get('maxLength') || ''
    };
  }

  render() {
    const { isRequired, maxLength } = this.state;
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

    const row = {
      marginTop: 20
    };

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
        <div style={titleStyles}>Text Field Options</div>
        <div>
          <div style={row}>
            <input style={checkboxStyle} type="checkbox" checked={isRequired} onChange={(e) => this.handleIsRequired(e)} />
            <label>Required Field</label>
          </div>
          <div style={row}>
            <label>Maximum Length</label>
            <input style={textInputStyle} type="number" min="0" max="1000" step="1" value={maxLength} className="form-control" placeholder="None (Unlimited)" onChange={(e) => this.handleMaxLength(e)} />
          </div>
          <div style={{textAlign: 'right', ...row}}>
            <button style={buttonStyle} onClick={(e) => this.handleSave(e)}>Save</button>
          </div>
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
    onToggleActive(!isActive);
  }

  handleIsRequired(e) {
    const isRequired = e.target.checked;
    this.setState({
      isRequired
    });
  }

  handleMaxLength(e) {
    const maxLength = +e.target.value;
    this.setState({
      maxLength
    });
  }

  handleSave(e) {
    e.preventDefault();
    const { localState, persistedState, onChange, onToggleActive } = this.props;
    const { isRequired, maxLength } = this.state;

    const newPersistedState = persistedState
      .set('isRequired', isRequired)
      .set('maxLength', maxLength);

    onToggleActive(false);
      
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
  isActive: PropTypes.bool.isRequired
};
