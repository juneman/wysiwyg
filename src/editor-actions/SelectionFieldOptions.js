import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Toolbar from '../components/Toolbar';

import SettingsButton from '../icons/SettingsButton';

export default class SelectFieldOptions extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
      isRequired: false,
      isMultiselect: false,
      maxLength: null
    };
  }

  render() {
    const { showDropdown, isRequired, isMultiselect } = this.state;

    const buttonProps = {
      hideBackground: true,
      color: '#303030',
      clickColor: '#333',
      activeColor: '#C0C0C0'
    };

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      padding: 10,
      width: 300
    };

    const titleStyles = {
      textTransform: 'uppercase',
      fontSize: 'smaller',
      color: '#808080',
      marginBottom: 20
    };

    const row = {
      marginTop: 20
    };

    const dropdownNodes = showDropdown ? (
      <Toolbar style={dropdownStyles}>
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
      </Toolbar>
    ) : null;

    return (
      <div>
        <a href="#" onClick={(e) => this.toggleDropdown(e)}><SettingsButton {...buttonProps} /> Field Options</a>
        { dropdownNodes }
      </div>
    );
  }

  toggleDropdown(e) {
    e.preventDefault();
    const { showDropdown } = this.state;
    this.setState({
      showDropdown: !showDropdown
    });
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

  handleCancel(e) {
    e.preventDefault();
    this.setState({
      showDropdown: false
    });
  }

  handleSave(e) {
    e.preventDefault();
    const { localState, persistedState, onChange } = this.props;
    const { isRequired, isMultiselect } = this.state;

    const newPersistedState = persistedState
      .set('isRequired', isRequired)
      .set('isMultiselect', isMultiselect);

    this.setState({
      showDropdown: false
    });
      
    onChange({
      localState,
      persistedState: newPersistedState
    });
  }

}

SelectFieldOptions.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
