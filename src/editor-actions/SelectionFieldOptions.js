import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, secondaryMenuTitleStyle, checkboxStyle, dropdownStyle, buttonStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';

import SettingsButton from '../icons/SettingsButton';

export default class SelectFieldOptions extends React.Component {

  constructor(props) {
    super(props);

    const { isRequired, fieldType } = props.persistedState.toJS();

    this.state = {
      isRequired: isRequired || false,
      fieldType: fieldType || 'radio'
    };
  }

  componentWillReceiveProps(nextProps) {
    const update = {};
    const { isRequired, fieldType } = this.props.persistedState.toJS();
    const { isRequired: isRequiredNew, fieldType: fieldTypeNew } = nextProps.persistedState.toJS();

    if (isRequired !== isRequiredNew) {
      update.isRequired = isRequiredNew;
    }
    if (fieldType !== fieldTypeNew) {
      update.fieldType = fieldTypeNew;
    }
    if (Object.keys(update).length) {
      this.setState(update);
    }
  }

  render() {
    const { isRequired, fieldType } = this.state;
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
        <div style={titleStyles}>Select Field Options</div>
        <div>
          <div style={row}>
            <input type="checkbox" style={checkboxStyle} checked={isRequired} onChange={(e) => this.handleIsRequired(e)} />
            <label>Required Field</label>
          </div>
          <div style={row}>
            <label>Allow Multiple Selections</label>
            <select style={dropdownStyle} value={fieldType} onChange={(e) => this.handleChangeFieldType(e)}>
              <option value="radio">Radio Buttons</option>
              <option value="checkbox">Checkboxes</option>
              <option value="dropdown">Dropdown List</option>
            </select>
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

  handleChangeFieldType(e) {
    const fieldType = e.target.value;
    this.setState({
      fieldType
    });
  }

  handleSave(e) {
    e.preventDefault();
    const { localState, persistedState, onChange, onToggleActive } = this.props;
    const { isRequired, fieldType } = this.state;

    const newPersistedState = persistedState
      .set('isRequired', isRequired)
      .set('fieldType', fieldType);

    onToggleActive(false);
      
    onChange({
      localState,
      persistedState: newPersistedState
    });
  }

}

SelectFieldOptions.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};
