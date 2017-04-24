import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { RichUtils } from 'draft-js';

import Toolbar from '../components/Toolbar';

import UserPropertyButton from '../icons/UserPropertyButton';

export default class UserProperty extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false
    };
  }

  render() {
    const { showDropdown } = this.state;
    const { userProperties } = this.context;

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

    // Leave blank if nothing
    if (!userProperties || !userProperties.length) {
      return (<div></div>);
    }

    const userPropertiesDropdown = (userProperties).map((userProperty) => {
      return userProperty;
    });

    const dropdownNodes = showDropdown ? (
      <Toolbar style={dropdownStyles}>
        <div style={titleStyles}>Insert a User Property</div>
        <select className="form-control" onChange={(e) => this.handleSave(e)}>
          { userPropertiesDropdown.map((userProperty) => {
            return (
              <option key={userProperty.value} value={userProperty.value}>{userProperty.name}</option>
            );
          })}
        </select>
      </Toolbar>
    ) : null;

    return (
      <div>
        <UserPropertyButton onClick={() => this.toggleDropdown()} {...buttonProps} />
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

  handleSave(e) {
    e.preventDefault();
    const { localState, persistedState, onChange } = this.props;

    // TODO: This sets italic. Should insert a custom user property
    const newLocalState = localState.set('editorState', RichUtils.toggleInlineStyle(localState.get('editorState'), 'ITALIC'));

    this.setState({
      showDropdown: false
    });

    onChange({
      localState: newLocalState,
      persistedState
    });
  }

}

UserProperty.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};

UserProperty.contextTypes = {
  userProperties: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }))
};
