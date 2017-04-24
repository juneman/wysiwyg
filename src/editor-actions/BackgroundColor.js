import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { CompactPicker } from 'react-color';

import Toolbar from '../components/Toolbar';

import ImageButton from '../icons/ImageButton';

export default class BackgroundColor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false
    };
  }

  render() {
    const { showDropdown } = this.state;

    const buttonProps = {
      hideBackground: true,
      color: '#303030',
      clickColor: '#333',
      activeColor: '#C0C0C0'
    };

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0
    };

    const dropdownNodes = showDropdown ? (
      <Toolbar style={dropdownStyles}>
        <CompactPicker onChangeComplete={(color) => this.handleColor(color)} />
      </Toolbar>
    ) : null;

    return (
      <div>
        <ImageButton onClick={() => this.toggleDropdown()} {...buttonProps} />
        { dropdownNodes }
      </div>
    );
  }

  toggleDropdown() {
    const { showDropdown } = this.state;
    this.setState({
      showDropdown: !showDropdown
    });
  }

  handleColor(color) {
    const { localState, persistedState, onChange } = this.props;
    const toggledColor = color.hex;

    const newPersistedState = persistedState.set('backgroundColor', toggledColor);

    this.setState({
      showDropdown: false
    });

    onChange({
      localState,
      persistedState: newPersistedState
    });
  }

}

BackgroundColor.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
