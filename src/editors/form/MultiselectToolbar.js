import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import MultiselectOptionsToolbar from './MultiselectOptionsToolbar';
import SettingsButton from '../../icons/SettingsButton';

export default class InputOptionsToolbar extends React.Component {

  render() {
    const buttonProps = {
      hideBackground: true,
      color: '#808080',
      clickColor: '#333',
      activeColor: '#5e9bff'
    };

    return (
      <div>
        <SettingsButton onClick={() => this.showResizeToolbar()} {...buttonProps} />
      </div>
    );
  }

  showResizeToolbar() {
    const { onShowSecondaryToolbar, onChange, localState, persistedState } = this.props;
    const newLocalState = localState.set('selectedToolbar', 'selectSize');
    onChange({
      localState: newLocalState,
      persistedState
    });
    onShowSecondaryToolbar(<MultiselectOptionsToolbar />);
  }

}

InputOptionsToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onShowSecondaryToolbar: PropTypes.func.isRequired,
};
