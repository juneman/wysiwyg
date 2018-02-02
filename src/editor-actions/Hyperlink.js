import React from 'react';
import PropTypes from 'prop-types';

import { getButtonProps, secondaryMenuTitleStyle, checkboxStyle, dropdownStyle, inputStyle, labelStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';

import LinkButton from '../icons/LinkButton';
import Button from '../components/Button';

export default class Hyperlink extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      href: props.href || '',
      isNewWindow: props.isNewWindow || false,
      isMenuOpen: props.isActive || false
    };
  }

  componentWillReceiveProps(nextProps) {
    const update = {};
    if (nextProps.href !== this.props.href) {
      update.href = nextProps.href;
    }
    if (nextProps.isNewWindow !== this.props.isNewWindow) {
      update.isNewWindow = nextProps.isNewWindow;
    }
    if (nextProps.isActive !== this.props.isActive) {
      update.isMenuOpen = nextProps.isActive;
    }
    if (Object.keys(update).length) {
      this.setState(update);
    }
  }

  render() {
    const { isActive, hasRoomToRenderBelow } = this.props;
    const { href, isNewWindow, isMenuOpen } = this.state;

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      ...dropdownStyle,
      width: 300,
      animationName: `editor-slide-${(isMenuOpen) ? 'in' : 'out'}-${(hasRoomToRenderBelow) ? 'bottom' : 'top'}`
    };
    if (!hasRoomToRenderBelow) {
      dropdownStyles.bottom = dropdownStyles.top + 55;
      delete dropdownStyles.top;
    }

    const titleStyles = secondaryMenuTitleStyle;

    const row = {
      marginTop: 20,
      display: 'flex'
    };

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
        <div style={titleStyles}>Create a Link</div>
        <div>
          <div style={{ ...row, flexDirection: 'column' }}>
            <label style={ labelStyle }>URL</label>
            <input autoFocus type="text" style={ inputStyle } value={href} onClickCapture={this.handleClick} onChange={(e) => this.handleHref(e)} />
          </div>
          <div style={{ ...row, alignItems: 'center' }}>
            <input id="link-checkbox" type="checkbox" style={ checkboxStyle } checked={isNewWindow} onChange={(e) => this.handleIsNewWindow(e)} />
            <label htmlFor="link-checkbox">Open In New Window</label>
          </div>
        </div>
      </Menu>
    ) : null;

    return (
      <div>
        <LinkButton onClick={() => this.toggleDropdown()} {...buttonProps} />
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

  handleIsNewWindow(e) {
    const isNewWindow = e.target.checked;
    this.setState({
      isNewWindow
    }, this.handleSave);
  }

  handleClick(e) {
    e.target.focus();
  }

  handleHref(e) {
    const href = e.target.value;
    this.setState({
      href
    }, this.handleSave);
  }

  handleSave() {
    const { onChange, onToggleActive } = this.props;
    const { isNewWindow, href } = this.state;

    onChange(href, isNewWindow);
  }

}

Hyperlink.propTypes = {
  href: PropTypes.string,
  isNewWindow: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  hasRoomToRenderBelow: PropTypes.bool
};
