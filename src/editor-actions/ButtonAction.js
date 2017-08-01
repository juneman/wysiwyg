import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, secondaryMenuTitleStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';

import ActionButton from '../icons/ActionButton';

export default class ButtonAction extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
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
    const { persistedState, isActive, hasRoomToRenderBelow } = this.props;
    const { isMenuOpen } = this.state;
    const buttonAction = persistedState.get('buttonAction') || '';
    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      padding: 10,
      width: 300,
      animationName: `editor-slide-${(isMenuOpen) ? 'in' : 'out'}-${(hasRoomToRenderBelow) ? 'bottom' : 'top'}`,
      animationTimingFunction: 'ease-out',
      animationDuration: '0.15s',
      animationIterationCount: 1,
      animationFillMode: 'both'
    };
    if (!hasRoomToRenderBelow) {
      dropdownStyles.bottom = dropdownStyles.top + 55;
      delete dropdownStyles.top;
    }

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
      },
      {
        name: 'Skip',
        value: 'skip'
      },
      {
        name: 'End',
        value: 'end'
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
        <ActionButton onClick={() => this.toggleDropdown()} {...buttonProps} />
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

  handleSave(e) {
    this.handleAction(e.target.value && e.target.value.length ? e.target.value : null);
  }

  handleAction(value) {
    const { localState, persistedState, onChange, onToggleActive } = this.props;

    const newPersistedState = persistedState
      .set('buttonAction', value)
      .delete('href')
      .delete('isNewWindow');

    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });

    setTimeout(() => onToggleActive(false), 200);

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
