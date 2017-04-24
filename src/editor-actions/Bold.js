import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { RichUtils } from 'draft-js';

import BoldButton from '../icons/BoldButton';

export default class Bold extends React.Component {

  render() {
    const buttonProps = {
      hideBackground: true,
      color: '#808080',
      clickColor: '#333',
      activeColor: '#5e9bff'
    };

    return (
      <BoldButton onClick={() => this.handleFormat()} {...buttonProps} />
    );
  }

  handleFormat() {
    const { localState, persistedState, onChange } = this.props;
    const newLocalState = localState.set('editorState', RichUtils.toggleInlineStyle(localState.get('editorState'), 'BOLD'));
    onChange({
      localState: newLocalState,
      persistedState
    });
  }

}

Bold.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
