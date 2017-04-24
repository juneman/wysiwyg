import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Toolbar from '../components/Toolbar';

import TextButton from '../icons/TextButton';

export default class ButtonAction extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false
    };
  }

  render() {
    const { showDropdown } = this.state;
    const { persistedState } = this.props;
    const buttonAction = persistedState.get('buttonAction') || '';

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

    const dropdownNodes = showDropdown ? (
      <Toolbar style={dropdownStyles}>
        <div style={titleStyles}>Button Action</div>
        <select value={buttonAction} className="form-control" onChange={(e) => this.handleSave(e)}>
          { actionOption.map((styleOption) => {
            return (
              <option key={styleOption.value} value={styleOption.value}>{styleOption.name}</option>
            );
          })}
        </select>
      </Toolbar>
    ) : null;

    return (
      <div>
        <TextButton onClick={() => this.toggleDropdown()} {...buttonProps} />
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
    const { localState, persistedState, onChange } = this.props;
    const value = (e.target.value.length) ? e.target.value : null;

    const newPersistedState = persistedState
      .set('buttonAction', value)
      .delete('href')
      .delete('isNewWindow');

    this.setState({
      showDropdown: false
    });

    onChange({
      localState,
      persistedState: newPersistedState
    });
  }

}

ButtonAction.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
