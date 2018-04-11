import { SelectionState, RichUtils } from "draft-js";

export function getSelectionStateForEntity(entityKey, contentState) {
  let selectionState = null;
  const entityRange = contentState
    .getBlocksAsArray()
    .reduce((memo, contentBlock) => {
      contentBlock.findEntityRanges(
        characterMetadata => {
          return characterMetadata.getEntity() === entityKey;
        },
        (start, end) => {
          memo = { contentBlockKey: contentBlock.getKey(), start, end };
        }
      );
      return memo;
    }, null);

  if (entityRange) {
    const { start, end, contentBlockKey } = entityRange;
    selectionState = SelectionState.createEmpty(contentBlockKey).merge({
      anchorKey: contentBlockKey,
      anchorOffset: start,
      focusKey: contentBlockKey,
      focusOffset: end,
      isBackward: false,
      hasFocus: true
    });
  }
  return selectionState;
}

// Returns an updated EditorState with the specified entity removed.
export function removeLinkEntityFromEditorState(entityKey, editorState) {
  const contentState = editorState.getCurrentContent();
  const selectionState = getSelectionStateForEntity(entityKey, contentState);
  if (selectionState) {
    return RichUtils.toggleLink(editorState, selectionState, null);
  }
  return editorState;
}
