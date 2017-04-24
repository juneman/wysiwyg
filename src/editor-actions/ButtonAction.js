import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, secondaryMenuTitleStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';

import TextButton from '../icons/TextButton';

export default class ButtonAction extends React.Component {

  render() {
    const { persistedState, isActive } = this.props;
    const buttonAction = persistedState.get('buttonAction') || '';

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      padding: 10,
      width: 300
    };

    const titleStyles = secondaryMenuTitleStyle;

    const actionOption = ([
      {
        name: 'None',
        value: ''
      },
      {
        name: 'Next',
        value: 'next'
      },
      {
        name: 'Previous',
        value: 'previous'
      }
    ]);

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
        <div style={titleStyles}>Button Action</div>
        <select value={buttonAction} className="form-control" onChange={(e) => this.handleSave(e)}>
          { actionOption.map((styleOption) => {
            return (
              <option key={styleOption.value} value={styleOption.value}>{styleOption.name}</option>
            );
          })}
        </select>
      </Menu>
    ) : null;

    return (
      <div>
        <TextButton onClick={() => this.toggleDropdown()} {...buttonProps} />
        { dropdownNodes }
      </div>
    );
  }

  toggleDropdown() {
    const { onToggleActive, isActive } = this.props;
    onToggleActive(!isActive);
  }

  handleSave(e) {
    const { localState, persistedState, onChange, onToggleActive } = this.props;
    const value = (e.target.value.length) ? e.target.value : null;

    const newPersistedState = persistedState
      .set('buttonAction', value)
      .delete('href')
      .delete('isNewWindow');

    onToggleActive(false);

    onChange({
      localState,
      persistedState: newPersistedState
    });
  }

}

ButtonAction.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};
