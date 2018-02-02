import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, secondaryMenuTitleStyle, checkboxStyle, dropdownStyle, buttonStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';

import SettingsButton from '../icons/SettingsButton';
import Button from '../components/Button';

export default class SelectFieldOptions extends React.Component {

  constructor(props) {
    super(props);

    const { isRequired, fieldType } = props.persistedState.toJS();

    this.state = {
      isRequired: isRequired || false,
      fieldType: fieldType || 'radio',
      isMenuOpen: false
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
    if (nextProps.isActive !== this.props.isActive) {
      update.isMenuOpen = nextProps.isActive;
    }
    if (Object.keys(update).length) {
      this.setState(update);
    }
  }

  render() {
    const { isRequired, fieldType, isMenuOpen } = this.state;
    const { isActive, hasRoomToRenderBelow } = this.props;

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      ...dropdownStyle,
      width: 300,
      animationName: `editor-slide-${(isMenuOpen) ? 'in' : 'out'}-${(hasRoomToRenderBelow) ? 'bottom' : 'top'}`
    };
    if (!hasRoomToRenderBelow) {
      dropdownStyles.bottom = dropdownStyles.top;
      delete dropdownStyles.top;
    }

    const titleStyles = secondaryMenuTitleStyle;

    const row = {
      marginTop: 20
    };

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
        <div style={titleStyles}>Select Field Options</div>
        <div>
          <div style={row}>
            <input id="field-is-required" type="checkbox" style={checkboxStyle} checked={isRequired} onChange={(e) => this.handleIsRequired(e)} />
            <label htmlFor="field-is-required">Required Field</label>
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

  handleSave() {
    const { localState, persistedState, onChange, onToggleActive } = this.props;
    const { isRequired, fieldType } = this.state;

    const newPersistedState = persistedState
      .set('isRequired', isRequired)
      .set('fieldType', fieldType);

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
  isActive: PropTypes.bool.isRequired,
  hasRoomToRenderBelow: PropTypes.bool
};
