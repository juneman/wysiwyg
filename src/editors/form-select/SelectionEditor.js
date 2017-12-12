import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import HTMLParser from 'html-parse-stringify2';
import { Editor, EditorState, ContentState } from 'draft-js';

import { inputStyle, placeholderStyle } from '../../helpers/styles/editor';

export default class SelectionEditor extends React.Component {

  componentWillMount() {
    const { persistedState } = this.props;
    const content = persistedState.get('label') || '';
    const initialEditorState = EditorState.createWithContent(ContentState.createFromText(content));
    this.handleEditorStateChange(initialEditorState);
  }

  componentWillReceiveProps(nextProps) {
    const { persistedState } = this.props;

    const content = persistedState.get('label') || '';

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

    const label = persistedState.get('label');
    const options = persistedState.get('options') || List();
    const optionString = (localState.get('options')) || options.join('\n') || '';
    const isRequired = persistedState.get('isRequired') || false;

    const placeholder = (`Place each option on a new line, e.g.
      Option 1
      Option 2
      Option 3`).split('\n').map((row) => row.trim()).join('\n');

    const buttonListNodes = (
      <div>
        { options.map((option) => {
          return (
            <label className="field-option" key={ option }>
              <input className="response-value" value={ option } type="radio" />
              <span>{ option }</span>
            </label>
          );
        })}
      </div>
    );

    const { marginTop, marginRight, marginBottom, marginLeft } = persistedState.toJS();

    const wrapperStyle = {};
    if (marginTop) {
      wrapperStyle.marginTop = marginTop;
    };
    if (marginRight) {
      wrapperStyle.marginRight = marginRight;
    };
    if (marginBottom) {
      wrapperStyle.marginBottom = marginBottom;
    };
    if (marginLeft) {
      wrapperStyle.marginLeft = marginLeft;
    };

    console.log('optionz', options);
    return (
      <div>
        <style> {`
          label [contenteditable] {
            cursor: text;
          }

          .public-DraftEditorPlaceholder-root {
            pointer-events: none;
            color: #999;
          }
          appcues cue>section .form-field label.field-option input[type=checkbox] {
            border: 0;
            clip: rect(0 0 0 0);
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            width: 1px;
          }

          appcues cue>section .form-field label.field-option input[type=checkbox]+span:before {
            content: "";
            display: inline-block;
            width: .8em;
            height: .8em;
            vertical-align: -.05em;
            border: .125em solid #fff;
            box-shadow: 0 0 0 0.15em #888;
            margin-right: .7em;
            transition: all .5s ease;
          } `}
        </style>
        { isEditing ? (
          <form className="step-action-form" style={wrapperStyle}>
            <div className="fields">
              <div data-field-id={ zone.get('id') } className="field">
                <div data-appcues-required={ isRequired } style={{ marginTop: 0, padding: 0 }} className={ `form-field form-field-radio` }>
                  <div className="field-label">
                    <label htmlFor={ zone.get('id') } className="label-display">
                      { (editorState) ? (
                        <Editor
                          ref={(editor) => this.editor = editor}
                          editorState={editorState}
                          placeholder="Add Label..."
                          onChange={(editorState) => this.handleEditorStateChange(editorState)}
                        />
                      ) : null }
                    </label>
                  </div>
                  <div className="field-controls">
                    <textarea type="text" rows={5} style={{ ...inputStyle, marginBottom: 10 }} placeholder={placeholder} onChange={(e) => this.handleInputChange(e)} value={optionString} />
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          (options.size > 0 || label) ? (
            <form className="step-action-form" style={wrapperStyle}>
              <div className="fields">
                <div data-field-id={ zone.get('id') } className="field">
                  <div data-appcues-required={ isRequired } style={{ marginTop: 0, padding: 0 }} className={ `form-field form-field-radio` }>
                    <div className="field-label">
                      <label htmlFor={ zone.get('id') } className="label-display">{(isRequired) ? '*' : ''} { label }</label>
                    </div>
                    <div className="field-controls">
                      { buttonListNodes }
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div style={ placeholderStyle }>Click to add your options</div>
          )
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

    const optionsArray = List(options
      .split('\n')
      .map(option => option.trim())
      .filter(option => option && option.length));

    const newLocalState = localState.set('options', options);
    const newPersistedState = persistedState.set('options', optionsArray);

    onChange({
      persistedState: newPersistedState,
      localState: newLocalState,
      html: this.generateHTML(newPersistedState)
    });
  }

  generateHTML(persistedState) {
    const { zone } = this.props;
    const { label = '', options = List(), isRequired = false,  marginTop, marginRight, marginBottom, marginLeft } = persistedState.toJS();

    const requiredAttr = {};
    if (isRequired) {
      requiredAttr.required = '';
    };

    let styles = '';
    if (marginTop) {
      styles = styles + `marginTop:${marginTop}px;`;
    };
    if (marginRight) {
      styles = styles + `marginRight:${marginRight}px;`;
    };
    if (marginBottom) {
      styles = styles + `marginBottom:${marginBottom}px;`;
    };
    if (marginLeft) {
      styles = styles + `marginLeft:${marginLeft}px;`;
    };

    const radioChildren = options.map((option) => {
      return {
        type: 'tag',
        name: 'label',
        voidElement: false,
        attrs: { class: 'field-option' },
        children: [
          {
            type: 'tag',
            name: 'input',
            voidElement: true,
            attrs: {
              type: 'radio',
              class: 'response-value',
              name: zone.get('id'),
              value: option,
              ...requiredAttr
            }
          },
          {
            type: 'tag',
            name: 'span',
            voidElement: false,
            children: [{
              type: 'text',
              content: option
            }]
          }
        ]
      };
    });

    const ast = [];
    ast.push({
      type: 'tag',
      name: 'form',
      attrs: {
        class: "step-action-form",
        style: styles
      },
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
                    class: `form-field form-field-radio`,
                    style: "marginTop: 0; padding: 0;",
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
                          name: 'div',
                          attrs: { class: "field-options" },
                          voidElement: false,
                          children: radioChildren
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

SelectionEditor.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  localState: PropTypes.instanceOf(Map).isRequired,
  zone: PropTypes.instanceOf(Map).isRequired
};
