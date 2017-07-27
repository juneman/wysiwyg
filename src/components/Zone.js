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

import RatingEditor from '../editors/rating/RatingEditor';
import RatingToolbar from '../editors/rating/RatingToolbar';

import EditorWrapper from './EditorWrapper';

/**
 * A React component that holds the rendered content
 * or an editable area if the Zone is active
 * @class
 */
export class Zone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: Map()
    };

    this.baseHoverStateStyle = {
      outlineColor: '#FFAA39',
      backgroundColor: 'rgba(255,186,76,0.13)'
    };
    this.baseActiveStateStyle = {
      boxShadow: '0 0 0 1500px rgba(78,77,76,0.83), rgba(0, 0, 0, 0.12) 0px 2px 10px, rgba(0, 0, 0, 0.16) 0px 2px 5px',
    };
    this.baseContainerStyle = {
      width: '100%',
      margin: '0 auto',
      position: 'relative',
      display: 'inline-block'
    };
    this.zoneStyle = {
      outlineStyle: 'dotted',
      outlineWidth: '2px',
      outlineColor: 'transparent',
      display: 'inline-block',
      margin: `0 -${ props.basePadding }px`,
      padding: `0 ${ props.basePadding }px`,
      width: `calc(100% + ${ props.basePadding * 2 }px)`,
      transition: 'background-color 0.15s ease-out, box-shadow 0.15s ease-out, outline-color 0.15s ease-out'
    };
  }

  componentDidMount() {
    // Force the underlying editor component to resave/regenerate the HTML with the old data
    if (this.activeEditor) {
      this.save();
    }
    this.setBoundingBox();
    this.setFocus();
  }

  componentDidUpdate() {
    this.setFocus();
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
      disableAddButton,
      persistedState,
      cloudinary,
      userProperties
    } = this.props;

    const type = zone.get('type');

    const hoverStateStyle = (isHover) ? this.baseHoverStateStyle : null;
    const activeStateStyle = (isEditing) ? this.baseActiveStateStyle : null;
    const adjustedContainerStyle = { ...this.baseContainerStyle, width: `${ 100/row.get('zones').size }%` };
    const containerStyle = (isEditing) ? { ...adjustedContainerStyle, zIndex: 10 } : adjustedContainerStyle;
    const zoneStyle = Object.assign({}, this.zoneStyle, hoverStateStyle, activeStateStyle);

    // Common props across all editors
    const editorProps = {
      persistedState,
      localState,
      canvasPosition,
      zone,
      zonePosition: position,
      isEditing,
      cloudinary,
      userProperties,
      onChange: (update) => {
        // const html = update.html || this.activeEditor.generateHTML(update.persistedState);

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
      zone,
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
      case 'Rating':
        editorNode = (<RatingEditor {...editorProps} />);
        toolbarNode = (<RatingToolbar {...toolbarProps} />);
        break;
    }

    return (
      <div
        className={`zone-container zone-${columnIndex}`}
        style={containerStyle}
        onMouseOver={() => this.toggleHover(true)}
        onMouseLeave={() => this.toggleHover(false)}
        ref={(el) => this.wrapper = el}
      >
        <div className="zone" style={zoneStyle}>
          <EditorWrapper
            rowPosition={rowPosition}
            zonePosition={position}
            isEditing={isEditing}
            isHover={isHover}
            disableDeleteButton={disableAddButton}
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

  setFocus() {
    // The idea here is to reset the focus to the Draft Editor in most cases
    // except when the user has clicked on an input element, which needs to
    // maintain the focus in order to be usable.

    const isFocusableElement = this.wrapper.getRootNode().activeElement && ['SELECT', 'INPUT'].includes(this.wrapper.getRootNode().activeElement.tagName);
    if(this.activeEditor && !isFocusableElement) {
      this.activeEditor.focus();
    }
  }

  toggleHover(isOver) {
    const { dispatch, zone, row, isHover, isEditingAny } = this.props;
    if (isOver != isHover && !isEditingAny) {
      dispatch(editorActions.toggleZoneHover(zone, isOver));
      dispatch(editorActions.toggleRowHover(row, isOver));
    }
  }

  save() {
    const { dispatch, zone, persistedState, row } = this.props;
    let { html } = this.props;

    // Handles first mounting of a typed zone
    if (this.activeEditor && (!html || !html.length)) {
      html = this.activeEditor.generateHTML(persistedState);
    }

    const zoneWidth = `${ 100 / row.get('zones').size }%`;

    const zoneHtml = `
      <div class="zone-container" style="display: inline-block; width: ${ zoneWidth }">
        <div class="zone">
          <div class="zone-content">
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
    const { row, dispatch, zone, html, localState, persistedState } = this.props;
    const persistedContent = persistedState.get('content');
    const componentHasNoContent = persistedContent === '<p></p>' || persistedContent === '';

    if (!componentHasNoContent) {

      if (confirm("Are you sure you want to delete this?") == true) {
        dispatch(rowActions.removeRow(row.get('id')));
      }
      else {
        return false;
      }

    }
    else {
      dispatch(rowActions.removeRow(row.get('id')));
    }

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
  html: PropTypes.string,
  isEditing: PropTypes.bool.isRequired,
  isEditingAny: PropTypes.bool.isRequired,
  isHover: PropTypes.bool.isRequired,
  disableAddButton: PropTypes.bool.isRequired,
  userProperties: PropTypes.instanceOf(List).isRequired,
  cloudinary: PropTypes.instanceOf(Map).isRequired,
  basePadding: PropTypes.number
};

function mapStateToProps(state, ownProps) {

  // PersistedState is either a draft if we're actively editing
  // or the persistedState from the zone data if we're not in edit mode
  const isEditing = state.editor.get('isCanvasInEditMode') && (state.editor.get('activeZoneId') === ownProps.zone.get('id')) ? true : false;
  const isEditingAny = state.editor.get('isCanvasInEditMode');
  const persistedState = (isEditing) ? state.editor.get('draftPersistedState') : ownProps.zone.get('persistedState');
  const html = (isEditing) ? state.editor.get('draftHtml') : ownProps.zone.get('html');
  const isHover = (!state.editor.get('isCanvasInEditMode') && (state.editor.get('hoverZoneId') === ownProps.zone.get('id'))) ? true : false;

  return {
    localState: state.editor.get('localState'),
    persistedState,
    html,
    isEditing,
    isEditingAny,
    isHover,
    basePadding: state.editor.get('basePadding'),
    disableAddButton: state.editor.get('disableAddButton'),
    canvasPosition: state.editor.get('canvasPosition'),
    userProperties: state.editor.get('userProperties'),
    cloudinary: state.editor.get('cloudinary')
  };
}

export default connect(mapStateToProps)(Zone);
