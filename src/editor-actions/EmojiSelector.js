import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { Picker } from 'emoji-mart';

import Menu from '../components/Menu';
import { convertBoundingBox } from '../helpers/domHelpers';
import { getButtonProps, emojiPickerStyles } from '../helpers/styles/editor';

import EmojiButton from '../icons/EmojiButton';

const BASE_SVG_URL = '//twemoji.maxcdn.com/2/svg/';


export default class EmojiSelector extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      position: Map(),
      isMenuOpen: props.isActive || false,
      dropdownWidth: 440,
      hasRoomToRenderRight: true,
      selectedItemKey: null
    };
  }

  componentDidMount() {
    this.setBoundingBox();
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.isActive !== this.props.isActive) {
      this.setState({
        isMenuOpen: nextProps.isActive
      });
    }
  }


  render() {
    const { isMenuOpen, tabState, dropdownWidth, hasRoomToRenderRight, selectedItemKey } = this.state;
    const { isActive, hasRoomToRenderBelow, galleryType } = this.props;

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      width: dropdownWidth,
      overflow: 'hidden',
      animationName: `editor-slide-${(isMenuOpen) ? 'in' : 'out'}-${(hasRoomToRenderBelow) ? 'bottom' : 'top'}`,
      animationTimingFunction: 'ease-out',
      animationDuration: '0.15s',
      animationIterationCount: 1,
      animationFillMode: 'both'
    };
    if(!hasRoomToRenderRight) {
        dropdownStyles.right = dropdownStyles.left;
        delete dropdownStyles.left;
    }
    if (!hasRoomToRenderBelow) {
      dropdownStyles.bottom = dropdownStyles.top;
      delete dropdownStyles.top;
    }

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
        <div style={{padding: '4px 8px'}}>
            <style>
                { emojiPickerStyles }
            </style>
            <Picker
                autoFocus
                perLine={15}
                color="#23baff"
                set='twitter'
                onClick={(emoji) => this.pickEmoji(emoji)}
                style={{width: '100%'}}
                />
        </div>


      </Menu>
    ) : null;

    return (
      <div ref={(el) => this.wrapper = el}>
        <EmojiButton onClick={() => this.toggleDropdown()} {...buttonProps} />
        { dropdownNodes }
      </div>
    );
  }


  pickEmoji(emoji) {
      const { localState, persistedState, onChange } = this.props;
      let url;
      //check to make sure that our
      //saved url matches what the twemoji cdn expects.
      if ((emoji.unified.match(new RegExp("-", "g")) || []).length == 1) {
          //Removes variant values introduced by emojiMart
          url =  `${BASE_SVG_URL}${emoji.unified.split('-fe0f')[0]}.svg`;
      } else if ((emoji.unified.match(new RegExp("20e3", "g")) || []).length == 1) {
           //Removes variant values introduced by emojiMart, and leading 00's
           url =  `${BASE_SVG_URL}${emoji.unified.slice(2).split('-fe0f')[0]}-20e3.svg`;
      } else {
          url = `${BASE_SVG_URL}${emoji.unified}.svg`;
      }

      const width = persistedState.get('width');
      const newWidth = width ? width : 50;

      let newPersistedState = persistedState
        .set('url', url)
        .set('width', newWidth)
        .set('altText', `${emoji.name} emoji`)
        .set('textAlign', 'center');

      onChange({
        localState,
        persistedState: newPersistedState
      });
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

  setBoundingBox() {
    const { dropdownWidth } = this.state;
    if (!this.wrapper) {
      return;
    }
    const position = convertBoundingBox(this.wrapper.getBoundingClientRect());

    if (!position.equals(this.state.position)) {
      this.setState({position});
    }
    //only switch if the full dropdown will fit
    if ((position.get('left') + dropdownWidth) > window.innerWidth && (position.get('right') - dropdownWidth) > 0) {
        this.setState({
            hasRoomToRenderRight: false
        });
    }
  }

}

EmojiSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  hasRoomToRenderBelow: PropTypes.bool,
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  maxWidth: PropTypes.number
};
