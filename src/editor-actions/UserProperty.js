import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import { EditorState, Modifier } from 'draft-js';

import { getButtonProps, secondaryMenuTitleStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';
import DropDownMenu from '../components/DropDownMenu';

import UserPropertyButton from '../icons/UserPropertyButton';

export default class UserProperty extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: props.isActive || false,
      selectedProperty: null
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
    const { isActive, userProperties } = this.props;
    const { isMenuOpen, selectedProperty } = this.state;

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      padding: 10,
      width: 300,
      animationName: `editor-slide-${(isMenuOpen) ? 'in' : 'out'}-bottom}`,
      animationTimingFunction: 'ease-out',
      animationDuration: '0.15s',
      animationIterationCount: 1,
      animationFillMode: 'both'
    };

    const titleStyles = secondaryMenuTitleStyle;

    // Leave blank if nothing
    if (!userProperties || !userProperties.size) {
      return (<div></div>);
    }

    const userPropertiesDropdown = [...(userProperties).map((userProperty) => {
      return userProperty.toJS();
    })].map((userProperty) => ({ label: userProperty.name, ...userProperty }));


    const valueOptions = !selectedProperty ? null : [ { label: "No fallback", value: null } , ...userPropertiesDropdown.find((userProperty) => userProperty.value == selectedProperty).options.map((option) => ({ label: option.name, value: option.name }))];

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
        <div style={titleStyles}>Insert a User Property</div>
        <DropDownMenu
          className="form-control"
          defaultValue="Choose a property"
          selectedValue={ selectedProperty }
          options={userPropertiesDropdown}
          onSelect={(value) => this.setSelectedValue(value)}/>
        { valueOptions &&
          <div style={{ marginTop: 10 }}>
          <DropDownMenu
            className="form-control"
            defaultValue="Choose a fallback"
            options={valueOptions}
            onSelect={(fallback) => this.handleSetValue(fallback)}/>
          </div>
        }
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
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });

    if(isActive) {
      setTimeout(() => onToggleActive(!isActive), 200);
    } else {
      onToggleActive(!isActive);
    }
  }

  setSelectedValue(value) {
    this.setState({ selectedProperty: value });
  };

  handleSetValue(value) {
    const { localState, persistedState, onChange, onToggleActive } = this.props;
    const { selectedProperty } = this.state;

    const editorState = localState.get('editorState');
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();

    const newValue = value ? `{{ ${ selectedProperty } | "${ value }" }}` : `{{ ${ selectedProperty } }}`;

    const newContentState = (selectionState.isCollapsed())
      ? Modifier.insertText(contentState, selectionState, newValue)
      : Modifier.replaceText(contentState, selectionState, newValue);

    const newLocalState = localState.set('editorState', EditorState.push(
      editorState,
      newContentState,
      'insert-characters'
    ));

    this.setState({
      isMenuOpen: false,
      selectedProperty: null
    });

    setTimeout(() => onToggleActive(false), 200);

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

