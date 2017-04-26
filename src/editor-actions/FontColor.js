import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { CompactPicker } from 'react-color';
import { RichUtils } from 'draft-js';
import { CUSTOM_STYLE_PREFIX_COLOR } from '../helpers/draft/convert';

import { secondaryMenuTitleStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';

import SquareButton from '../icons/SquareButton';

export default class FontColor extends React.Component {
  render() {
    const { isActive } = this.props;

    const selectedColor = this.getCurrentInlineColor();
    const buttonProps = {
      hideBackground: true,
      color: selectedColor
    };

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      padding: 5
    };

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
        <SquareButton onClick={() => this.toggleDropdown()} {...buttonProps} />
        { dropdownNodes }
      </div>
    );
  }

  toggleDropdown() {
    const { onToggleActive, isActive } = this.props;
    onToggleActive(!isActive);
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
  isActive: PropTypes.bool.isRequired
};
