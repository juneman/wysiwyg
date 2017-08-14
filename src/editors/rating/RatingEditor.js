import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import HTMLParser from 'html-parse-stringify2';
import { Editor, EditorState, ContentState } from 'draft-js';

import { placeholderStyle } from '../../helpers/styles/editor';

export default class RatingEditor extends React.Component {

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

  shouldComponentUpdate(nextProps) {
    const { localState } = this.props;
    const hasLeftRatingLabelChanged = localState.get('leftRatingLabel') != nextProps.localState.get('leftRatingLabel');
    const hasRightRatingLabelChanged = localState.get('rightRatingLabel') != nextProps.localState.get('rightRatingLabel');

    if (hasRightRatingLabelChanged || hasLeftRatingLabelChanged){
      return false;
    }

    return true;
  }

  render() {
    const { isEditing, persistedState, localState, zone } = this.props;
    const editorState = localState.get('editorState');

    const label = persistedState.get('label');
    const leftRatingLabel = persistedState.get('leftRatingLabel') || 'Not likely';
    const rightRatingLabel = persistedState.get('rightRatingLabel') || 'Very likely';

    const options = persistedState.get('options') || [];
    const optionString = (localState.get('options')) || options.join('\n') || '';
    const isRequired = persistedState.get('isRequired') || false;
    const numOptions = persistedState.get('numOptions') || 11;

    const numberedOptions = [ ...(new Array(numOptions)) ];

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
                    <div className="rating-options">
                      { numberedOptions.map((_, count) =>
                        <label key={ `${ zone.get('id') }-${ count }` } className="rating-option">
                          <input className="response-value" type="radio" name={ zone.get('id') } value={ count }/>
                          <span>{ count }</span>
                        </label>
                      )}
                    </div>
                    <div className="rating-labels row">
                      <div className="col-md-6 left">
                        <small
                          suppressContentEditableWarning
                          contentEditable
                          onInput={ (e) => this.onChangeLabel('leftRatingLabel', e.target.textContent) }
                          className="text-muted">
                          { leftRatingLabel }
                        </small>
                      </div>
                      <div className="col-md-6 right text-right">
                        <small
                          suppressContentEditableWarning
                          contentEditable
                          onInput={ (e) => this.onChangeLabel('rightRatingLabel', e.target.textContent) }
                          className="text-muted">
                          { rightRatingLabel }
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <form className="step-action-form" style={wrapperStyle}>
            <div className="fields">
              <div data-field-id={ zone.get('id') } className="field">
                <div data-appcues-required={ isRequired } style={{ marginTop: 0, padding: 0 }} className={ `form-field form-field-radio` }>
                  <div className="field-label">
                    <label htmlFor={ zone.get('id') } className="label-display">{(isRequired) ? '*' : ''} { label }</label>
                  </div>
                  <div className="field-controls">
                    <div className="rating-options">
                      { numberedOptions.map((_, count) =>
                        <label key={ `${ zone.get('id') }-${ count }` } className="rating-option">
                          <input className="response-value" type="radio" name={ zone.get('id') } value={ count }/>
                          <span>{ count }</span>
                        </label>
                      )}
                    </div>
                    <div className="rating-labels row">
                      <div className="col-md-6 left">
                        <small className="text-muted">{ leftRatingLabel }</small>
                      </div>
                      <div className="col-md-6 right text-right">
                        <small className="text-muted">{ rightRatingLabel }</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
  
  onChangeLabel(label, text) {
    const { persistedState, localState, onChange } = this.props;
    const newPersistedState = persistedState.set(label, text);
    const newLocalState = localState.set(label, text);

    onChange({
      persistedState: newPersistedState,
      localState: newLocalState,
      html: this.generateHTML(newPersistedState)
    });
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
    const { zone } = this.props;
    const {
      label = '',
      isRequired = false,
      numOptions = 11,
      leftRatingLabel='Not likely',
      rightRatingLabel='Very likely',
      marginTop,
      marginRight,
      marginBottom,
      marginLeft
    } = persistedState.toJS();

    const numberedOptions = [ ...(new Array(numOptions)) ];

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
                          attrs: { class: "rating-options" },
                          voidElement: false,
                          children: 
                            numberedOptions.map((_, count) =>
                              ({
                                type: 'tag',
                                name: 'label',
                                attrs: { class: "rating-option" },
                                voidElement: false,
                                children: [
                                  {
                                    type: 'tag',
                                    name: 'input',
                                    attrs: { class: "response-value", type: "radio", name: zone.get('id'), value: count },
                                    voidElement: true
                                  },
                                  {
                                    type: 'tag',
                                    name: 'span',
                                    voidElement: false,
                                    children: [
                                      {
                                        type: 'text',
                                        content: count
                                      }
                                    ]
                                  }
                                ]
                              })
                            )
                        },
                        {
                          type: 'tag',
                          name: 'div',
                          attrs: { class: "rating-labels row" },
                          voidElement: false,
                          children: [
                            {
                              type: 'tag',
                              name: 'div',
                              attrs: { class: "col-md-6 left" },
                              voidElement: false,
                              children: [
                                {
                                  type: 'tag',
                                  name: 'small',
                                  attrs: { class: "text-muted" },
                                  voidElement: false,
                                  children: [
                                    {
                                      type: 'text',
                                      content: leftRatingLabel
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              type: 'tag',
                              name: 'div',
                              attrs: { class: "col-md-6 right text-right" },
                              voidElement: false,
                              children: [
                                {
                                  type: 'tag',
                                  name: 'small',
                                  attrs: { class: "text-muted" },
                                  voidElement: false,
                                  children: [
                                    {
                                      type: 'text',
                                      content: rightRatingLabel
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

RatingEditor.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  localState: PropTypes.instanceOf(Map).isRequired,
  zone: PropTypes.instanceOf(Map).isRequired
};
