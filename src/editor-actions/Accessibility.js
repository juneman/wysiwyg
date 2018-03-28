import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { getButtonProps, secondaryMenuTitleStyle, inputStyle, fieldGroupStyle, labelStyle, dropdownStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';
import AccessibilityButton from '../icons/AccessibilityButton';

export default class Accessibility extends React.Component {

  constructor(props) {
    super(props);

    const { persistedState } = props;

    this.state = {
      altText: persistedState.get('altText') || ''
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
    const { isMenuOpen, altText } = this.state;
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
        <div style={titleStyles}>Accessibility Options</div>
        <div style={{marginTop: 20}}>
          <div>
            <label style={ labelStyle }>Set Alt Text:</label>
            <input style={ inputStyle } value={altText} onChange={(e) => this.handleTextInputChange(e, 'altText')}/>
          </div>
        </div>
      </Menu>
    ) : null;

    return (
      <div>
        <a href="#" onClick={(e) => this.toggleDropdown(e)}><AccessibilityButton {...buttonProps} /></a>
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

  handleTextInputChange(e, name) {
    const val = e.currentTarget.value;
    this.setState({altText: val}, this.handleSave);
  }

  handleSave() {
    const { localState, persistedState, onChange } = this.props;

    const newPersistedState = persistedState
      .set('altText', this.state.altText)

    onChange({
      localState,
      persistedState: newPersistedState
    });
  }

}

Accessibility.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  hasRoomToRenderBelow: PropTypes.bool
};
