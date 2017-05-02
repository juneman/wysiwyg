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
    value: 'unstyled'
  },
  {
    name: 'Header 1',
    value: 'header-one'
  },
  {
    name: 'Header 2',
    value: 'header-two'
  },
  {
    name: 'Header 3',
    value: 'header-three'
  },
  {
    name: 'Header 4',
    value: 'header-four'
  }
]);

export default class TextStyle extends React.Component {

  constructor(props) {
    super(props);

    const currentBlockType = this.findCurrentBlockType(props.localState);

    this.state = {
      blockType: currentBlockType
    };
  }

  componentWillReceiveProps(nextProps) {
    const currentBlockType = this.findCurrentBlockType(nextProps.localState);
    if (currentBlockType !== this.state.blockType) {
      this.setState({
        blockType: currentBlockType
      });
    }
  }

  render() {
    const { blockType } = this.state;
    const { isActive } = this.props;

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      padding: 10,
      width: 300
    };

    const titleStyles = secondaryMenuTitleStyle;

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
        <div style={titleStyles}>Text Style</div>
        <select className="form-control" onChange={(e) => this.handleSave(e)} value={blockType}>
          { styleOptions.map((styleOption) => {
            return (
              <option key={styleOption.value} value={styleOption.value}>{styleOption.name}</option>
            );
          })}
        </select>
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
      blockType: 'unstyled'
    });
    onToggleActive(!isActive);
  }

  handleSave(e) {
    e.preventDefault();
    this.handleFormat(e.target.value);
  }

  handleFormat(selectedValue) {
    const { localState, persistedState, onChange, onToggleActive } = this.props;

    const newLocalState = localState.set('editorState', RichUtils.toggleBlockType(localState.get('editorState'), selectedValue));

    this.setState({
      blockType: 'unstyled'
    });

    onToggleActive(false);

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
  isActive: PropTypes.bool.isRequired
};
