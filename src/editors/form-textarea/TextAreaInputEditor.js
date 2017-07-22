import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import HTMLParser from 'html-parse-stringify2';
import { Editor, EditorState, ContentState } from 'draft-js';
import uuid from 'uuid/v4';

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
    const { isEditing, persistedState, localState, zone } = this.props;
    const editorState = localState.get('editorState');

    const label = (persistedState.get('label')) || 'Add Label...';
    const placeholder = (persistedState.get('placeholder'));
    const maxLength = (persistedState.get('maxLength')) || '';
    const isRequired = (persistedState.get('isRequired')) || false;

    return (
      <div>
        <style>
          {`label [contenteditable] {
              cursor: text;
            }
          `}
        </style>
        { isEditing ? (
          <form className="step-action-form">
            <div className="fields">
              <div data-field-id={ zone.get('id') } className="field">
                <div data-appcues-required={ isRequired } className="form-field form-field-textarea">
                  <div className="field-label">
                    <label htmlFor={ zone.get('id') } className="label-display">
                      { (editorState) ? (
                        <Editor
                          ref={(editor) => this.editor = editor}
                          editorState={editorState}
                          onChange={(editorState) => this.handleEditorStateChange(editorState)}
                        />
                      ) : null }
                    </label>
                  </div>
                  <div className="field-controls">
                    <textarea name={ zone.get('id') } rows="4" onChange={(e) => this.handleInputChange(e)} value={placeholder} placeholder="Add Placeholder Text" className="placeholder-value"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <form className="step-action-form">
            <div className="fields">
              <div data-field-id={ zone.get('id') } className="field">
                <div data-appcues-required={ isRequired } className="form-field form-field-textarea">
                  <div className="field-label">
                    <label htmlFor={ zone.get('id') } className="label-display">{(isRequired) ? '*' : ''} { label }</label>
                  </div>
                  <div className="field-controls">
                    <textarea name={ zone.get('id') } rows="4" placeholder={ placeholder } className="placeholder-value"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </form>
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
      class: 'form-control placeholder-value',
      ['data-field-id']: zone.get('id'),
      rows: 4
    };
    if (isRequired) {
      inputAttrs.required = '';
    }
    if (maxLength) {
      inputAttrs['maxlength'] = maxLength;
    }
    if (placeholder && placeholder.length) {
      inputAttrs.placeholder = placeholder;
    }

    const ast = [];
    ast.push({
      type: 'tag',
      name: 'form',
      attrs: { class: "step-action-form" },
      voidElement: false,
      children: [
        {
          type: 'tag',
          name: 'div',
          attrs: { class: "fields" },
          voidElement: false,
          children: [
            {
              type: 'tag',
              name: 'div',
              attrs: { class: "field", ['data-field-id']: zone.get('id') },
              voidElement: false,
              children: [
                {
                  type: 'tag',
                  name: 'div',
                  attrs: {
                    class: 'form-field form-field-textarea',
                    ['data-appcues-required']: isRequired },
                  voidElement: false,
                  children: [
                    {
                      type: 'tag',
                      name: 'div',
                      attrs: { class: "field-label" },
                      voidElement: false,
                      children: [
                        {
                          type: 'tag',
                          name: 'label',
                          attrs: { class: "label-display", for: zone.get('id') },
                          voidElement: false,
                          children: [{
                            type: 'text',
                            content: (isRequired) ? `* ${label}` : label
                          }]
                        }
                      ]
                    }, 
                    {
                      type: 'tag',
                      name: 'div',
                      attrs: { class: "field-controls" },
                      voidElement: false,
                      children: [
                        {
                          type: 'tag',
                          name: 'textarea',
                          attrs: inputAttrs,
                          voidElement: false,
                          children: [{
                            type: 'text',
                            content: ''
                          }]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
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
