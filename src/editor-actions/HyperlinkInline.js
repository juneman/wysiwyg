import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { EditorState, RichUtils } from 'draft-js';

import Hyperlink from './Hyperlink';

export default class HyperlinkInline extends React.Component {

  render() {
    const { localState, isActive, onToggleActive, hasRoomToRenderBelow } = this.props;

    let href = '';
    let isNewWindow = false;

    const editorState = localState.get('editorState');

    if (editorState) {
      const selection = editorState.getSelection();
      if (!selection.isCollapsed()) {
        const contentState = editorState.getCurrentContent();
        const startKey = editorState.getSelection().getStartKey();
        const startOffset = editorState.getSelection().getStartOffset();
        const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
        const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

        if (linkKey) {
          const linkInstance = contentState.getEntity(linkKey);
          const linkData = linkInstance.getData();
          isNewWindow = linkData.isNewWindow;
          href = linkData.href;
        }
      }
    }

    return (
      <Hyperlink
        href={ href }
        isNewWindow={ isNewWindow }
        isActive={ isActive }
        onToggleActive={ onToggleActive }
        hasRoomToRenderBelow={ hasRoomToRenderBelow }
        onChange={ (href, isNewWindow) => this.handleLink(href, isNewWindow) }
      />);
  }

  handleLink(href, isNewWindow) {
    const { localState, persistedState, onChange } = this.props;
    
    const editorState = localState.get('editorState');
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      {
        href,
        isNewWindow
      }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    const newLocalState = localState.set('editorState', RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    ));

    onChange({
      localState: newLocalState,
      persistedState
    });
  }

}

HyperlinkInline.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  hasRoomToRenderBelow: PropTypes.bool
};
