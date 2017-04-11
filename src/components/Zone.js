import React from 'react';
import isEqual from 'lodash.isequal';

import { convertBoundingBox } from '../helpers/domHelpers';
import { RichTextEditor, RichTextToolbar } from '../editors/RichText';
import EditorWrapper from './EditorWrapper';

export default class Zone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: {},
      isEditing: false,
      isHover: false,
      value: props.value || {},
      draftValue: {},
      editorState: {},
      html: '',
      draftHtml: '',
      type: props.type || null,
      secondaryToolbarNode: null
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
    this.setBoundingBox();
  }

  componentDidUpdate() {
    this.setBoundingBox();
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.value, this.props.value)) {
      this.setState({value: nextProps.value});
    }
  }

  render() {
    const { isEditing, isHover, type, value, position, editorState, secondaryToolbarNode } = this.state;
    const { columnIndex } = this.props;

    const hoverStateStyle = (isHover) ? this.baseHoverStateStyle : null;
    const activeStateStyle = (isEditing) ? this.baseActiveStateStyle : null;
    const zoneStyle = Object.assign({}, this.zoneStyle, hoverStateStyle, activeStateStyle);

    // Common props across all editors
    let editorNode;
    const editorProps = {
      value,
      isEditing,
      editorState,
      onChange: (value) => this.saveDraft(value),
      ref: (editor) => { this.activeEditor = editor; }
    };

    const toolbarProps = {
      editorState,
      onChange: (editorState) => this.setState({editorState}),
      onShowSecondaryToolbar: (Toolbar) => {
        const secondaryToolbarNode = (
          <Toolbar
            onSave={(state) => {
              const v = Object.assign({}, value, state);
              this.setState({
                value: v,
                secondaryToolbarNode: null
              });
            }}
            {...value}
          />
        );
        this.setState({secondaryToolbarNode});
      }
    };

    let toolbarNode;

    switch (type) {
      case 'RichText':
        editorNode = (<RichTextEditor {...editorProps} />);
        toolbarNode = (<RichTextToolbar {...toolbarProps} />);
        break;
    }

    const main = (type) ? (
      <EditorWrapper
        zonePosition={position}
        isEditing={isEditing}
        isHover={isHover}
        onEdit={() => this.setState({isEditing: true})}
        onSave={() => this.save()}
        onCancel={() => this.cancel()}
        onRemove={() => this.remove()}
        toolbarNode={toolbarNode}
        secondaryToolbarNode={secondaryToolbarNode}
        editorState={editorState}
      >
        {editorNode}
      </EditorWrapper>
    ) : null;

    return (
      <div
        className={`zone-container zone-${columnIndex}`}
        style={this.containerStyle}
        onMouseEnter={() => this.toggleHover(true)}
        onMouseLeave={() => this.toggleHover(false)}
        onClick={(e) => this.toggleEditMode(e)}
        ref={(el) => this.wrapper = el}
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
      editorState: editor.editorState,
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
      isHover: false,
      editorState: null
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
      html: '',
      editorState: null
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

  setBoundingBox() {
    if (!this.wrapper) {
      return;
    }
    const position = convertBoundingBox(this.wrapper.getBoundingClientRect());
    if (!isEqual(position, this.state.position)) {
      this.setState({position});
    }
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
