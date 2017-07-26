import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { RichUtils } from 'draft-js';

import { getButtonProps, secondaryMenuTitleStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';

import FontStyleButton from '../icons/FontStyleButton';

// https://draftjs.org/docs/advanced-topics-custom-block-render-map.html
const styleOptions = ([
  {
    name: 'Normal',
    value: 'unstyled',
    htmlTag: 'p'
  },
  {
    name: 'Header 1',
    value: 'header-one',
    htmlTag: 'h1'
  },
  {
    name: 'Header 2',
    value: 'header-two',
    htmlTag: 'h2'
  },
  {
    name: 'Header 3',
    value: 'header-three',
    htmlTag: 'h3'
  },
  {
    name: 'Header 4',
    value: 'header-four',
    htmlTag: 'h4'
  }
]);

export default class TextStyle extends React.Component {

  constructor(props) {
    super(props);

    const currentBlockType = this.findCurrentBlockType(props.localState);

    this.state = {
      blockType: currentBlockType,
      isMenuOpen: props.isActive || false,
      hoveredTag: null
    };
  }

  componentWillReceiveProps(nextProps) {
    const currentBlockType = this.findCurrentBlockType(nextProps.localState);
    if (currentBlockType !== this.state.blockType) {
      this.setState({
        blockType: currentBlockType
      });
    }

    if (nextProps.isActive !== this.props.isActive) {
      this.setState({
        isMenuOpen: nextProps.isActive
      });
    }
  }

  render() {
    const { blockType, isMenuOpen, hoveredTag } = this.state;
    const { isActive, hasRoomToRenderBelow } = this.props;

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      padding: 10,
      width: 250,
      height: 150,
      overflowY: 'scroll',
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
        <div style={titleStyles}>Text Style</div>
        <div style={{margin: '-10px 0', borderTop: '1px solid #f3f3f3'}}>
          {
            styleOptions.map((styleOption, i) => {
              const CustomTag = styleOption.htmlTag;
              const tagStyles = {
                color: '#222',
                margin: '0 -10px',
                padding: '8px 10px',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease-out',
                backgroundColor: (hoveredTag == styleOption.name) ? '#f3f3f3' : 'transparent'
              };
              return(
                <CustomTag
                  onMouseEnter={() => this.setState({hoveredTag: styleOption.name })}
                  onMouseLeave={() => this.setState({hoveredTag: null })}
                  onClick={() => this.handleSave(styleOption.value)}
                  style={tagStyles}
                  key={i}>
                  {styleOption.name}
                </CustomTag>
              );
            })
          }
        </div>
      </Menu>
    ) : null;

    return (
      <div>
        <FontStyleButton onClick={() => this.toggleDropdown()} {...buttonProps} />
        { dropdownNodes }
      </div>
    );
  }

  findCurrentBlockType(localState) {
    const editorState = localState.get('editorState');
    let currentBlockType = 'unstyled';
    if (editorState) {
      currentBlockType = RichUtils.getCurrentBlockType(editorState);
    }
    return currentBlockType;
  }

  toggleDropdown() {
    const { onToggleActive, isActive } = this.props;
    this.setState({
      blockType: 'unstyled',
      isMenuOpen: !this.state.isMenuOpen
    });

    if(isActive) {
      setTimeout(() => onToggleActive(!isActive), 200);
    } else {
      onToggleActive(!isActive);
    }
  }

  handleSave(value) {
    this.handleFormat(value);
  }

  handleFormat(selectedValue) {
    const { localState, persistedState, onChange, onToggleActive } = this.props;

    const newLocalState = localState.set('editorState', RichUtils.toggleBlockType(localState.get('editorState'), selectedValue));

    this.setState({
      blockType: selectedValue,
      isMenuOpen: false
    });

    setTimeout(() => onToggleActive(false), 200);

    onChange({
      localState: newLocalState,
      persistedState
    });
  }

}

TextStyle.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  hasRoomToRenderBelow: PropTypes.bool
};
