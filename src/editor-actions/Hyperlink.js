import React from 'react';
import PropTypes from 'prop-types';

import { getButtonProps, secondaryMenuTitleStyle, checkboxStyle, textInputStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';

import LinkButton from '../icons/LinkButton';
import Button from '../components/Button';

export default class Hyperlink extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      href: props.href || '',
      isNewWindow: props.isNewWindow || false
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
    if (Object.keys(update).length) {
      this.setState(update);
    }
  }

  render() {
    const { isActive, hasRoomToRenderBelow } = this.props;
    const { href, isNewWindow } = this.state;

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

    const row = {
      marginTop: 20
    };

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
        <div style={titleStyles}>Create a Link</div>
        <div>
          <div style={row}>
            <label>URL</label>
            <input autoFocus type="text" style={textInputStyle} value={href} onClickCapture={this.handleClick} onChange={(e) => this.handleHref(e)} />
          </div>
          <div style={row}>
            <input id="link-checkbox" type="checkbox" style={checkboxStyle} checked={isNewWindow} onChange={(e) => this.handleIsNewWindow(e)} />
            <label htmlFor="link-checkbox">Open In New Window</label>
          </div>
          <div style={{textAlign: 'right', ...row}}>
            <Button className="btn" onClick={(e) => this.handleSave(e)}>Save</Button>
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
    onToggleActive(!isActive);
  }

  handleIsNewWindow(e) {
    const isNewWindow = e.target.checked;
    this.setState({
      isNewWindow
    });
  }

  handleClick(e) {
    e.target.focus();
  }

  handleHref(e) {
    const href = e.target.value;
    this.setState({
      href
    });
  }

  handleSave(e) {
    if (e) {
      e.preventDefault();
    }
    const { onChange, onToggleActive } = this.props;
    const { isNewWindow, href } = this.state;

    onToggleActive(false);

    onChange(href, isNewWindow);
  }

}

Hyperlink.propTypes = {
  href: PropTypes.string,
  isNewWindow: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};
