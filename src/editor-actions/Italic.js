import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { RichUtils } from 'draft-js';

import ItalicButton from '../icons/ItalicButton';

export default class Bold extends React.Component {

  render() {
    const buttonProps = {
      hideBackground: true,
      color: '#808080',
      clickColor: '#333',
      activeColor: '#5e9bff'
    };

    return (
      <ItalicButton onClick={() => this.handleFormat()} {...buttonProps} />
    );
  }

  handleFormat() {
    const { localState, persistedState, onChange } = this.props;
    const newLocalState = localState.set('editorState', RichUtils.toggleInlineStyle(localState.get('editorState'), 'ITALIC'));
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
