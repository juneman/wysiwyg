export function getBlocksFromSelection(editorState) {
  const selectionState = editorState.getSelection();
  const currentContent = editorState.getCurrentContent();
  const selectionStartKey = selectionState.getStartKey();
  const selectionEndKey = currentContent.getKeyAfter(
    selectionState.getEndKey()
  );
  return currentContent
    .getBlockMap()
    .skipUntil((val, key) => key === selectionStartKey)
    .takeUntil((val, key) => key === selectionEndKey);
}
