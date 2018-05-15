import React from 'react';
import PropTypes from 'prop-types';
import { Map, Set, is } from 'immutable';
import { ColorPicker } from '../components/ColorPicker';
import { RichUtils, EditorState, Modifier } from 'draft-js';
import { CUSTOM_STYLE_PREFIX_COLOR } from '../helpers/draft/convert';
import tinyColor from 'tinycolor2';

import { secondaryMenuTitleStyle, dropdownStyle } from '../helpers/styles/editor';
import { getBlocksFromSelection } from '../helpers/draft/selection';
import { findLinkEntities } from '../helpers/draft/LinkDecorator';
import Menu from '../components/Menu';

import FontColorButton from '../icons/FontColorButton';

const MENU_HEIGHT_ALLOWANCE = 300;

export default class FontColor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: props.isActive || false,
      selectedColor: '#000'
    };
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.isActive !== this.props.isActive) {
      this.setState({
        isMenuOpen: nextProps.isActive
      });
    }

    this.setCurrentInlineColor();
  }

  render() {
    const { isActive, hasRoomToRenderBelow } = this.props;
    const { isMenuOpen, selectedColor } = this.state;

    const buttonProps = {
      hideBackground: true,
      color: selectedColor,
      iconStyle: {
        backgroundColor: (tinyColor(selectedColor).getBrightness() > 240) ? tinyColor(selectedColor).darken(25).toHexString() : null,
        borderRadius: '3px',
        border: (tinyColor(selectedColor).getBrightness() > 240) ? `1px solid ${tinyColor(selectedColor).darken(25).toHexString()}` : null,
      }
    };

    const dropdownStyles = {
      ...dropdownStyle,
      padding: 5,
      animationName: `editor-slide-${(isMenuOpen) ? 'in' : 'out'}-${(hasRoomToRenderBelow) ? 'bottom' : 'top'}`
    };
    if (!hasRoomToRenderBelow) {
      dropdownStyles.bottom = dropdownStyles.top + 55;
      delete dropdownStyles.top;
    }

    const titleStyles = {
      ...secondaryMenuTitleStyle,
      marginBottom: 5
    };

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
        <div style={titleStyles}>Select a Font Color</div>
        <ColorPicker
          color={ selectedColor }
          onChangeComplete={ color => this.handleColor(color) }
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
    const {onToggleActive, isActive, focusEditor} = this.props;

    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });

    if(isActive) {
      focusEditor();
      setTimeout(() => onToggleActive(!isActive), 200);
    } else {
      onToggleActive(!isActive);
    }
  }


  setCurrentInlineColor() {
    const { localState } = this.props;
    const { selectedColor } = this.state;
    const editorState = localState.get('editorState');
    if (editorState) {
      const styles = editorState.getCurrentInlineStyle().toJS();
      if (styles.length) {
        const styleIndex = styles.findIndex((style) => style.indexOf(CUSTOM_STYLE_PREFIX_COLOR) === 0);
        if (styleIndex !== -1) {
          const newSelectedColor = styles[styleIndex].substring(CUSTOM_STYLE_PREFIX_COLOR.length);
          if (selectedColor !== newSelectedColor) {
            this.setState({
              selectedColor: newSelectedColor
            });
          }
        }
      }
    }
  }

  handleColor(color) {
    const { localState, persistedState, onChange } = this.props;
    const editorState = localState.get('editorState');
    const toggledColor = color.hex;

    // Get all of the styles from this chunk that begin with the
    // `CUSTOM_STYLE_PREFIX_COLOR` prefix and add them to the running set of
    // style strings.
    const styles = getBlocksFromSelection(editorState).reduce((styleSet, block) => {
      block.findStyleRanges(
        () => true,
        (start, end) => {
          styleSet = styleSet.union(
            block
              .getInlineStyleAt(start)
              .filter((val) => val.startsWith(CUSTOM_STYLE_PREFIX_COLOR))
          );
        }
      );
      return styleSet;
    }, Set());

    // We should only allow one color per character, so remove any existing
    // colors from selected content before we apply the new color.
    const selection = editorState.getSelection();
    let nextContentState = styles.reduce((contentState, color) => {
      return Modifier.removeInlineStyle(contentState, selection, color);
    }, editorState.getCurrentContent());

    // Apply the color removal
    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );

    // Apply the new color
    nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, CUSTOM_STYLE_PREFIX_COLOR + toggledColor);

    // Apply color changes to link entities within the selected range
    const nextEditorSelection = nextEditorState.getSelection();
    const startOffset = nextEditorSelection.getStartOffset();
    const startKey = nextEditorSelection.getStartKey();
    const endOffset = nextEditorSelection.getEndOffset();
    const endKey = nextEditorSelection.getEndKey();
    nextContentState = nextEditorState.getCurrentContent();
    getBlocksFromSelection(nextEditorState).forEach((block) => {
      findLinkEntities(block, (start, end) => {
        if (
          (block.getKey() === startKey && end <= startOffset) ||
          (block.getKey() === endKey && start >= endOffset)
        ) {
          return;
        }
        const linkKey = block.getEntityAt(start);
        if (linkKey) {
          nextContentState = nextContentState.mergeEntityData(
            linkKey,
            { color: toggledColor }
          );
        }
      }, nextContentState);
    });
    if (!is(nextEditorState.getCurrentContent(), nextContentState)) {
      nextEditorState = EditorState.push(
        nextEditorState,
        nextContentState,
        'apply-inline-style'
      );
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
  hasRoomToRenderBelow: PropTypes.bool,
  focusEditor: PropTypes.func.isRequired
};
