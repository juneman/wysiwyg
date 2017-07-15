import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { CompactPicker } from 'react-color';
import { RichUtils, EditorState } from 'draft-js';
import { CUSTOM_STYLE_PREFIX_COLOR } from '../helpers/draft/convert';

import { secondaryMenuTitleStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';

import FontColorButton from '../icons/FontColorButton';

const MENU_HEIGHT_ALLOWANCE = 300;

export default class FontColor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: props.isActive || false
    };
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.isActive !== this.props.isActive) {
      this.setState({
        isMenuOpen: nextProps.isActive
      });
    }
  }

  render() {
    const { isActive, hasRoomToRenderBelow } = this.props;
    const { isMenuOpen } = this.state;

    const selectedColor = this.getCurrentInlineColor();
    const buttonProps = {
      hideBackground: true,
      color: selectedColor
    };

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      padding: 5,
      animationName: `editor-slide-${(isMenuOpen) ? 'in' : 'out'}-${(hasRoomToRenderBelow) ? 'bottom' : 'top'}`,
      animationTimingFunction: 'ease-out',
      animationDuration: '0.15s',
      animationIterationCount: 1,
      animationFillMode: 'both'
    };
    if (!hasRoomToRenderBelow) {
      dropdownStyles.bottom = dropdownStyles.top;
      delete dropdownStyles.top;
    }

    const titleStyles = secondaryMenuTitleStyle;

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
        <div style={titleStyles}>Select a Font Color</div>
        <CompactPicker
          color={selectedColor}
          onChangeComplete={(color) => this.handleColor(color)}
        />
      </Menu>
    ) : null;

    return (
      <div>
        <FontColorButton onClick={() => this.toggleDropdown()} {...buttonProps} />
        { dropdownNodes }
      </div>
    );
  }

  toggleDropdown() {
    const { onToggleActive, isActive } = this.props;
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });

    if(isActive) {
      setTimeout(() => onToggleActive(!isActive), 200);
    } else {
      onToggleActive(!isActive);
    }

  }

  getCurrentInlineColor() {
    const { localState } = this.props;
    const editorState = localState.get('editorState');
    if (editorState) {
      const styles = editorState.getCurrentInlineStyle().toJS();
      if (styles.length) {
        const styleIndex = styles.findIndex((style) => style.indexOf(CUSTOM_STYLE_PREFIX_COLOR) === 0);
        if (styleIndex !== -1) {
          return styles[styleIndex].substring(CUSTOM_STYLE_PREFIX_COLOR.length);
        }
      }
    }
    return '#000';
  }

  handleColor(color) {
    const { localState, persistedState, onChange } = this.props;
    const editorState = localState.get('editorState');
    const toggledColor = color.hex;

    const styles = editorState.getCurrentInlineStyle().toJS();
    let nextEditorState = styles.reduce((state, styleKey) => {
      if (styleKey.startsWith(CUSTOM_STYLE_PREFIX_COLOR)) {
        return RichUtils.toggleInlineStyle(state, styleKey);
      }
      return state;
    }, editorState);

    nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, CUSTOM_STYLE_PREFIX_COLOR + toggledColor);

    const contentState = editorState.getCurrentContent();
    const startKey = editorState.getSelection().getStartKey();
    const startOffset = editorState.getSelection().getStartOffset();
    const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
    const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
    if (linkKey) {
      const linkInstance = contentState.getEntity(linkKey);
      if (linkInstance) {
        const nextContentState = contentState.mergeEntityData(linkKey, { color: color.hex });

        nextEditorState = EditorState.push(nextEditorState, nextContentState, 'apply-inline-style');
      }
    }

    const newLocalState = localState.set('editorState', nextEditorState);

    onChange({
      localState: newLocalState,
      persistedState
    });
  }
}

FontColor.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  hasRoomToRenderBelow: PropTypes.bool
};
