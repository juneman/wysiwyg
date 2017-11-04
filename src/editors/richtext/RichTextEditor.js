import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import { decorator, convertFromHTML, convertFromPastedHTML, convertToHTML, customStyleFn, blockStyleFn, getResetSelection } from '../../helpers/draft/convert';
import { placeholderStyle } from '../../helpers/styles/editor';

export default class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentWillMount() {
    const { persistedState } = this.props;
    const htmlContent = persistedState.get('content');
    const initialEditorState = htmlContent ?
      EditorState.createWithContent(convertFromHTML(htmlContent), decorator)
      : EditorState.createEmpty(decorator);
    this.handleEditorStateChange(initialEditorState);

  }

  componentDidMount() {
    if (this.wrapper) {
      window.addEventListener('mouseup', this.onMouseUp, true)
    }
  }

  onMouseUp(e) {
    e.preventDefault();
    const { localState, isEditing } = this.props;

    if (isEditing) {

      // If mouseUp happened over a Toolbar element,
      // don't reset editor focus.
      const toolbarElement = document.getElementById('appcues-host').shadowRoot.firstChild.getElementsByClassName('resolved')[0].shadowRoot.firstChild.querySelectorAll('[name="EditorWrapperEditingToolbar"]');
      const hasToolbarElement = toolbarElement && toolbarElement.length;

      if (hasToolbarElement && ReactDOM.findDOMNode(toolbarElement[0]).contains(e.path[0])) {
        return;
      }

      if (this.editor && !ReactDOM.findDOMNode(this.wrapper).contains(e.path[0])){
          this.editor.blur();
          const editorState = localState.get('editorState');
          const newEditorState = EditorState.forceSelection(editorState, getResetSelection(editorState));
          this.handleEditorStateChange(newEditorState);
      }

    }

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

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onMouseUp, true)
  }

  render() {
    const { isEditing, persistedState, localState } = this.props;
    const { marginTop, marginRight, marginBottom, marginLeft } = persistedState.toJS();
    const editorState = localState.get('editorState');

    const content = (persistedState.get('content')) || '';

    const wrapperStyle = { zIndex: 483647 };
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
      <div className="rich-text"
        ref={(el) => this.wrapper = el}
        style={wrapperStyle}>
        <style>{'.rich-text strong{color: inherit !important;}'}</style>
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
              handlePastedText={(text, html, editorState) => this.handlePastedText(text, html, editorState)}
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

  handlePastedText(text, html, editorState) {
    const { persistedState, localState, onChange } = this.props;

    // Regex search for HTML tags within html clipboard content
    const containsHTML = /<[a-z][\s\S]*>/i.test(html);

    if (containsHTML) {
      const newContent = convertFromPastedHTML(html).getBlockMap();
      const newContentState = Modifier.replaceWithFragment(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        newContent
      );

      const newEditorState = EditorState.push(editorState, newContentState);
      const newLocalState = localState.set('editorState', newEditorState)
      const newPersistedState = persistedState.set('content', html)

      onChange({
        persistedState: newPersistedState,
        localState: newLocalState,
        html: this.generateHTML(newPersistedState)
      })
      return true;
    }
    return false
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

    const { marginTop, marginRight, marginBottom, marginLeft } = persistedState.toJS();

    let styles = '';
    if (height) {
      styles += `height:${height};`;
    };
    if (width) {
      styles += `width:${width};`;
    };

    if (marginTop) {
      styles = styles + `margin-top:${marginTop}px;`;
    };
    if (marginRight) {
      styles = styles + `margin-right:${marginRight}px;`;
    };
    if (marginBottom) {
      styles = styles + `margin-bottom:${marginBottom}px;`;
    };
    if (marginLeft) {
      styles = styles + `margin-left:${marginLeft}px;`;
    };

    const stylesTag = (styles && styles.length) ? ` style="${styles}"` : '';

    const styleOverride = `<style>.rich-text strong{color:inherit !important;}</style>`;
    const html = `<div class="rich-text"${stylesTag}>${styleOverride}<div>${content}</div></div>`;
    return html;
  }

}

RichTextEditor.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  localState: PropTypes.instanceOf(Map).isRequired
};
