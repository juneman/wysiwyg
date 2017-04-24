import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { RichUtils } from 'draft-js';

import { getButtonProps } from '../helpers/styles/editor';
import ItalicButton from '../icons/ItalicButton';

export default class Italic extends React.Component {

  render() {
    const buttonProps = getButtonProps(false);

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

Italic.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
