import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { Editor, EditorState } from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';

const defaultContent = '<h1>Title Text</h1><h2>Subtitle Text</h2>';

export default class HeroEditor extends React.Component {

  componentWillMount() {
    const { persistedState } = this.props;
    const htmlContent = persistedState.get('content') || defaultContent;
    const initialEditorState = EditorState.createWithContent(convertFromHTML(htmlContent));
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
        const initialEditorState = EditorState.createWithContent(convertFromHTML(htmlContent));
        this.handleEditorStateChange(initialEditorState);
      }
    }
  }

  render() {
    const { isEditing, persistedState, localState, zonePosition } = this.props;
    const { url, height, width, heightOverride, widthOverride } = persistedState.toJS();

    const editorState = localState.get('editorState');

    const content = (persistedState.get('content')) || defaultContent;

    const wrapperStyle = {
      minHeight: 200
    };

    const textStyle = {
      position: 'absolute',
      width: zonePosition.get('width'),
      textAlign: 'center',
      zIndex: 5
    };

    return (
      <div ref={(el) => this.wrapper = el} style={wrapperStyle}>
        { (isEditing) ? (
          (editorState) ? (
            <div style={textStyle}>
              <Editor
                editorState={editorState}
                onChange={(editorState) => this.handleEditorStateChange(editorState)}
              />
            </div>
          ) : null
        ) : (
          <div
            style={textStyle}
            dangerouslySetInnerHTML={{
              __html: content
            }}
          />
        )}
        <img src={url} height={heightOverride || height} width={widthOverride || width} />
      </div>
    );
  }

  generateHTML(persistedState) {
    const { url, height, width, heightOverride, widthOverride, content } = persistedState.toJS();
    const zoneWidth = Math.floor(this.props.zonePosition.get('width'));

    const html = `
      <div>
        <div style="position:absolute;z-index:5,text-align:center,width:${zoneWidth}">${content}</div>
        <img src="${url}" height="${heightOverride || height}" width="${widthOverride || width}" />
      </div>
    `;
    return html;
  }

  handleEditorStateChange(editorState) {
    const { persistedState, localState, onChange } = this.props;
    const htmlContent = convertToHTML(editorState.getCurrentContent());

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

