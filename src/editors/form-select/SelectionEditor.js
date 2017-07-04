import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import HTMLParser from 'html-parse-stringify2';
import { Editor, EditorState, ContentState } from 'draft-js';

import { textInputStyle } from '../../helpers/styles/editor';

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
    const fieldType = persistedState.get('fieldType') || 'radio';
    const isRequired = persistedState.get('isRequired') || false;

    const placeholder = (`Place each option on a new line, e.g.
      Apples
      Oranges
      Pineapples`).split('\n').map((row) => row.trim()).join('\n');

    const dropdownNodes = (
      <div>
        <select className="form-control" required={isRequired}>
          { options.map((option) => {
            return (
              <option key={option}>{option}</option>
            );
          })}
        </select>
      </div>
    );

    const buttonListNodes = (
      <div>
        { options.map((option) => {
          return (
            <div key={option}>
              <input type={fieldType} />
              <label>{option}</label>
            </div>
          );
        })}
      </div>
    );

    return (
      <div>
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
            <textarea type="text" rows={5} style={textInputStyle} placeholder={placeholder} onChange={(e) => this.handleInputChange(e)} value={optionString} />
          </div>
        ) : (
          <div>
            <label>{label}</label>
            { fieldType === 'dropdown' ? dropdownNodes : buttonListNodes }
          </div>
        )}
      </div>
    );
  }
  
  // Instance Method
  focus() {
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
    const { label = '', options = [], isRequired = false, fieldType = 'radio' } = persistedState.toJS();

    const requiredAttr = {};
    if (isRequired) {
      requiredAttr.required = '';
    }

    const radioChildren = options.map((option) => {
      return {
        type: 'tag',
        name: 'div',
        voidElement: false,
        children: [
          {
            type: 'tag',
            name: 'input',
            voidElement: true,
            attrs: {
              type: fieldType,
              ...requiredAttr
            }
          },
          {
            type: 'tag',
            name: 'label',
            voidElement: false,
            children: [{
              type: 'text',
              content: option
            }]
          }
        ]
      };
    });

    const dropdownChildren = [
      {
        type: 'tag',
        name: 'select',
        voidElement: false,
        attrs: {
          class: 'form-control',
          ...requiredAttr
        },
        children: options.map((option) => {
          return {
            type: 'tag',
            name: 'option',
            voidElement: false,
            children: [
              {
                type: 'text',
                content: option
              }
            ]
          };
        })
      }
    ];
    
    const optionsChildren = (fieldType === 'dropdown') ? dropdownChildren : radioChildren;

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
          children: [
            {
              type: 'tag',
              name: 'label',
              voidElement: false,
              children: [
                {
                  type: 'text',
                  content: label
                }
              ]
            },
            {
              type: 'tag',
              name: 'div',
              voidElement: false,
              children: optionsChildren
            }
          ]
        }
      ]
    });

    return HTMLParser.stringify(ast);
  }

}

SelectionEditor.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  localState: PropTypes.instanceOf(Map).isRequired
};
