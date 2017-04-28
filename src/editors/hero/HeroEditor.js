import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { Editor, EditorState } from 'draft-js';
import { decorator, convertFromHTML, convertToHTML, customStyleFn, blockStyleFn } from '../../helpers/draft/convert';

const defaultContent = '<h1>Title Text</h1><h2>Subtitle Text</h2>';

export default class HeroEditor extends React.Component {

  componentWillMount() {
    const { persistedState } = this.props;
    const htmlContent = persistedState.get('content') || defaultContent;
    const initialEditorState = EditorState.createWithContent(convertFromHTML(htmlContent), decorator);
    this.handleEditorStateChange(initialEditorState);
  }

  componentWillUpdate(nextProps) {
    const { persistedState } = this.props;
    const htmlContent = persistedState.get('content') || defaultContent;
    if (nextProps.isEditing) {
      // If editorState changes from the toolbar, push any changes up the chain
      const oldEditorState = this.props.localState.get('editorState');
      const newEditorState = nextProps.localState.get('editorState');
      if (oldEditorState !== newEditorState) {
        this.handleEditorStateChange(newEditorState);
      } else if (!newEditorState) {
        const initialEditorState = EditorState.createWithContent(convertFromHTML(htmlContent), decorator);
        this.handleEditorStateChange(initialEditorState);
      }
    }
  }

  render() {
    const { isEditing, persistedState, localState, zonePosition } = this.props;
    const { url } = persistedState.toJS();

    const editorState = localState.get('editorState');
    const content = (persistedState.get('content')) || defaultContent;

    const wrapperStyle = {
      minHeight: 120,
      backgroundImage: (url) ? `url(${url})` : null,
      backgroundSize: 'cover',
      textAlign: 'center'
    };

    const textStyle = {
      width: zonePosition.get('width')
    };

    return (
      <div className="hero" style={wrapperStyle}>
        { (isEditing) ? (
          (editorState) ? (
            <div style={textStyle}>
              <Editor
                editorState={editorState}
                customStyleFn={customStyleFn}
                blockStyleFn={blockStyleFn}
                onChange={(editorState) => this.handleEditorStateChange(editorState)}
              />
            </div>
          ) : null
        ) : (
          <div
            className="hero-content"
            style={textStyle}
            dangerouslySetInnerHTML={{
              __html: content
            }}
          />
        )}
      </div>
    );
  }

  generateHTML(persistedState) {
    const { url, content } = persistedState.toJS();
    const urlStyle = (url) ? `background-image:url(${url});background-size:cover;` : '';

    const html = `
      <div class="hero" style="min-height:120px;text-align:center;${urlStyle}">
        <div class="hero-content">${content}</div>
      </div>
    `;
    return html;
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

}

HeroEditor.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  localState: PropTypes.instanceOf(Map).isRequired,
  canvasPosition: PropTypes.instanceOf(Map).isRequired,
  zonePosition: PropTypes.instanceOf(Map).isRequired
};

