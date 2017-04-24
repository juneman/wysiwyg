import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { convertBoundingBox } from '../helpers/domHelpers';

import RichTextEditor from '../editors/richtext/RichTextEditor';
import RichTextToolbar from '../editors/richtext/RichTextToolbar';

import ImageEditor from '../editors/image/ImageEditor';
import ImageToolbar from '../editors/image/ImageToolbar';

import ButtonEditor from '../editors/button/ButtonEditor';
import ButtonToolbar from '../editors/button/ButtonToolbar';

import HtmlEditor from '../editors/html/HtmlEditor';
import HtmlEditorToolbar from '../editors/html/HtmlEditorToolbar';

import VideoEditor from '../editors/video/VideoEditor';
import VideoEditorToolbar from '../editors/video/VideoEditorToolbar';

import HeroEditor from '../editors/hero/HeroEditor';
import HeroToolbar from '../editors/hero/HeroToolbar';

import TextInputEditor from '../editors/form-text/TextInputEditor';
import TextInputToolbar from '../editors/form-text/TextInputToolbar';

import TextAreaInputEditor from '../editors/form-textarea/TextAreaInputEditor';
import TextAreaInputToolbar from '../editors/form-textarea/TextAreaInputToolbar';

import SelectionEditor from '../editors/form-select/SelectionEditor';
import SelectionToolbar from '../editors/form-select/SelectionToolbar';

import EditorWrapper from './EditorWrapper';

export default class Zone extends React.Component {
  constructor(props) {
    super(props);

    const { zone } = props;

    this.state = {
      position: Map(),
      isEditing: false,
      isHover: false,
      localState: Map(),
      draftPersistedState: (zone) ? zone.get('persistedState') : Map(),
      html: '',
      draftHtml: ''
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
      border: '2px solid #FFFFFF'
    };
  }

  componentDidMount() {
    const { zone } = this.props;
    const persistedState = zone.get('persistedState');
    // Force the underlying editor component to resave with the old data
    if (this.activeEditor) {
      const htmlContent = this.activeEditor.generateHTML(persistedState);
      this.setState({
        html: htmlContent
      });
      // setState is async, so we need to wait a loop before saving
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
    if (nextProps.zone.get('persistedState') !== this.props.zone.get('persistedState')) {
      this.setState({
        persistedState: nextProps.zone.get('persistedState'),
        draftPersistedState: nextProps.zone.get('persistedState')
      });
    }
  }

  render() {
    const { isEditing, isHover, localState, draftPersistedState, position } = this.state;
    const { columnIndex, zone, canvasPosition } = this.props;
    const type = zone.get('type');

    const hoverStateStyle = (isHover) ? this.baseHoverStateStyle : null;
    const activeStateStyle = (isEditing) ? this.baseActiveStateStyle : null;
    const zoneStyle = Object.assign({}, this.zoneStyle, hoverStateStyle, activeStateStyle);

    // Common props across all editors    
    const editorProps = {
      persistedState: draftPersistedState,
      localState,
      canvasPosition,
      zonePosition: position,
      isEditing,
      onChange: (update) => this.setState({
        localState: update.localState,
        draftPersistedState: update.persistedState,
        html: update.html
      }),
      ref: (editor) => { this.activeEditor = editor; }
    };

    // Common props across all primary toolbars
    const toolbarProps = {
      persistedState: draftPersistedState,
      localState,
      canvasPosition,
      zonePosition: position,
      onChange: (update) => {
        const html = this.activeEditor.generateHTML(update.persistedState);
        this.setState({
          localState: update.localState,
          draftPersistedState: update.persistedState,
          html
        });
      }
    };

    let editorNode;
    let toolbarNode;

    switch (type) {
      case 'RichText':
        editorNode = (<RichTextEditor {...editorProps} />);
        toolbarNode = (<RichTextToolbar {...toolbarProps} />);
        break;
      case 'Image':
        editorNode = (<ImageEditor {...editorProps} />);
        toolbarNode = (<ImageToolbar {...toolbarProps} />);
        break;
      case 'Button':
        editorNode = (<ButtonEditor {...editorProps} />);
        toolbarNode = (<ButtonToolbar {...toolbarProps} />);
        break;
      case 'HTML':
        editorNode = (<HtmlEditor {...editorProps} />);
        toolbarNode = (<HtmlEditorToolbar {...toolbarProps} />);
        break;
      case 'Video':
        editorNode = (<VideoEditor {...editorProps} />);
        toolbarNode = (<VideoEditorToolbar {...toolbarProps} />);
        break;
      case 'Hero':
        editorNode = (<HeroEditor {...editorProps} />);
        toolbarNode = (<HeroToolbar {...toolbarProps} />);
        break;
      case 'TextInput':
        editorNode = (<TextInputEditor {...editorProps} />);
        toolbarNode = (<TextInputToolbar {...toolbarProps} />);
        break;
      case 'TextAreaInput':
        editorNode = (<TextAreaInputEditor {...editorProps} />);
        toolbarNode = (<TextAreaInputToolbar {...toolbarProps} />);
        break;
      case 'SelectionField':
        editorNode = (<SelectionEditor {...editorProps} />);
        toolbarNode = (<SelectionToolbar {...toolbarProps} />);
        break;
    }

    return (
      <div
        className={`zone-container zone-${columnIndex}`}
        style={this.containerStyle}
        onMouseOver={() => this.toggleHover(true)}
        onMouseLeave={() => this.toggleHover(false)}
        ref={(el) => this.wrapper = el}
      >
        <div className="zone" style={zoneStyle}>
          <EditorWrapper
            zonePosition={position}
            isEditing={isEditing}
            isHover={isHover}
            onEdit={() => this.toggleEditMode()}
            onSave={() => this.save()}
            onCancel={() => this.cancel()}
            onRemove={() => this.remove()}
            onMoveRowStart={() => this.props.onMoveRowStart()}
            onMoveRowEnd={() => this.props.onMoveRowEnd()}
            toolbarNode={toolbarNode}
          >
            {editorNode}
          </EditorWrapper>
        </div>
      </div>
    );
  }

  toggleHover(active) {
    const { isHover } = this.state;
    const { isCanvasInEditMode } = this.props;
    if (!isCanvasInEditMode && isHover !== active) {
      this.setState({
        isHover: active
      });
    }
  }

  toggleEditMode() {
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

  save() {
    const { draftPersistedState, html } = this.state;
    const { zone, onToggleEditMode } = this.props;

    const zoneHtml = `
      <div class="zone-container">
        <div class="zone">
          <div class="content">
            ${html || ''}
          </div>
        </div>
      </div>
    `;

    const updatedZone = zone
      .set('persistedState', draftPersistedState)
      .set('html', zoneHtml);

    this.props.onSave(updatedZone);

    this.setState({
      isEditing: false,
      isHover: false,
      localState: Map()
    });
    onToggleEditMode(false);
  }

  cancel() {
    const { onToggleEditMode, zone } = this.props;
    const persistedState = zone.get('persistedState');
    this.setState({
      isEditing: false,
      isHover: false,
      localState: Map(),
      draftPersistedState: persistedState,
      html: ''
    });
    onToggleEditMode(false);
  }

  remove() {
    const { onToggleEditMode } = this.props;
    this.props.onRemove();
    onToggleEditMode(false);
  }

  setBoundingBox() {
    if (!this.wrapper) {
      return;
    }
    const position = convertBoundingBox(this.wrapper.getBoundingClientRect());
    if (!position.equals(this.state.position)) {
      this.setState({position});
    }
  }

}

Zone.propTypes = {
  zone: PropTypes.instanceOf(Map).isRequired,
  canvasPosition: PropTypes.instanceOf(Map).isRequired,
  isCanvasInEditMode: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onToggleEditMode: PropTypes.func.isRequired,
  onMoveRowStart: PropTypes.func.isRequired,
  onMoveRowEnd: PropTypes.func.isRequired,
  columnIndex: PropTypes.number.isRequired
};
