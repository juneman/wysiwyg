import React from 'react';

import PlainText from '../editors/PlainText';
import Button from '../editors/Button';

export default class Zone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      hover: false,
      content: props.content || '',
      draftContent: '',
      html: '',
      draftHtml: '',
      type: props.type || null
    };

    this.baseHoverStateStyle = {
      border: '1px dashed #C0C0C0'
    };
    this.baseActiveStateStyle = {
      border: '1px dashed #008800'
    };
    this.containerStyle = {
      width: '99%',
      margin: '0 auto 3px auto'
    };
    this.zoneStyle = {
      padding: '1em',
      border: '1px solid #FFFFFF'
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.content && nextProps.content !== this.props.content) {
      this.setState({
        content: nextProps.content
      });
    }
  }

  render() {
    const { active, hover, type, content, html } = this.state;
    const { column } = this.props;

    const hoverStateStyle = (hover) ? this.baseHoverStateStyle : null;
    const activeStateStyle = (active) ? this.baseActiveStateStyle : null;
    const zoneStyle = Object.assign({}, this.zoneStyle, hoverStateStyle, activeStateStyle);

    // Common props across all editors
    let editorNode;
    const editorProps = {
      content,
      onChange: (content) => this.saveDraft(content),
      ref: (editor) => { this.activeEditor = editor; }
    };

    switch (type) {
      case 'PlainText':
        editorNode = (<PlainText {...editorProps} />);
        break;
      case 'Button':
        editorNode = (<Button {...editorProps} />);
        break;
    }

    const editor = (
      <div>
        <div className="edit">
          {editorNode}
        </div>
        <button onClick={(e) => this.save(e)}>Save</button>
        <button onClick={(e) => this.cancel(e)}>Cancel</button>
      </div>
    );

    const preview = (
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: html
        }}>
      </div>
    );

    const editorSelector = (
      <div>
        <div className="editor-selector" style={{color: '#000088', textAlign: 'center'}}>
          <a href="#" onClick={(e) => this.setType(e, 'PlainText')}>Plain Text</a> &nbsp; | &nbsp; 
          <a href="#" onClick={(e) => this.setType(e, 'Button')}>Button</a>
        </div>
      </div>
    );

    let main;
    if (active && type) {
      main = editor;
    } else if (active) {
      main = editorSelector;
    } else {
      main = preview;
    }

    return (
      <div
        className={`zone-container zone-${column}`}
        style={this.containerStyle}
        onMouseEnter={() => this.toggleHover(true)}
        onMouseLeave={() => this.toggleHover(false)}
        onClick={(e) => this.toggleEditMode(e)}
      >
        <div className="zone" style={zoneStyle}>
          {main}
        </div>
      </div>
    );
  }

  toggleHover(active) {
    this.setState({
      hover: active
    });
  }

  toggleEditMode(e) {
    e.preventDefault();
    const { active } = this.state;
    if (active) {
      return;
    }
    this.setState({
      active: true
    });
  }

  setType(e, type) {
    e.preventDefault();
    this.setState({type});
  }

  saveDraft(editor) {
    this.setState({
      draftContent: editor.content,
      html: editor.html
    });
  }

  save(e) {
    e.preventDefault();
    const { draftContent, html, type } = this.state;
    const { id } = this.props;
    this.props.onSave({
      id,
      type,
      content: draftContent,
      html: `
        <div class="zone-container">
          <div class="zone">
            <div class="content">
              ${html}
            </div>
          </div>
        </div>
      `
    });
    this.setState({
      active: false
    });
  }

  cancel(e) {
    e.preventDefault();
    const { content } = this.state;

    this.setState({
      active: false,
      content,
      draftContent: content,
      html: ''
    });

    // Force the underlying editor component to resave with the old data
    if (this.activeEditor) {
      this.activeEditor.saveChanges(content);
    }
  }
}

Zone.propTypes = {
  id: React.PropTypes.string.isRequired,
  onSave: React.PropTypes.func.isRequired,
  column: React.PropTypes.number.isRequired,
  content: React.PropTypes.string,
  type: React.PropTypes.string
};
