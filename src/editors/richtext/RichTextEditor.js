import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { decorator, convertFromHTML, convertToHTML, customStyleFn, blockStyleFn } from '../../helpers/draft/convert';
import { placeholderStyle } from '../../helpers/styles/editor';

export default class RichTextEditor extends React.Component {

  componentWillMount() {
    const { persistedState } = this.props;
    const htmlContent = persistedState.get('content');
    const initialEditorState = htmlContent ?
      EditorState.createWithContent(convertFromHTML(htmlContent), decorator)
      : EditorState.createEmpty(decorator);
    this.handleEditorStateChange(initialEditorState);
  }

  componentWillReceiveProps(nextProps) {
    const { persistedState } = this.props;

    const htmlContent = persistedState.get('content');

    if (nextProps.isEditing && nextProps.localState.isEmpty()) {
      // If there is no editorState, create a new blank one
      const initialEditorState = htmlContent ?
        EditorState.createWithContent(convertFromHTML(htmlContent), decorator)
        : EditorState.createEmpty(decorator);
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
    const { top, right, bottom, left } = persistedState.toJS();
    const editorState = localState.get('editorState');

    const content = (persistedState.get('content')) || '';

    const wrapperStyle = {};
    if (top) {
      wrapperStyle.marginTop = top;
    };
    if (right) {
      wrapperStyle.marginRight = right;
    };
    if (bottom) {
      wrapperStyle.marginBottom = bottom;
    };
    if (left) {
      wrapperStyle.marginLeft = left;
    };

    return (
      <div className="rich-text" ref={(el) => this.wrapper = el} style={wrapperStyle}>
        { (isEditing) ? (
          (editorState) ? (
            <Editor
              ref={(editor) => this.editor = editor}
              editorState={editorState}
              customStyleFn={customStyleFn}
              blockStyleFn={blockStyleFn}
              placeholder="Start typing"
              handleReturn={(e) =>
                {
                  if(e.shiftKey) {
                    this.handleEditorStateChange(RichUtils.insertSoftNewline(editorState));
                    return 'handled';
                  }
                  return 'not-handled';
                }
              }
              onChange={(editorState) => this.handleEditorStateChange(editorState)}
            />
          ) : null
        ) : (
          (content && content != '<p></p>') ? (
            <div
              dangerouslySetInnerHTML={{
                __html: content
              }}
            />
          ) : (
            <div style={ placeholderStyle }>Click to add your text</div>
          )
        )}
      </div>
    );
  }

  // Instance Method
  focus() {
    if (this.editor) {
      this.editor.focus();
    }
  }

  handleEditorStateChange(editorState) {
    const { persistedState, localState } = this.props;

    const htmlContent = convertToHTML(editorState);

    const newPersistedState = persistedState.set('content', htmlContent);
    const newLocalState = localState.set('editorState', editorState);

    this.props.onChange({
      persistedState: newPersistedState,
      localState: newLocalState,
      html: this.generateHTML(newPersistedState)
    });
  }

  generateHTML(persistedState) {
    const height = persistedState.get('height');
    const width = persistedState.get('width');
    const content = persistedState.get('content') || '';

    const { top, right, bottom, left } = persistedState.toJS();

    let styles = '';
    if (height) {
      styles += `height:${height};`;
    };
    if (width) {
      styles += `width:${width};`;
    };

    const isNotDefaultMargins = top || right || bottom || left;
    if (isNotDefaultMargins) {
      if (top) {
        styles = styles + `margin-top:${top}px;`;
      };
      if (right) {
        styles = styles + `margin-right:${right}px;`;
      };
      if (bottom) {
        styles = styles + `margin-bottom:${bottom}px;`;
      };
      if (left) {
        styles = styles + `margin-left:${left}px;`;
      };
    } 

    const stylesTag = (styles && styles.length) ? ` style="${styles}"` : '';

    const html = `<div class="rich-text"${stylesTag}><div>${content}</div></div>`;
    return html;
  }

}

RichTextEditor.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  localState: PropTypes.instanceOf(Map).isRequired
};
