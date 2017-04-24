import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, secondaryMenuTitleStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';

import SettingsButton from '../icons/SettingsButton';

export default class SelectFieldOptions extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isRequired: false,
      isMultiselect: false,
      maxLength: null
    };
  }

  render() {
    const { isRequired, isMultiselect } = this.state;
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
            <input type="checkbox" checked={isRequired} onChange={(e) => this.handleIsRequired(e)} />
            <label>Required Field</label>
          </div>
          <div style={row}>
            <input type="checkbox" checked={isMultiselect} onChange={(e) => this.handleIsMultiselect(e)} />
            <label>Allow Multiple Selections</label>
          </div>
          <div style={{textAlign: 'right', ...row}}>
            <button className="btn" onClick={(e) => this.handleSave(e)}>Save</button>
          </div>
        </div>
      </Menu>
    ) : null;

    return (
      <div>
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

  handleIsMultiselect(e) {
    const isMultiselect = e.target.checked;
    this.setState({
      isMultiselect
    });
  }

  handleSave(e) {
    e.preventDefault();
    const { localState, persistedState, onChange, onToggleActive } = this.props;
    const { isRequired, isMultiselect } = this.state;

    const newPersistedState = persistedState
      .set('isRequired', isRequired)
      .set('isMultiselect', isMultiselect);

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
