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
    const { isEditing, persistedState, localState, canvasPosition } = this.props;
    const { url } = persistedState.toJS();

    const editorState = localState.get('editorState');
    const content = (persistedState.get('content')) || defaultContent;

    const wrapperStyle = {
      minHeight: 120,
      backgroundImage: (url) ? `url(${url})` : null,
      backgroundSize: 'cover',
      textAlign: 'center',
      marginLeft: -20,
      marginRight: -20,
      marginTop: -20,
      marginBottom: 15,
      padding: 20,
      display: 'inline-block'
    };

    const textStyle = {
      width: canvasPosition.get('width')
    };

    return (
      <div className="hero" style={wrapperStyle}>
        { (isEditing) ? (
          (editorState) ? (
            <div style={textStyle}>
              <Editor
                ref={(editor) => this.editor = editor}
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
    const { url, content } = persistedState.toJS();
    const contentAst = HTMLParser.parse(content || '');
    const wrapperStyles = [];
    wrapperStyles.push('display:inline-block');
    wrapperStyles.push('min-height:120px');
    wrapperStyles.push('background-size:cover');
    wrapperStyles.push('text-align:center');
    wrapperStyles.push('margin: -20px -20px 15px');
    wrapperStyles.push('padding: 20px');

    if (url) {
      wrapperStyles.push(`background-image:url(${url})`);
    }
    const textAttrs = {};
    const width = canvasPosition.get('width');
    if (width) {
      textAttrs.style = `width:${ width }px;`;
    }

    const ast = [
      {
        type: 'tag',
        name: 'div',
        voidElement: false,
        attrs: {
          class: 'hero',
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
    if (this.editor) {
      this.editor.focus();
    }
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

