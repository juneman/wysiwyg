import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { CompactPicker } from 'react-color';

import Menu from '../components/Menu';
import { getButtonProps, secondaryMenuTitleStyle } from '../helpers/styles/editor';

import ImageButton from '../icons/ImageButton';

export default class BackgroundColor extends React.Component {

  render() {
    const { isActive } = this.props;

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      padding: 5
    };

    const titleStyles = secondaryMenuTitleStyle;

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
        <div style={titleStyles}>Select a Background Color</div>
        <CompactPicker onChangeComplete={(color) => this.handleColor(color)} />
      </Menu>
    ) : null;

    return (
      <div>
        <ImageButton onClick={() => this.toggleDropdown()} {...buttonProps} />
        { dropdownNodes }
      </div>
    );
  }

  toggleDropdown() {
    const { onToggleActive, isActive } = this.props;
    onToggleActive(!isActive);
  }

  handleColor(color) {
    const { localState, persistedState, onChange } = this.props;
    const toggledColor = color.hex;

    const newPersistedState = persistedState.set('backgroundColor', toggledColor);

    onChange({
      localState,
      persistedState: newPersistedState
    });
  }

}

BackgroundColor.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};
