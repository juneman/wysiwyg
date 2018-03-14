import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, secondaryMenuTitleStyle, inputStyle, fieldGroupStyle, labelStyle, dropdownStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';
import ZoomSlider from '../components/ZoomSlider';

import SelectSizeButton from '../icons/SelectSizeButton';

export default class ImageSize extends React.Component {

  constructor(props) {
    super(props);

    const { persistedState } = props;

    this.state = {
      attributeToEdit: this.props.heroImage ? 'minHeight' : 'width',
      minHeight: persistedState.get('minHeight') || '',
      width: persistedState.get('width') || '',
      zoom: persistedState.get('zoom') || '',
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
    const { attributeToEdit, isMenuOpen } = this.state;
    const { isActive, hasRoomToRenderBelow, heroImage } = this.props;

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

    const attributeText = heroImage ? 'Minimum Height' : 'Width';
    const attributeCurrentValue = this.state[attributeToEdit];

    const titleStyles = secondaryMenuTitleStyle;

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
        <div style={titleStyles}>Set Image {attributeText} (number in pixels)</div>
        <div style={{marginTop: 20}}>
          <div style={ fieldGroupStyle }>
            <label style={ labelStyle }>{attributeText}:</label>
            <input style={ inputStyle } value={attributeCurrentValue} placeholder="auto" onChange={(e) => this.handleInputChange(e, this.state.attributeToEdit)} />
            { heroImage && <ZoomSlider handleChange={(e) => this.handleInputChange(e, 'zoom')} zoom={this.state.zoom} /> }
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
    const val = name === 'zoom' ? e.value : e.currentTarget.value;
    const update = {};
    const parsedNumber = val && val.length ? parseInt(val) : val;

    if (!isNaN(parsedNumber)) {
      update[name] = parsedNumber;
      this.setState(update, this.handleSave);
    }
  }

  handleSave() {
    const { localState, persistedState, onChange } = this.props;
    
    const { attributeToEdit } = this.state;

    const newPersistedState = persistedState
      .set(attributeToEdit, this.state[attributeToEdit])
      .set('zoom', this.state.zoom)
      .delete('widthOverride')
      .delete('heightOverride');

    onChange({
      localState,
      persistedState: newPersistedState
    });
  }

}

ImageSize.propTypes = {
  heroImage: PropTypes.bool,
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  hasRoomToRenderBelow: PropTypes.bool
};

ImageSize.defaultProps = {
  heroImage: false
};
