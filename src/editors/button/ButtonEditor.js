import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Editor, EditorState } from 'draft-js';
import { decorator, convertFromHTML, convertToHTML, customStyleFn, blockStyleFn } from '../../helpers/draft/convert';

export default class ButtonEditor extends React.Component {

  componentWillMount() {
    const { persistedState } = this.props;
    const htmlContent = persistedState.get('content') || '<span>Button Text</span>';
    const initialEditorState = EditorState.createWithContent(convertFromHTML(htmlContent), decorator);
    this.handleEditorStateChange(initialEditorState);
  }

  componentWillReceiveProps(nextProps) {
    const { persistedState } = this.props;

    const htmlContent = persistedState.get('content') || '<span>Button Text</span>';

    if (nextProps.isEditing && nextProps.localState.isEmpty()) {
      // If there is no editorState, create a new blank one
      const initialEditorState = EditorState.createWithContent(convertFromHTML(htmlContent), decorator);
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
    const { textAlign, className } = persistedState.toJS();
    const buttonStyleProps = ['backgroundColor', 'borderRadius', 'padding', 'width', 'fontSize'];

    const containerStyle = {};
    if (textAlign) {
      containerStyle.textAlign = textAlign;
    }
    const buttonStyle = {};
    buttonStyleProps.forEach((key) => {
      if (persistedState.get(key)) {
        buttonStyle[key] = persistedState.get(key);
      }
    });

    return (
      <div className="button-wrapper" style={containerStyle}>
        { (isEditing) ? (
          (editorState) ? (
            <div className="btn" style={{display: 'inline-block', ...buttonStyle}}>
            <Editor
              editorState={editorState}
              customStyleFn={customStyleFn}
              blockStyleFn={blockStyleFn}
              onChange={(editorState) => this.handleEditorStateChange(editorState)}
            />
            </div>
          ) : null
        ) : (
          <button className={`btn ${className}`} style={buttonStyle} disabled>
            <span
              dangerouslySetInnerHTML={{__html: content}}
            />
          </button>
        )}
      </div>
    );
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
    const content = persistedState.get('content') || '';
    const textAlign = persistedState.get('textAlign');
    const backgroundColor = persistedState.get('backgroundColor');

    const wrapperStyle = (textAlign) ? ` style="text-align:${textAlign}"` : '';
    const buttonStyle = (backgroundColor) ? `style="background-color:${backgroundColor};"` : '';

    return `
      <div class="button-wrapper"${wrapperStyle}>
        <button class="btn"${buttonStyle}>
          <span>${content}</span>
        </button>
      </div>
    `;
  }

}

ButtonEditor.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  localState: PropTypes.instanceOf(Map).isRequired
};
