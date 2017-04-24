import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Toolbar from '../components/Toolbar';

import LinkButton from '../icons/LinkButton';

export default class Hyperlink extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
      href: props.persistedState.get('href') || '',
      isNewWindow: props.persistedState.get('isNewWindow') || false
    };
  }

  render() {
    const { showDropdown, href, isNewWindow } = this.state;

    const buttonProps = {
      hideBackground: true,
      color: '#303030',
      clickColor: '#333',
      activeColor: '#C0C0C0'
    };

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      padding: 10,
      width: 300
    };

    const titleStyles = {
      textTransform: 'uppercase',
      fontSize: 'smaller',
      color: '#808080',
      marginBottom: 20
    };

    const row = {
      marginTop: 20
    };

    const dropdownNodes = showDropdown ? (
      <Toolbar style={dropdownStyles}>
        <div style={titleStyles}>Create a Link</div>
        <div>
          <div style={row}>
            <label>URL</label>
            <input type="text" value={href} className="form-control" onChange={(e) => this.handleHref(e)} />
          </div>
          <div style={row}>
            <input type="checkbox" checked={isNewWindow} onChange={(e) => this.handleIsNewWindow(e)} />
            <label>Open In New Window</label>
          </div>
          <div style={{textAlign: 'right', ...row}}>
            <button className="btn" onClick={(e) => this.handleSave(e)}>Save</button>
          </div>
        </div>
      </Toolbar>
    ) : null;

    return (
      <div>
        <LinkButton onClick={() => this.toggleDropdown()} {...buttonProps} />
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

  handleIsNewWindow(e) {
    const isNewWindow = e.target.checked;
    this.setState({
      isNewWindow
    });
  }

  handleHref(e) {
    const href = e.target.value;
    this.setState({
      href
    });
  }

  handleSave(e) {
    e.preventDefault();
    const { onChange } = this.props;
    const { isNewWindow, href } = this.state;

    this.setState({
      showDropdown: false
    });

    onChange(href, isNewWindow);
  }

}

Hyperlink.propTypes = {
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
