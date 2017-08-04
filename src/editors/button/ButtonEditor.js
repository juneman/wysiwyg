import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Editor, EditorState } from 'draft-js';
import HTMLParser from 'html-parse-stringify2';
import striptags from 'striptags';
import { decorator, convertFromHTML, convertToHTML, customStyleFn, blockStyleFn } from '../../helpers/draft/convert';
import { getButtonStyleString } from '../../helpers/styles/editor';

export default class ButtonEditor extends React.Component {

  componentWillMount() {
    const { persistedState, localState, onChange } = this.props;
    const content = persistedState.get('buttonText') || `OK, Got it!`;

    const initialEditorState = EditorState.createWithContent(convertFromHTML(content), decorator);
    this.handleEditorStateChange(initialEditorState);

    const marginTop = persistedState.get('marginTop');
    const marginBottom = persistedState.get('marginBottom');
    console.log('LOG ButtonEditor will mount', marginTop, marginBottom)
    const newPersistedState = persistedState
      .set('marginTop', marginTop || 5)
      .set('marginBottom', marginBottom || 5)

    onChange({
      localState: localState,
      persistedState: newPersistedState
    })
  }

  componentWillReceiveProps(nextProps) {
    const { persistedState } = this.props;

    const content = persistedState.get('buttonText') || `OK, Got it!`;

    if (nextProps.isEditing && nextProps.localState.isEmpty()) {
      // If there is no editorState, create a new blank one
      const initialEditorState = EditorState.createWithContent(convertFromHTML(content), decorator);
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
    const hasButtonTextChanged = localState.get('buttonText') != nextProps.localState.get('buttonText');

    if (hasButtonTextChanged){
      return false;
    }

    return true;
  }

  render() {
    const { isEditing, persistedState, localState, zone } = this.props;
    const editorState = localState.get('editorState');

    const buttonText = persistedState.get('buttonText') || "OK, Got it!";

    const { textAlign, className, marginTop, marginRight, marginBottom, marginLeft } = persistedState.toJS();
    const buttonStyleProps = [ 'borderRadius', 'padding', 'width', 'fontSize'];
    const classNameString = (className && className.length) ? ' ' + className : '';

    const containerStyle = {};
    containerStyle.textAlign = textAlign ? textAlign : 'center';
    containerStyle.marginTop = marginTop || 5;
    containerStyle.marginBottom = marginBottom || 5;

    if (marginRight) {
      containerStyle.marginRight = marginRight;
    };
    if (marginLeft) {
      containerStyle.marginLeft = marginLeft;
    };
    containerStyle.width = '100%';

    const buttonStyle = {};
    buttonStyleProps.forEach((key) => {
      if (persistedState.get(key)) {
        buttonStyle[key] = persistedState.get(key)
      }
    });

    const updatedButtonStyle = {
      ...buttonStyle,
      textAlign: 'center'
    }

    return (
      <div className="button-wrapper appcues-actions-right appcues-actions-left" style={containerStyle}>
        { (isEditing) ? (
          (editorState) ? (
            <a className="appcues-button appcues-button-success"
              style={{display: 'inline-block', cursor: 'text', ...updatedButtonStyle }}
              contentEditable
              onInput={ (e) => this.onChangeButtonText(e.target.textContent) }
              >{buttonText}
            </a>
          ) : null
        ) : (
          <a
            className={`appcues-button appcues-button-success ${classNameString}`}
            style={updatedButtonStyle}
            disabled={true}
            data-field-id={zone.get('id')}>
            {buttonText}
          </a>
        )}
      </div>
    );
  }

  // Instance Method
  focus() {
    // if (this.editor) {
    //   this.editor.focus();
    // }
  }

  onChangeButtonText(text) {
    const { persistedState, localState, onChange } = this.props;
    const newPersistedState = persistedState.set('buttonText', text);
    const newLocalState = localState.set('buttonText', text);

    onChange({
      persistedState: newPersistedState,
      localState: newLocalState,
      html: this.generateHTML(newPersistedState)
    });
  }

  handleEditorStateChange(editorState) {
    const { persistedState, localState, onChange } = this.props;
    const htmlContent = convertToHTML(editorState);

    const newPersistedState = persistedState.set('content', htmlContent);
    const newLocalState = localState.set('editorState', editorState);

    onChange({
      persistedState: newPersistedState,
      localState: newLocalState,
      html: this.generateHTML(newPersistedState)
    });
  }

  generateHTML(persistedState) {
    const { zone } = this.props;
    const { content, textAlign, href, borderRadius, padding, fontSize, width, className, isNewWindow, buttonAction, marginTop, marginRight, marginBottom, marginLeft } = persistedState.toJS();

    const wrapperAttrs = {
      class: 'button-wrapper appcues-actions-right appcues-actions-left'
    };
    wrapperAttrs.style = `width:100%;textAlign:${textAlign ? textAlign : 'center'};`;

    wrapperAttrs.style = wrapperAttrs.style + `marginTop:${marginTop || 5}px;`;
    wrapperAttrs.style = wrapperAttrs.style + `marginBottom:${marginBottom || 5}px;`;
    if (marginRight) {
      wrapperAttrs.style = wrapperAttrs.style + `marginRight:${marginRight}px;`;
    };
    if (marginLeft) {
      wrapperAttrs.style = wrapperAttrs.style + `marginLeft:${marginLeft}px;`;
    };

    const buttonAttrs = {
      class: 'appcues-button-success appcues-button',
      ['data-field-id']: zone.get('id')
    };
    buttonAttrs.style = getButtonStyleString(borderRadius, padding, fontSize, width);

    if (href) {
      buttonAttrs.href = href;
      buttonAttrs.target = (isNewWindow) ? '_target' : '_self';
    } else if (buttonAction) {
      buttonAttrs['data-step'] = buttonAction;
    }

    const buttonText = persistedState.get('buttonText') || "OK, Got it!"

    const ast = [];
    ast.push({
      type: 'tag',
      name: 'div',
      voidElement: false,
      attrs: wrapperAttrs,
      children: [
        {
          type: 'tag',
          name: 'a',
          voidElement: false,
          attrs: buttonAttrs,
          children: [
            {
              type: 'text',
              content: buttonText
            }
          ]
        }
      ]
    });

    return HTMLParser.stringify(ast);
  }

}

ButtonEditor.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  localState: PropTypes.instanceOf(Map).isRequired,
  zone: PropTypes.instanceOf(Map).isRequired
};
