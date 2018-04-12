import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import HTMLParser from 'html-parse-stringify2';

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
    if (nextProps.isEditing && nextProps.localState.isEmpty()) {
      // If there is no editorState, create a new blank one
      const initialEditorState = htmlContent ?
        EditorState.createWithContent(convertFromHTML(htmlContent), decorator)
        : EditorState.createEmpty(decorator);
      this.handleEditorStateChange(initialEditorState);
    }
    else if (nextProps.isEditing) {
      // If editorState changes from the toolbar, push any changes up the chain
      const oldEditorState = this.props.localState.get('editorState');
      const newEditorState = nextProps.localState.get('editorState');
      if (oldEditorState !== newEditorState) {
        this.handleEditorStateChange(newEditorState);
      }
    }
  }

  render() {
    const { isEditing, persistedState, localState, canvasPosition } = this.props;
    const { url, gradient, backgroundType } = persistedState.toJS();

    const editorState = localState.get('editorState');
    const content = (persistedState.get('content')) || defaultContent;

    const minHeight = persistedState.get('minHeight') || 250;
    const zoom = persistedState.get('zoom') ? `${persistedState.get('zoom')}%` : 'cover';

    const backgroundStyle = (url && backgroundType == 'url') ? `url(${url})` :
                            (gradient && backgroundType == 'linear-gradient') ? `linear-gradient(${gradient})` :
                            `linear-gradient(0deg, rgba(0,0,0,0.3), rgba(0,0,0,0.3))`;

    const wrapperStyle = {
      minHeight,
      backgroundImage: backgroundStyle,
      backgroundSize: zoom,
      textAlign: 'center'
    };

    return (
      <div className="hero apc-hero" style={wrapperStyle}>
        { (isEditing) ? (
          (editorState) ? (
            <Editor
              ref={(editor) => this.editor = editor}
              editorState={editorState}
              customStyleFn={customStyleFn}
              blockStyleFn={blockStyleFn}
              onChange={(editorState) => this.handleEditorStateChange(editorState)}
            />
          ) : null
        ) : (
          <div
            className="hero-content"
            ref={ (el) => this._heroContent = el }
            dangerouslySetInnerHTML={{
              __html: content
            }}
          />
        )}
      </div>
    );
  }

  generateHTML(persistedState) {
    const { canvasPosition } = this.props;
    const { url, gradient, backgroundType, content, minHeight } = persistedState.toJS();
    const contentAst = HTMLParser.parse(content || '');
    const wrapperStyles = [];
    const zoom = persistedState.get('zoom') ? `${persistedState.get('zoom')}%` : 'cover';
    wrapperStyles.push(`min-height:${minHeight}px`);
    wrapperStyles.push(`background-size:${zoom}`);
    wrapperStyles.push('text-align:center');

    const backgroundStyle = (url && backgroundType == 'url') ? `url(${url})` :
                            (gradient && backgroundType == 'linear-gradient') ? `linear-gradient(${gradient})` :
                            null;

    if (backgroundStyle) {
      wrapperStyles.push(`background-image:${backgroundStyle}`);
    }
    const textAttrs = {};

    const ast = [
      {
        type: 'tag',
        name: 'div',
        voidElement: false,
        attrs: {
          class: 'hero apc-hero',
          style: wrapperStyles.join(';') + ';'
        },
        children: [
          {
            type: 'tag',
            name: 'div',
            voidElement: false,
            attrs: {
              class: 'hero-content',
              ...textAttrs
            },
            children: contentAst
          }
        ]
      }
    ];

    return HTMLParser.stringify(ast);
  }

  // Instance Method
  focus() {
    // Do nothing for this editor
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

