import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';

import BoldButton from '../icons/BoldButton';
import ItalicButton from '../icons/ItalicButton';
import UnderlineButton from '../icons/UnderlineButton';
import SelectSizeButton from '../icons/SelectSizeButton';

export class RichTextEditor extends React.Component {

  componentWillReceiveProps(nextProps) {
    const { value, editorState } = this.props;
    const content = (value && value.content) || '<p>Edit This Text</p>';
    if (nextProps.isEditing && !editorState && !nextProps.editorState) {
      const initialEditorState = EditorState.createWithContent(convertFromHTML(content));
      this.handleEditorStateChange(initialEditorState);
    }
  }

  render() {
    const { isEditing, value, editorState } = this.props;

    const content = (value && value.content) || '<p>Edit This Text</p>';

    const wrapperStyle = {};
    if (value.height) {
      wrapperStyle.height = value.height;
    }
    if (value.width) {
      wrapperStyle.width = value.width;
    }

    return (
      <div ref={(el) => this.wrapper = el} style={wrapperStyle}>
        { (isEditing) ? (
          (editorState) ? (
            <Editor
              ref={(editor) => this.editor = editor}
              editorState={editorState}
              onChange={(s) => this.handleEditorStateChange(s)}
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
    const { height, width } = this.props && this.props.value;
    const html = convertToHTML(editorState.getCurrentContent());
    this.saveChanges({
      editorState,
      content: html,
      height,
      width
    });
  }

  saveChanges(value) {
    const content = value.content || '';
    let styles = '';
    if (value.height) {
      styles += `height:${value.height};`;
    }
    if (value.width) {
      styles += `width:${value.width};`;
    }
    const stylesTag = (styles && styles.length) ? `style="${styles}"` : null;
    this.props.onChange({
      value: {
        content
      },
      editorState: value.editorState,
      html: `<div ${stylesTag}><div>${content}</div></div>`
    });
  }
}

RichTextEditor.propTypes = {
  editorState: React.PropTypes.any,
  isEditing: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.object.isRequired
};

export class RichTextToolbar extends React.Component {
  render() {
    return (
      <div>
        <a href="#" onClick={(e) => this.handleFormat(e, 'BOLD')}><BoldButton hideBackground={true} color="#808080" /></a>
        <a href="#" onClick={(e) => this.handleFormat(e, 'ITALIC')}><ItalicButton hideBackground={true} color="#808080" /></a>
        <a href="#" onClick={(e) => this.handleFormat(e, 'UNDERLINE')}><UnderlineButton hideBackground={true} color="#808080" /></a>
        <a href="#" onClick={(e) => this.showToolbar(e, SizeToolbar)}><SelectSizeButton hideBackground={true} color="#808080" /></a>
      </div>
    );
  }

  handleFormat(e, type) {
    const { editorState, onChange } = this.props;
    e.preventDefault();
    onChange(RichUtils.toggleInlineStyle(editorState, type));
  }

  showToolbar(e, Toolbar) {
    e.preventDefault();
    this.props.onShowSecondaryToolbar(Toolbar);
  }
}

RichTextToolbar.propTypes = {
  editorState: React.PropTypes.any,
  onChange: React.PropTypes.func.isRequired,
  onShowSecondaryToolbar: React.PropTypes.func
};

export class SizeToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: props.height || '',
      width: props.width || ''
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
    this.props.onSave(this.state);
  }
}
SizeToolbar.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  height: React.PropTypes.number,
  width: React.PropTypes.number
};