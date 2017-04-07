import React from 'react';
import isEqual from 'lodash.isequal';

import RichText from '../editors/RichText';
import Button from '../editors/Button';
import EditorWrapper from './EditorWrapper';

export default class Zone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      isHover: false,
      value: props.value || {},
      draftValue: {},
      html: '',
      draftHtml: '',
      type: props.type || null
    };

    this.baseHoverStateStyle = {
      border: '2px dotted #f4ad42'
    };
    this.baseActiveStateStyle = {
      border: '2px dotted #008800'
    };
    this.containerStyle = {
      width: '99%',
      margin: '0 auto 3px auto'
    };
    this.zoneStyle = {
      padding: '1em',
      border: '2px solid #FFFFFF'
    };
  }

  componentDidMount() {
    // Force the underlying editor component to resave with the old data
    if (this.activeEditor) {
      this.activeEditor.saveChanges(this.state.value);
      setTimeout(() => {
        this.save();
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.value, this.props.value)) {
      this.setState({value: nextProps.value});
    }
  }

  render() {
    const { isEditing, isHover, type, value } = this.state;
    const { columnIndex } = this.props;

    const hoverStateStyle = (isHover) ? this.baseHoverStateStyle : null;
    const activeStateStyle = (isEditing) ? this.baseActiveStateStyle : null;
    const zoneStyle = Object.assign({}, this.zoneStyle, hoverStateStyle, activeStateStyle);

    // Common props across all editors
    let editorNode;
    const editorProps = {
      value,
      isEditing,
      onChange: (value) => this.saveDraft(value),
      ref: (editor) => { this.activeEditor = editor; }
    };

    switch (type) {
      case 'RichText':
        editorNode = (<RichText {...editorProps} />);
        break;
      case 'Button':
        editorNode = (<Button {...editorProps} />);
        break;
    }

    const main = (type) ? (
      <EditorWrapper
        isEditing={isEditing}
        isHover={isHover}
        onEdit={() => this.setState({isEditing: true})}
        onSave={() => this.save()}
        onCancel={() => this.cancel()}
        onRemove={() => this.remove()}
      >{editorNode}</EditorWrapper>
    ) : null;

    return (
      <div
        className={`zone-container zone-${columnIndex}`}
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
    const { isCanvasInEditMode } = this.props;
    if (!isCanvasInEditMode) {
      this.setState({
        isHover: active
      });
    }
  }

  toggleEditMode(e) {
    e.preventDefault();
    const { isEditing } = this.state;
    const { onToggleEditMode } = this.props;
    if (isEditing) {
      return;
    }
    this.setState({
      isEditing: true
    });
    onToggleEditMode(true);
  }

  setType(type) {
    this.setState({type});
  }

  saveDraft(editor) {
    this.setState({
      draftValue: editor.value,
      html: editor.html
    });
  }

  save() {
    const { draftValue, html, type } = this.state;
    const { id, onToggleEditMode } = this.props;
    this.props.onSave({
      id,
      type,
      value: draftValue,
      html: `
        <div class="zone-container">
          <div class="zone">
            <div class="content">
              ${html || ''}
            </div>
          </div>
        </div>
      `
    });
    this.setState({
      isEditing: false,
      isHover: false
    });
    onToggleEditMode(false);
  }

  cancel() {
    const { value } = this.state;
    const { onToggleEditMode } = this.props;
    this.setState({
      isEditing: false,
      isHover: false,
      value,
      draftValue: value,
      html: ''
    });
    onToggleEditMode(false);
  }

  remove() {
    const { onToggleEditMode } = this.props;
    this.setState({
      isEditing: false,
      isHover: false,
      value: {},
      draftValue: {},
      html: '',
      draftHtml: '',
      type: null
    });
    this.props.onRemove();
    onToggleEditMode(false);
  }
}

Zone.propTypes = {
  id: React.PropTypes.string.isRequired,
  isCanvasInEditMode: React.PropTypes.bool.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired,
  onToggleEditMode: React.PropTypes.func.isRequired,
  columnIndex: React.PropTypes.number.isRequired,
  value: React.PropTypes.object,
  type: React.PropTypes.string
};
