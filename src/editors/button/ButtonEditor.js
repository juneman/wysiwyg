import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Editor, EditorState, ContentState } from 'draft-js';

export default class ButtonEditor extends React.Component {

  componentWillMount() {
    const { persistedState } = this.props;
    const content = persistedState.get('content') || 'Button Text';
    const initialEditorState = EditorState.createWithContent(ContentState.createFromText(content));
    this.handleEditorStateChange(initialEditorState);
  }

  componentWillReceiveProps(nextProps) {
    const { persistedState } = this.props;

    const content = persistedState.get('content') || 'Button Text';

    if (nextProps.isEditing && nextProps.localState.isEmpty()) {
      // If there is no editorState, create a new blank one
      const initialEditorState = EditorState.createWithContent(ContentState.createFromText(content));
      this.handleEditorStateChange(initialEditorState);
    } else if (nextProps.isEditing) {
      // If editorState changes from the toolbar, push any changes up the chain
      const oldEditorState = this.props.localState.get('editorState');
      const newEditorState = nextProps.localState.get('editorState');
      if (oldEditorState !== newEditorState) {
        this.handleEditorStateChange(newEditorState);
      }
    }
  }

  render() {
    const { isEditing, persistedState, localState } = this.props;
    const editorState = localState.get('editorState');

    const content = (persistedState.get('content')) || 'Button Text';
    const textAlign = persistedState.get('textAlign');

    const containerStyle = {};
    if (textAlign) {
      containerStyle.textAlign = textAlign;
    }

    return (
      <div className="button" style={containerStyle}>
        { (isEditing) ? (
          (editorState) ? (
            <div className="btn" style={{display: 'inline-block'}}>
            <Editor
              editorState={editorState}
              onChange={(editorState) => this.handleEditorStateChange(editorState)}
            />
            </div>
          ) : null
        ) : (
          <button className="btn" disabled>
            <span>{content}</span>
          </button>
        )}
      </div>
    );
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
    const textAlign = persistedState.get('textAlign');

    const style = (textAlign) ? ` style="text-align:${textAlign}"` : '';

    return `<div class="button"${style}><button class="btn"><span>${content}</span></button></div>`;
  }

}

ButtonEditor.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  localState: PropTypes.instanceOf(Map).isRequired
};
