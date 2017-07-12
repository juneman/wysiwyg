import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { CompactPicker } from 'react-color';

import Menu from '../components/Menu';
import { secondaryMenuTitleStyle } from '../helpers/styles/editor';

import SquareButton from '../icons/SquareButton';

export default class BackgroundColor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
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
    const { isActive, persistedState } = this.props;
    const { isMenuOpen } = this.state;

    const selectedColor = persistedState.get('backgroundColor') || '#C0C0C0';
    const buttonProps = {
      hideBackground: true,
      color: selectedColor
    };

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      padding: 5,
      animationName: `editor-slide-${(isMenuOpen) ? 'in' : 'out'}-bottom}`,
      animationTimingFunction: 'ease-out',
      animationDuration: '0.15s',
      animationIterationCount: 1,
      animationFillMode: 'both'
    };

    const titleStyles = secondaryMenuTitleStyle;

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
        <div style={titleStyles}>Select a Background Color</div>
        <CompactPicker
          onChangeComplete={(color) => this.handleColor(color)}
          color={selectedColor}
        />
      </Menu>
    ) : null;

    return (
      <div>
        <SquareButton onClick={() => this.toggleDropdown()} {...buttonProps} />
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
