import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { EditorState } from 'draft-js';
import { decorator, convertFromHTML } from '../../helpers/draft/convert';

import { placeholderStyle } from '../../helpers/styles/editor';

export default class VideoEditor extends React.Component {

  componentWillMount() {
    const { persistedState } = this.props;
    const htmlContent = persistedState.get('content') || '<p></p>';
    const initialEditorState = EditorState.createWithContent(convertFromHTML(htmlContent), decorator);
    this.handleEditorStateChange(initialEditorState);
  }

  render() {
    const { persistedState } = this.props;

    const content = persistedState.get('content');

    return (content) ? (
      <div
        className="video-html"
        dangerouslySetInnerHTML={{__html: content}}
      ></div>
    ) : (
      <div style={ placeholderStyle }>Add your Video Script</div>
    );
  }

  // Instance Method
  focus() {
    // Do nothing for this editor
  }

  handleEditorStateChange(editorState) {
    const { persistedState, localState, onChange } = this.props;
    const content = editorState.getCurrentContent().getPlainText();

    const newPersistedState = persistedState.set('content', content);
    const newLocalState = localState.set('editorState', editorState);

    onChange({
      persistedState: newPersistedState,
      localState: newLocalState,
      html: this.generateHTML(newPersistedState)
    });
  }

  generateHTML(persistedState) {
    const content = persistedState.get('content') || '';

    return `<div class="video-html">${content}</div>`;
  }

}

VideoEditor.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  localState: PropTypes.instanceOf(Map).isRequired
};
