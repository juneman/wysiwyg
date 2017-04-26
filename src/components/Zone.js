import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';
import { connect } from 'react-redux';

import { convertBoundingBox } from '../helpers/domHelpers';
import * as rowActions from '../actions/rowActions';
import * as editorActions from '../actions/editorActions';

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

export class Zone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: Map()
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
    // Force the underlying editor component to resave with the old data
    if (this.activeEditor) {
      setTimeout(() => {
        this.save();
      });
    }
    this.setBoundingBox();
  }

  componentDidUpdate() {
    this.setBoundingBox();
  }

  render() {
    const { position } = this.state;
    const {
      dispatch,
      columnIndex,
      row,
      zone,
      canvasPosition,
      rowPosition,
      isEditing,
      localState,
      isHover,
      persistedState,
      cloudinary,
      userProperties
    } = this.props;
    
    const type = zone.get('type');

    const hoverStateStyle = (isHover) ? this.baseHoverStateStyle : null;
    const activeStateStyle = (isEditing) ? this.baseActiveStateStyle : null;
    const zoneStyle = Object.assign({}, this.zoneStyle, hoverStateStyle, activeStateStyle);

    // Common props across all editors    
    const editorProps = {
      persistedState,
      localState,
      canvasPosition,
      zonePosition: position,
      isEditing,
      cloudinary,
      userProperties,
      onChange: (update) => {
        if (!isEditing) {
          return;
        }
        dispatch(editorActions.updateDraft({
          localState: update.localState,
          draftPersistedState: update.persistedState,
          html: update.html
        }));
      },
      ref: (editor) => { this.activeEditor = editor; }
    };

    // Common props across all toolbars
    const toolbarProps = {
      persistedState,
      localState,
      canvasPosition,
      zonePosition: position,
      cloudinary,
      userProperties,
      onChange: (update) => {
        if (!isEditing) {
          return;
        }
        const html = this.activeEditor.generateHTML(update.persistedState);
        dispatch(editorActions.updateDraft({
          localState: update.localState,
          draftPersistedState: update.persistedState,
          html
        }));
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
            rowPosition={rowPosition}
            isEditing={isEditing}
            isHover={isHover}
            onEdit={() => this.startEditing()}
            onSave={() => {
              this.save();
              this.cancelEditing();
            }}
            onCancel={() => this.cancelEditing()}
            onRemove={() => this.removeRow()}
            onMoveRowStart={() => {
              dispatch(editorActions.startMoving(row));
            }}
            onMoveRowEnd={() => {
              dispatch(editorActions.endMoving(row));
            }}
            toolbarNode={toolbarNode}
          >
            {editorNode}
          </EditorWrapper>
        </div>
      </div>
    );
  }

  toggleHover(isOver) {
    const { dispatch, zone, row } = this.props;
    dispatch(editorActions.toggleZoneHover(zone, isOver));
    dispatch(editorActions.toggleRowHover(row, isOver));
  }

  save() {
    const { dispatch, zone, persistedState, html, row } = this.props;

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
      .set('persistedState', persistedState)
      .set('html', zoneHtml);

    dispatch(editorActions.updateZone(row, updatedZone));
  }

  startEditing() {
    const { dispatch, zone } = this.props;
    dispatch(editorActions.startEditing(zone));
  }

  cancelEditing() {
    const { dispatch, zone } = this.props;
    dispatch(editorActions.cancelEditing(zone));
  }

  removeRow() {
    const { row, dispatch } = this.props;
    dispatch(rowActions.removeRow(row.get('id')));
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
  dispatch: PropTypes.func.isRequired,
  zone: PropTypes.instanceOf(Map).isRequired,
  row: PropTypes.instanceOf(Map).isRequired,
  columnIndex: PropTypes.number.isRequired,
  canvasPosition: PropTypes.instanceOf(Map).isRequired,
  rowPosition: PropTypes.instanceOf(Map).isRequired,
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  html: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
  isHover: PropTypes.bool.isRequired,
  userProperties: PropTypes.instanceOf(List).isRequired,
  cloudinary: PropTypes.instanceOf(Map).isRequired,
};

function mapStateToProps(state, ownProps) {

  // PersistedState is either a draft if we're actively editing
  // or the persistedState from the zone data if we're not in edit mode
  const isEditing = (state.editor.get('activeZoneId') === ownProps.zone.get('id')) ? true : false;
  const persistedState = (isEditing) ? state.editor.get('draftPersistedState') : ownProps.zone.get('persistedState');
  const isHover = (!state.editor.get('isCanvasInEditMode') && (state.editor.get('hoverZoneId') === ownProps.zone.get('id'))) ? true : false;

  return {
    localState: state.editor.get('localState'),
    persistedState,
    html: state.editor.get('draftHtml'),
    isEditing,
    isHover,
    canvasPosition: state.editor.get('canvasPosition'),
    userProperties: state.editor.get('userProperties'),
    cloudinary: state.editor.get('cloudinary')
  };
}

export default connect(mapStateToProps)(Zone);