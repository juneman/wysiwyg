import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';

import BoldButton from '../icons/BoldButton';
import ItalicButton from '../icons/ItalicButton';
import UnderlineButton from '../icons/UnderlineButton';
import SelectSizeButton from '../icons/SelectSizeButton';

export class RichTextEditor extends React.Component {

  componentWillReceiveProps(nextProps) {
    const { persistedState } = this.props;

    const htmlContent = persistedState.get('content') || '<p>Edit This Text</p>';

    if (nextProps.isEditing && nextProps.localState.isEmpty()) {
      // If there is no editorState, create a new blank one
      const initialEditorState = EditorState.createWithContent(convertFromHTML(htmlContent));
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

    const content = (persistedState.get('content')) || '<p>Edit This Text</p>';

    const wrapperStyle = {};
    const height = persistedState.get('height');
    const width = persistedState.get('width');
    if (height) {
      wrapperStyle.height = height;
    } else {
      wrapperStyle.minHeight = 40;
    }
    if (width) {
      wrapperStyle.width = width;
    }

    return (
      <div ref={(el) => this.wrapper = el} style={wrapperStyle}>
        { (isEditing) ? (
          (editorState) ? (
            <Editor
              ref={(editor) => this.editor = editor}
              editorState={editorState}
              onChange={(editorState) => this.handleEditorStateChange(editorState)}
            />
          ) : null
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: content
            }}
          />
        )}
      </div>
    );
  }

  handleEditorStateChange(editorState) {
    const { persistedState, localState } = this.props;
    const htmlContent = convertToHTML(editorState.getCurrentContent());

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

    let styles = '';
    if (height) {
      styles += `height:${height};`;
    }
    if (width) {
      styles += `width:${width};`;
    }
    const stylesTag = (styles && styles.length) ? ` style="${styles}"` : '';

    const html = `<div${stylesTag}><div>${content}</div></div>`;
    return html;
  }

}

RichTextEditor.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  localState: PropTypes.instanceOf(Map).isRequired
};

export class RichTextToolbar extends React.Component {

  render() {
    const { localState } = this.props;
    const selectedToolbar = localState.get('selectedToolbar');

    const buttonProps = {
      hideBackground: true,
      color: '#808080',
      clickColor: '#333',
      activeColor: '#5e9bff'
    };

    return (
      <div>
        <BoldButton onClick={() => this.handleFormat('BOLD')} {...buttonProps} />
        <ItalicButton onClick={() => this.handleFormat('ITALIC')} {...buttonProps} />
        <UnderlineButton onClick={() => this.handleFormat('UNDERLINE')} {...buttonProps} />
        <SelectSizeButton onClick={() => this.showToolbar(SizeToolbar)} isActive={(selectedToolbar === 'selectSize')} {...buttonProps} />
      </div>
    );
  }

  handleFormat(type) {
    const { localState, persistedState, onChange } = this.props;
    const newLocalState = localState.set('editorState', RichUtils.toggleInlineStyle(localState.get('editorState'), type));
    onChange({
      localState: newLocalState,
      persistedState
    });
  }

  showToolbar(Toolbar) {
    const { onShowSecondaryToolbar, onChange, localState, persistedState } = this.props;
    const newLocalState = localState.set('selectedToolbar', 'selectSize');
    onChange({
      localState: newLocalState,
      persistedState
    });
    onShowSecondaryToolbar(Toolbar);
  }
}

RichTextToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onShowSecondaryToolbar: PropTypes.func.isRequired
};

export class SizeToolbar extends React.Component {
  constructor(props) {
    super(props);

    const { persistedState } = props;

    this.state = {
      height: persistedState.get('height') || '',
      width: persistedState.get('width') || ''
    };
  }

  render() {
    const { height, width } = this.state;

    const formStyles = {
      width: 500,
      margin: 20
    };
    const titleStyles = {
      textTransform: 'uppercase',
      fontSize: 'smaller',
      color: '#808080'
    };

    return (
      <div style={formStyles}>
        <div style={titleStyles}>Set Width and Height</div>
        <div style={{marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: 20}}>
          <div style={{gridColumn: 1, gridRow: 1}}>
            <strong>Width:</strong><br/>
            <input className="form-control" type="number" step="1" min="10" max="1000" value={width} onChange={(e) => this.handleInputChange(e, 'width')} />
          </div>
          <div style={{gridColumn: 2, gridRow: 1}}>
            <strong>Height:</strong><br/>
            <input className="form-control" type="number" step="1" min="10" max="1000" value={height} onChange={(e) => this.handleInputChange(e, 'height')} />
          </div>
          <div style={{gridColumn: 2, gridRow: 2, textAlign: 'right'}}>
            <button className="btn" onClick={(e) => this.handleSave(e)}>Save</button>
          </div>
        </div>
      </div>
    );
  }

  handleInputChange(e, name) {
    const val = e.currentTarget.value;
    const update = {};
    if (val && val.length) {
      update[name] = parseInt(val);
      this.setState(update);
    }
  }

  handleSave(e) {
    e.preventDefault();
    const { localState, persistedState } = this.props;
    const { height, width } = this.state;
    
    const newPersistedState = persistedState
      .set('height', height)
      .set('width', width);

    const newLocalState = localState.delete('selectedToolbar');
      
    this.props.onSave({
      localState: newLocalState,
      persistedState: newPersistedState
    });
  }
}
SizeToolbar.propTypes = {
  onSave: PropTypes.func.isRequired,
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired
};