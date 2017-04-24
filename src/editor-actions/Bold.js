import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { RichUtils } from 'draft-js';

import { getButtonProps } from '../helpers/styles/editor';
import BoldButton from '../icons/BoldButton';

export default class Bold extends React.Component {

  render() {
    const buttonProps = getButtonProps(false);

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
