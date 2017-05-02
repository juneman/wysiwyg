import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import { EditorState, Modifier } from 'draft-js';

import { getButtonProps, secondaryMenuTitleStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';

import UserPropertyButton from '../icons/UserPropertyButton';

export default class UserProperty extends React.Component {

  render() {
    const { isActive, userProperties } = this.props;

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      padding: 10,
      width: 300
    };

    const titleStyles = secondaryMenuTitleStyle;

    // Leave blank if nothing
    if (!userProperties || !userProperties.size) {
      return (<div></div>);
    }

    const userPropertiesDropdown = (userProperties).map((userProperty) => {
      return userProperty.toJS();
    });

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
        <div style={titleStyles}>Insert a User Property</div>
        <select className="form-control" onChange={(e) => this.handleSave(e)}>
          <option value="">Select Property...</option>
          { userPropertiesDropdown.map((userProperty) => {
            return (
              <option key={userProperty.value} value={userProperty.value}>{userProperty.name}</option>
            );
          })}
        </select>
      </Menu>
    ) : null;

    return (
      <div>
        <UserPropertyButton onClick={() => this.toggleDropdown()} {...buttonProps} />
        { dropdownNodes }
      </div>
    );
  }

  toggleDropdown() {
    const { onToggleActive, isActive } = this.props;
    onToggleActive(!isActive);
  }

  handleSave(e) {
    e.preventDefault();
    const value = e.target.value;
    this.handleSetValue(value);
  }

  handleSetValue(value) {
    const { localState, persistedState, onChange, onToggleActive } = this.props;

    const editorState = localState.get('editorState');
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    
    const newContentState = (selectionState.isCollapsed())
      ? Modifier.insertText(contentState, selectionState, value)
      : Modifier.replaceText(contentState, selectionState, value);
    
    const newLocalState = localState.set('editorState', EditorState.push(
      editorState,
      newContentState,
      'insert-characters'
    ));

    onToggleActive(false);

    onChange({
      localState: newLocalState,
      persistedState
    });
  }

}

UserProperty.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  userProperties: PropTypes.instanceOf(List).isRequired
};

