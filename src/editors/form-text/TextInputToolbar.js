import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Toolbar from '../../components/Toolbar';
import InputFieldOptions from '../../editor-actions/InputFieldOptions';

export default class TextInputToolbar extends React.Component {

  render() {
    const { localState, persistedState, onChange } = this.props;

    const toolbarProps = {
      localState,
      persistedState,
      onChange
    };

    return (
      <Toolbar>
        <InputFieldOptions {...toolbarProps} />
      </Toolbar>
    );
  }
}

TextInputToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
