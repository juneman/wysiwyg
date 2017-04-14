import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { RichUtils } from 'draft-js';

import RichTextResizeToolbar from './RichTextResizeToolbar';

import BoldButton from '../../icons/BoldButton';
import ItalicButton from '../../icons/ItalicButton';
import UnderlineButton from '../../icons/UnderlineButton';
import SelectSizeButton from '../../icons/SelectSizeButton';

export default class RichTextToolbar extends React.Component {

  render() {
    const { localState } = this.props;
    const selectedToolbar = localState.get('selectedToolbar');

    const buttonProps = {
      hideBackground: true,
      color: '#808080',
      clickColor: '#333',
      activeColor: '#5e9bff'
    };

    return (
      <div>
        <BoldButton onClick={() => this.handleFormat('BOLD')} {...buttonProps} />
        <ItalicButton onClick={() => this.handleFormat('ITALIC')} {...buttonProps} />
        <UnderlineButton onClick={() => this.handleFormat('UNDERLINE')} {...buttonProps} />
        <SelectSizeButton onClick={() => this.showToolbar(RichTextResizeToolbar)} isActive={(selectedToolbar === 'selectSize')} {...buttonProps} />
      </div>
    );
  }

  handleFormat(type) {
    const { localState, persistedState, onChange } = this.props;
    const newLocalState = localState.set('editorState', RichUtils.toggleInlineStyle(localState.get('editorState'), type));
    onChange({
      localState: newLocalState,
      persistedState
    });
  }

  showToolbar(Toolbar) {
    const { onShowSecondaryToolbar, onChange, localState, persistedState } = this.props;
    const newLocalState = localState.set('selectedToolbar', 'selectSize');
    onChange({
      localState: newLocalState,
      persistedState
    });
    onShowSecondaryToolbar(<Toolbar />);
  }
}

RichTextToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onShowSecondaryToolbar: PropTypes.func.isRequired
};
