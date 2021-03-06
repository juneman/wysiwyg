import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { EditorState, RichUtils, SelectionState } from 'draft-js';

import Hyperlink from './Hyperlink';
import { convertToHTML } from '../helpers/draft/convert';

class HyperlinkInline extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      linkKey: null
    };
  }

  componentWillReceiveProps(nextProps) {
    const willLocalStateChange = !this.props.localState.equals(nextProps.localState);

    if (willLocalStateChange) {
      const editorState = nextProps.localState.get('editorState');
      let linkKey = null;
      if (editorState) {
        const contentState = editorState.getCurrentContent();
        const startKey = editorState.getSelection().getStartKey();
        const startOffset = editorState.getSelection().getStartOffset();
        const isJustCursor = editorState.getSelection().isCollapsed();
        const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
        linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset) || (isJustCursor ? blockWithLinkAtBeginning.getEntityAt(startOffset - 1) : null);
      }
      this.setState({ linkKey });
    }
  }

  render() {
    const {
      localState,
      isActive,
      onToggleActive,
      hasRoomToRenderBelow,
      focusEditor
    } = this.props;
    const { linkKey } = this.state;

    let href = '';
    let isNewWindow = false;
    let isUpdatingExistingLink = false;

    const editorState = localState.get('editorState');

    if (editorState) {
      const selection = editorState.getSelection();
      const contentState = editorState.getCurrentContent();

      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        const linkData = linkInstance.getData();
        isNewWindow = linkData.isNewWindow;
        href = linkData.href;
        isUpdatingExistingLink = true;
      }
    }

    return (
      <Hyperlink
        href={ href }
        isNewWindow={ isNewWindow }
        isActive={ isActive }
        onToggleActive={ onToggleActive }
        hasRoomToRenderBelow={ hasRoomToRenderBelow }
        isUpdatingExistingLink={ isUpdatingExistingLink }
        onChange={ (href, isNewWindow) => this.handleLink(href, isNewWindow) }
        focusEditor={ focusEditor }
      />);
  }

  handleLink(href, isNewWindow) {
    const { localState, persistedState, onChange } = this.props;
    const { linkKey } = this.state;

    const editorState = localState.get('editorState');
    const contentState = editorState.getCurrentContent();
    let newLocalState = localState;
    let newEditorState = editorState;

    if (!linkKey) {
      const contentStateWithEntity = contentState.createEntity(
        'LINK',
        'MUTABLE',
        {
          href,
          isNewWindow
        }
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      newEditorState = RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      );
      newLocalState = localState.set('editorState', newEditorState);
    }
    else {
      const nextCurrentContentState = contentState.replaceEntityData(linkKey, {
        href,
        isNewWindow
      });

      // Find the range of the entity so we can build a SelectionState object
      // with the range to use with `RichUtils.toggleLink`.
      let linkRange, linkBlock;
      nextCurrentContentState.getBlocksAsArray().reduce((memo, contentBlock) => {
        contentBlock.findEntityRanges(
          char => linkKey === char.getEntity(),
          (start, end) => {
            linkRange = {start, end};
            linkBlock = contentBlock;
          }
        )
      }, null);

      // Update editor state with the updated entity
      if (linkRange && linkBlock) {
        newEditorState = RichUtils.toggleLink(
          newEditorState,
          SelectionState.createEmpty(linkBlock.getKey()).merge({
            anchorOffset: linkRange.start,
            focusOffset: linkRange.end
          }),
          linkKey
        );
      }
      newLocalState = localState.set('editorState', newEditorState);
    }

    onChange({
      localState: newLocalState,
      persistedState: persistedState.set('content', convertToHTML(newEditorState))
    });
  }

}

HyperlinkInline.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  hasRoomToRenderBelow: PropTypes.bool,
  focusEditor: PropTypes.func.isRequired
};

HyperlinkInline.actionName = 'hyperlink-inline';

export default HyperlinkInline;
