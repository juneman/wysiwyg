import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { CompactPicker } from 'react-color';
import { RichUtils, EditorState } from 'draft-js';

import Toolbar from '../components/Toolbar';

import ImageButton from '../icons/ImageButton';

export default class FontColor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false
    };
  }

  render() {
    const { showDropdown } = this.state;

    const buttonProps = {
      hideBackground: true,
      color: '#303030',
      clickColor: '#333',
      activeColor: '#C0C0C0'
    };

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0
    };

    const dropdownNodes = showDropdown ? (
      <Toolbar style={dropdownStyles}>
        <CompactPicker onChangeComplete={(color) => this.handleColor(color)} />
      </Toolbar>
    ) : null;

    return (
      <div>
        <ImageButton onClick={() => this.toggleDropdown()} {...buttonProps} />
        { dropdownNodes }
      </div>
    );
  }

  toggleDropdown() {
    const { showDropdown } = this.state;
    this.setState({
      showDropdown: !showDropdown
    });
  }

  handleColor(color) {
    const { localState, persistedState, onChange } = this.props;
    const editorState = localState.get('editorState');
    const toggledColor = color.hex;

    const selection = editorState.getSelection();

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = editorState.getCurrentContent();

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }

    const newLocalState = localState.set('editorState', nextEditorState);

    this.setState({
      showDropdown: false
    });

    onChange({
      localState: newLocalState,
      persistedState
    });
  }

}

FontColor.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
