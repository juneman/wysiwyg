import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { EditorState, Modifier } from 'draft-js';

import Alignment from './Alignment';

export default class AlignmentInline extends React.Component {
  render() {
    const { onToggleActive, isActive } = this.props;
    return (
      <Alignment
        onChange={(type) => this.handleAlignment(type)}
        onToggleActive={onToggleActive}
        isActive={isActive}
      />);
  }

  handleAlignment(type) {
    const { localState, persistedState, onChange } = this.props;

    const blockData = {
      textAlign: type
    };

    const editorState = localState.get('editorState');
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const newContentState = Modifier.setBlockData(contentState, selectionState, blockData);
    const newLocalState = localState.set('editorState', EditorState.push(
      editorState,
      newContentState,
      'change-block-data'
    ));

    onChange({
      localState: newLocalState,
      persistedState
    });
  }

}

AlignmentInline.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};
