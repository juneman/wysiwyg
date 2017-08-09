import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, secondaryMenuTitleStyle, inputStyle, fieldGroupStyle, labelStyle, dropdownStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';
import Button from '../components/Button';

import SelectSizeButton from '../icons/SelectSizeButton';

export default class ImageSize extends React.Component {

  constructor(props) {
    super(props);

    const { persistedState } = props;

    this.state = {
      width: persistedState.get('width') || '',
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
    const { width, isMenuOpen } = this.state;
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

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
        <div style={titleStyles}>Set Image Width (number in pixels)</div>
        <div style={{marginTop: 20}}>
          <div style={ fieldGroupStyle }>
            <label style={ labelStyle }>Width:</label>
            <input style={ inputStyle } value={width} placeholder="auto" onChange={(e) => this.handleInputChange(e, 'width')} />
          </div>
          <div style={{textAlign: 'right', marginTop: 20}}>
            <Button onClick={(e) => this.handleSave(e)}>Update</Button>
          </div>
        </div>
      </Menu>
    ) : null;

    return (
      <div>
        <a href="#" onClick={(e) => this.toggleDropdown(e)}><SelectSizeButton {...buttonProps} /></a>
        { dropdownNodes }
      </div>
    );
  }

  toggleDropdown(e) {
    e.preventDefault();
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

  handleInputChange(e, name) {
    const val = e.currentTarget.value;
    const update = {};
    const parsedNumber = val && val.length ? parseInt(val) : val;

    if (!isNaN(parsedNumber)) {
      update[name] = parsedNumber;
      this.setState(update);
    }
  }

  handleSave(e) {
    if (e) {
      e.preventDefault();
    }
    const { localState, persistedState, onChange, onToggleActive } = this.props;
    const { width } = this.state;

    const newPersistedState = persistedState
      .set('width', width)
      .delete('widthOverride')
      .delete('heightOverride');

    this.setState({
      isMenuOpen: false
    });

    setTimeout(() => onToggleActive(false), 200);

    onChange({
      localState,
      persistedState: newPersistedState
    });
  }

}

ImageSize.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  hasRoomToRenderBelow: PropTypes.bool
};
