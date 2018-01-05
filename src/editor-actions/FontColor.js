import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { ColorPicker } from '../components/ColorPicker';
import { RichUtils, EditorState } from 'draft-js';
import { CUSTOM_STYLE_PREFIX_COLOR } from '../helpers/draft/convert';
import tinyColor from 'tinycolor2';

import { secondaryMenuTitleStyle, dropdownStyle } from '../helpers/styles/editor';
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


  setCurrentInlineColor() {
    const { localState } = this.props;
    const editorState = localState.get('editorState');
    if (editorState) {
      const styles = editorState.getCurrentInlineStyle().toJS();
      if (styles.length) {
        const styleIndex = styles.findIndex((style) => style.indexOf(CUSTOM_STYLE_PREFIX_COLOR) === 0);
        if (styleIndex !== -1) {
          this.setState({
            selectedColor: styles[styleIndex].substring(CUSTOM_STYLE_PREFIX_COLOR.length)
          });
        }
      }
    }
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
