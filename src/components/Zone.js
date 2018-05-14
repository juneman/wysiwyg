import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tinyColor from 'tinycolor2';
import { Map, List } from 'immutable';
import { connect } from 'react-redux';
import { DropTarget, DragSource } from 'react-dnd';

import { convertBoundingBox } from '../helpers/domHelpers';
import { DRAGABLE_ITEMS } from '../helpers/constants';
import { colors, draggingOverlayStyle } from '../helpers/styles/editor';

import * as rowActions from '../actions/rowActions';
import * as editorActions from '../actions/editorActions';
import * as zoneActions from '../actions/zoneActions';

import RichTextEditor from '../editors/richtext/RichTextEditor';
import RichTextToolbar from '../editors/richtext/RichTextToolbar';
import RichTextInlineActions from '../editors/richtext/RichTextInlineActions';

import ImageEditor from '../editors/image/ImageEditor';
import ImageToolbar from '../editors/image/ImageToolbar';

import EmojiEditor from '../editors/emoji/EmojiEditor';
import EmojiToolbar from '../editors/emoji/EmojiToolbar';

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

import ArrowsButton from '../icons/ArrowsButton';
import EditorWrapper from './EditorWrapper';
import DragHandle from './DragHandle';


const zoneBarStyle = {
  background: colors.informationalBlue,
  pointerEvents: 'none',
  position: 'absolute',
  height: '100%',
  opacity: 0,
  width: 4,
  left: 0,
  right: null,
  top: 0,
  transition: 'opacity 0.15s ease-out'
};

/**
 * A React component that holds the rendered content
 * or an editable area if the Zone is active
 * @class
 */
class Zone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: Map(),
      isHover: false
    };

    this.baseHoverStateStyle = {
      outlineColor: colors.informationalBlue,
      backgroundColor: tinyColor(colors.informationalBlue).setAlpha(0.14).toRgbString()
    };

    this.baseActiveStateStyle = {
      boxShadow: '0 0 0 1500px rgba(78,77,76,0.83), rgba(0, 0, 0, 0.12) 0px 2px 10px, rgba(0, 0, 0, 0.16) 0px 2px 5px',
      cursor: 'inherit'
    };


    this.baseContainerStyle = {
      width: '100%',
      margin: '0 auto',
      display: 'inline-block'
    };

    this.zoneStyle = {
      outlineStyle: 'dotted',
      outlineWidth: '2px',
      outlineColor: 'transparent',
      display: 'inline-block',
      position: 'relative',
      margin: 0,
      padding: 0,
      cursor: '-webkit-grab',
      width: '100%',
      height: '100%',
      transition: 'background-color 0.15s ease-out, box-shadow 0.15s ease-out, outline-color 0.15s ease-out'
    };

  }

  componentDidMount() {
    const { dispatch, zone, persistedState } = this.props;
    // Force the underlying editor component to regenerate the HTML for this zone
    if (this.activeEditor) {
      dispatch(zoneActions.updateZoneHtml(zone.get('id'), this.activeEditor.generateHTML(persistedState)));
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
      connectDragSource,
      connectDragPreview,
      connectDropTarget,
      isDragging,
      isMovable,
      dispatch,
      columnIndex,
      row,
      zone,
      canvasPosition,
      rowPosition,
      isEditing,
      isEditingAny,
      localState,
      disableAddButton,
      persistedState,
      cloudinary,
      userProperties,
      isOver,
      numPages,
      removeZone
    } = this.props;
    const { isHover } = this.state;


    const hoverStateStyle = (isHover && !isDragging && !isEditingAny) ? this.baseHoverStateStyle : null;
    const activeStateStyle = (isEditing) ? this.baseActiveStateStyle : null;
    const moveZoneBarStyle = {...zoneBarStyle, ...(isOver && !isHover) ? { opacity: 1} : {}};
    const isMovableStyle = isMovable ? this.isMovableStyle : null;
    const isDraggingStyle = isDragging ? { opacity: 0 } : {};

    const adjustedContainerStyle = { ...this.baseContainerStyle, width: `${ 100/row.get('zones').size }%` };
    const containerStyle = (isEditing || isHover) ? { ...adjustedContainerStyle, position: "relative", zIndex: 10 } : adjustedContainerStyle;
    const zoneStyle = Object.assign({}, this.zoneStyle, hoverStateStyle, isMovableStyle, activeStateStyle, isDraggingStyle);


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
        dispatch(editorActions.updateDraft({
          localState: update.localState,
          draftPersistedState: update.persistedState,
          html: update.html
        }));
      },
      ref: (editor) => { this.activeEditor = editor; }
    };


    const updateDraftWithChanges = (update) => {
      if (!isEditing) {
        return;
      }

      if(this.activeEditor) {
        const html = this.activeEditor.generateHTML(update.persistedState);

        dispatch(editorActions.updateDraft({
          localState: update.localState,
          draftPersistedState: update.persistedState,
          html
        }));
      }
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
      onChange: updateDraftWithChanges
    };

    const inlineActionsProps = {
      persistedState,
      localState,
      onChange: updateDraftWithChanges
    };

    let editorNode;
    let toolbarNode;
    let inlineActionsNode = null;
    const type = zone.get('type');

    switch (type) {
      case 'RichText':
        editorNode = (<RichTextEditor {...editorProps} />);
        toolbarNode = (<RichTextToolbar {...toolbarProps} />);
        inlineActionsNode = (<RichTextInlineActions {...inlineActionsProps} />);
        break;
      case 'Image':
        editorNode = (<ImageEditor {...editorProps} />);
        toolbarNode = (<ImageToolbar {...toolbarProps} />);
        break;
      case 'Emoji':
        editorNode = (<EmojiEditor {...editorProps} onClickEmptyState={ () => dispatch(editorActions.toggleEditorAction('emoji-selector', true)) }/>);
        toolbarNode = (<EmojiToolbar {...toolbarProps} />);
        break;
      case 'Button':
        editorNode = (<ButtonEditor {...editorProps} />);
        toolbarNode = (<ButtonToolbar numPages={numPages} {...toolbarProps} />);
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

    const DragIfPossible = (children) => (isMovable) ? connectDragSource(children) : children;


    return DragIfPossible(connectDropTarget(
      <div
        className={`zone-container zone-${columnIndex}`}
        style={containerStyle}
        onMouseEnter={() => this.toggleHover(true)}
        onMouseLeave={() => this.toggleHover(false)}
        onClick={() => { if(!isEditingAny){ this.startEditing(); }}}
        onDoubleClick={() => { if(!isEditingAny){ this.startEditing(); }}}
        ref={(el) => this.wrapper = el}
      >
        {
          connectDragPreview(
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
                  onCancel={() => this.clickedCancel()}
                  onRemove={() => removeZone(row, zone, true)}
                  onMoveRowStart={() => {
                    dispatch(editorActions.startMoving(row));
                  }}
                  onMoveRowEnd={() => {
                    dispatch(editorActions.endMoving(row));
                  }}
                  toolbarNode={toolbarNode}
                  inlineActionsNode={inlineActionsNode}
                >
                  {editorNode}
                </EditorWrapper>
                <div style={moveZoneBarStyle}></div>
              </div>
          )

        }
        { isDragging &&
          <div style={draggingOverlayStyle}></div>
        }
      </div>
    ));
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

  toggleHover(isHover) {
    this.setState({
      isHover
    });
  }

  save() {
    const { dispatch, zone, persistedState, row } = this.props;
    let { html } = this.props;

    // Handles a zone that for some reason has no generated HTML
    if (this.activeEditor && (!html || !html.length)) {
      html = this.activeEditor.generateHTML(persistedState);
    }

    const updatedZone = zone.set('persistedState', persistedState);

    dispatch(zoneActions.updateZoneHtml(zone.get('id'), html));
    dispatch(editorActions.updateZone(row, updatedZone));
  }

  startEditing() {
    const { dispatch, zone } = this.props;
    dispatch(editorActions.startEditing(zone));
  }

  clickedCancel() {
    const { dispatch, row, zone } = this.props;
    const persistedState = zone.get('persistedState');
    const isComponentNew = !persistedState || !persistedState.size;

    if (isComponentNew) {
      dispatch(rowActions.removeRow(row.get('id')));
    } else {
      this.cancelEditing();
    }
  }

  cancelEditing() {
    const { dispatch, zone } = this.props;
    dispatch(editorActions.cancelEditing(zone));
  }

  removeRow() {
    const { row, dispatch, persistedState } = this.props;
    const persistedContent = persistedState.get('url') || persistedState.get('content') || persistedState.get('label');
    const isComponentEmpty = !persistedContent || (persistedContent === '<p></p>' || persistedContent === '');

    if (isComponentEmpty || confirm("Are you sure you want to delete this?")) {
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
  connectDropTarget: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  zone: PropTypes.instanceOf(Map).isRequired,
  row: PropTypes.instanceOf(Map).isRequired,
  columnIndex: PropTypes.number.isRequired,
  canvasPosition: PropTypes.instanceOf(Map).isRequired,
  rowPosition: PropTypes.instanceOf(Map).isRequired,
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  html: PropTypes.string,
  isMovable: PropTypes.bool.isRequired,
  moveZone: PropTypes.func.isRequired,
  isDragging: PropTypes.bool,
  isEditing: PropTypes.bool.isRequired,
  isEditingAny: PropTypes.bool.isRequired,
  isHover: PropTypes.bool.isRequired,
  disableAddButton: PropTypes.bool.isRequired,
  userProperties: PropTypes.instanceOf(List).isRequired,
  cloudinary: PropTypes.instanceOf(Map).isRequired,
  basePadding: PropTypes.number,
  isOver: PropTypes.bool,
  numPages: PropTypes.number,
  removeZone: PropTypes.func,
  insertZone: PropTypes.func
};

function mapStateToProps(state, ownProps) {

  // PersistedState is either a draft if we're actively editing
  // or the persistedState from the zone data if we're not in edit mode
  const zoneId = ownProps.zone.get('id');
  const isEditing = state.editor.get('isCanvasInEditMode') && (state.editor.get('activeZoneId') === zoneId) ? true : false;
  const isEditingAny = state.editor.get('isCanvasInEditMode');
  const persistedState = (isEditing) ? state.editor.get('draftPersistedState') : ownProps.zone.get('persistedState');
  const html = (isEditing) ? state.editor.get('draftHtml') : (state.zones.has(zoneId) ? state.zones.get(zoneId).get('html') : null);

  return {
    localState: state.editor.get('localState'),
    persistedState,
    html,
    isEditing,
    isEditingAny,
    basePadding: state.editor.get('basePadding'),
    disableAddButton: state.editor.get('disableAddButton'),
    canvasPosition: state.editor.get('canvasPosition'),
    userProperties: state.editor.get('userProperties'),
    cloudinary: state.editor.get('cloudinary'),
    isMovable: (!state.editor.get('isCanvasInEditMode') && (state.rows.size > 1 || state.zones.size > 1)) ? true : false
  };
}

const zoneSource = {
  isDragging(props, monitor) {
    return props.zone.get('id') === monitor.getItem().zone.get('id');
  },
  beginDrag(props) {
    props.setIsHoveringOverRowContainer(false);
    return {
      row: props.row,
      zone: props.zone,
      columnIndex: props.columnIndex
    };
  }
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

const zoneTarget = {
  hover(targetProps, monitor, component) {
    const sourceProps = monitor.getItem();
    if(targetProps.row.get('id') == sourceProps.row.get('id') && sourceProps.columnIndex < targetProps.columnIndex) {
      zoneBarStyle.right = 0;
      zoneBarStyle.left = null;
    } else {
      zoneBarStyle.left = 0;
      zoneBarStyle.right = null;
    }
  },
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();

    if(targetProps.zone.get('id') == sourceProps.zone.get('id')) return;
    targetProps.removeZone(sourceProps.row, sourceProps.zone);
    targetProps.insertZone(targetProps.row, sourceProps.zone, targetProps.columnIndex);
  }
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export default DropTarget(DRAGABLE_ITEMS.ZONE, zoneTarget, collectTarget)(DragSource(DRAGABLE_ITEMS.ZONE, zoneSource, collectSource)(connect(mapStateToProps)(Zone)));