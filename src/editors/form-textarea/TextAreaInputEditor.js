import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import HTMLParser from 'html-parse-stringify2';
import { Editor, EditorState, ContentState } from 'draft-js';

export default class TextAreaInputEditor extends React.Component {

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
    const placeholder = (persistedState.get('placeholder'));
    const maxLength = (persistedState.get('maxLength')) || '';
    const isRequired = (persistedState.get('isRequired')) || false;

    const containerStyle = {};

    return (
      <div style={containerStyle}>
        { isEditing ? (
          <div>
            <label>
              { (editorState) ? (
                <Editor
                  ref={(editor) => this.editor = editor}
                  editorState={editorState}
                  onChange={(editorState) => this.handleEditorStateChange(editorState)}
                />
              ) : null }
            </label>
            <textarea type="text" className="form-control" onChange={(e) => this.handleInputChange(e)} value={placeholder} placeholder="Add Placeholder Text" />
          </div>
        ) : (
          <div>
            <label>{(isRequired) ? '*' : ''} {label}</label>
            <textarea type="text" className="form-control" value={placeholder} disabled={true} maxLength={maxLength} />
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

  // Instance Method
  focus() {
    // Wait to steal the focus until the next event loop
    setTimeout(() => {
      if (this.editor) {
        this.editor.focus();
      }
    }, 0);
  }

  handleInputChange(e) {
    const label = e.currentTarget.value;
    const { persistedState, localState, onChange } = this.props;

    const newPersistedState = persistedState.set('placeholder', label);

    onChange({
      persistedState: newPersistedState,
      localState,
      html: this.generateHTML(newPersistedState)
    });
  }

  generateHTML(persistedState) {
    const { zone } = this.props;
    const { label, placeholder, isRequired = false, maxLength } = persistedState.toJS();

    const inputAttrs = {
      class: 'form-control',
      ['data-field-id']: zone.get('id')
    };
    if (isRequired) {
      inputAttrs.required = 'required';
    }
    if (maxLength) {
      inputAttrs['max-length'] = maxLength;
    }
    if (placeholder && placeholder.length) {
      inputAttrs.placeholder = placeholder;
    }

    const ast = [];
    ast.push({
      type: 'tag',
      name: 'div',
      voidElement: false,
      children: [
        {
          type: 'tag',
          name: 'div',
          voidElement: false,
          attrs: {
            class: 'field-label'
          },
          children: [{
            type: 'text',
            content: label
          }]
        }, {
          type: 'tag',
          name: 'textarea',
          attrs: inputAttrs,
          voidElement: true
        }
      ]
    });

    return HTMLParser.stringify(ast);
  }

}

TextAreaInputEditor.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  localState: PropTypes.instanceOf(Map).isRequired,
  zone: PropTypes.instanceOf(Map).isRequired
};
