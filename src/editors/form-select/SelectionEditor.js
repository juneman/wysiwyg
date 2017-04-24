import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Editor, EditorState, ContentState } from 'draft-js';

export default class SelectionEditor extends React.Component {

  componentWillMount() {
    const { persistedState } = this.props;
    const content = persistedState.get('label') || 'Add Label...';
    const initialEditorState = EditorState.createWithContent(ContentState.createFromText(content));
    this.handleEditorStateChange(initialEditorState);
  }

  componentWillReceiveProps(nextProps) {
    const { persistedState } = this.props;

    const content = persistedState.get('label') || 'Add Label...';

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

    const label = (persistedState.get('label')) || 'Add Label...';
    const options = persistedState.get('options') || [];
    const optionString = (localState.get('options')) || options.join('\n') || '';
    const isMultiselect = persistedState.get('isMultiselect') || false;

    const placeholder = (`Place each option on a new line, e.g.
      Apples
      Oranges
      Pineapples`).split('\n').map((row) => row.trim()).join('\n');

    const inputType = (isMultiselect) ? 'checkbox' : 'radio';

    return (
      <div>
        { isEditing ? (
          <div>
            <label>
              { (editorState) ? (
                <Editor
                  editorState={editorState}
                  onChange={(editorState) => this.handleEditorStateChange(editorState)}
                />
              ) : null }
            </label>
            <textarea type="text" rows={5} className="form-control" placeholder={placeholder} onChange={(e) => this.handleInputChange(e)} value={optionString} />
          </div>
        ) : (
          <div>
            <label>{label}</label>
            { options.map((option) => {
              return (
                <div key={option}>
                  <input type={inputType} />
                  <label>{option}</label>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  handleEditorStateChange(editorState) {
    const { persistedState, localState, onChange } = this.props;
    const content = editorState.getCurrentContent().getPlainText();

    const newPersistedState = persistedState.set('label', content);
    const newLocalState = localState.set('editorState', editorState);

    onChange({
      persistedState: newPersistedState,
      localState: newLocalState,
      html: this.generateHTML(newPersistedState)
    });
  }

  handleInputChange(e) {
    const options = e.currentTarget.value;
    const { persistedState, localState, onChange } = this.props;

    const optionsArray = options
      .split('\n')
      .map(option => option.trim())
      .filter(option => option && option.length);

    const newLocalState = localState.set('options', options);
    const newPersistedState = persistedState.set('options', optionsArray);

    onChange({
      persistedState: newPersistedState,
      localState: newLocalState,
      html: this.generateHTML(newPersistedState)
    });
  }

  generateHTML(persistedState) {
    const label = persistedState.get('label') || '';
    const options = persistedState.get('options') || [];
    const isRequired = persistedState.get('isRequired') || false;
    const isMultiselect = persistedState.get('isMultiselect') || false;

    const inputType = (isMultiselect) ? 'checkbox' : 'radio';
    const requiredAttr = (isRequired) ? 'required="required"' : '';

    const optionsHtml = options.map((option) => {
      return `
        <div>
          <input type="${inputType}" ${requiredAttr} />
          <label>${option}</label>
        </div>
      `;
    }).join('\n');

    return `
      <div>
        <label>${label}</label>
        ${optionsHtml}
      </div>
    `;
  }

}

SelectionEditor.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  localState: PropTypes.instanceOf(Map).isRequired
};
