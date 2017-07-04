import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, secondaryMenuTitleStyle, textInputStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';
import Button from '../components/Button';

import SelectSizeButton from '../icons/SelectSizeButton';

export default class ImageSize extends React.Component {

  constructor(props) {
    super(props);

    const { persistedState } = props;

    this.state = {
      width: persistedState.get('width') || ''
    };
  }

  render() {
    const { width } = this.state;
    const { isActive, hasRoomToRenderBelow } = this.props;

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      padding: 10,
      width: 300
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
          <div>
            <label>Width:</label><br/>
            <input style={textInputStyle} value={width} placeholder="auto" onChange={(e) => this.handleInputChange(e, 'width')} />
          </div>
          <div style={{textAlign: 'right', marginTop: 20}}>
            <Button onClick={(e) => this.handleSave(e)}>Update</Button>
          </div>
        </div>
      </Menu>
    ) : null;

    return (
      <div>
        <a href="#" onClick={() => this.toggleDropdown()}><SelectSizeButton {...buttonProps} /></a>
        { dropdownNodes }
      </div>
    );
  }

  toggleDropdown() {
    const { onToggleActive, isActive } = this.props;
    onToggleActive(!isActive);
  }

  handleInputChange(e, name) {
    const val = e.currentTarget.value;
    const update = {};
    update[name] = val && val.length ? parseInt(val) : val;
    this.setState(update);
  }

  handleSave(e) {
    if (e) {
      e.preventDefault();
    }
    const { localState, persistedState, onChange, onToggleActive } = this.props;
    const { width } = this.state;

    // Auto scale the height based on the width selected
    const { width: imageWidth } = persistedState.toJS();

    const newPersistedState = persistedState
      .set('width', width)
      .delete('widthOverride')
      .delete('heightOverride');

    onToggleActive(false);

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
  isActive: PropTypes.bool.isRequired
};
