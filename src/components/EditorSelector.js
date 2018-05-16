import React from 'react';
import PropTypes from 'prop-types';
import { List, fromJS } from 'immutable';
import uuid from 'uuid/v4';

import Menu from './Menu';
import RightButton from '../icons/RightButton';
import TextButton from '../icons/TextButton';
import EmojiButton from '../icons/EmojiButton';
import ImageButton from '../icons/ImageButton';
import VideoButton from '../icons/VideoButton';
import CodeButton from '../icons/CodeButton';
import FormButton from '../icons/FormButton';
import HeroButton from '../icons/HeroButton';
import ButtonButton from '../icons/ButtonButton';
import FormCheckboxButton from '../icons/FormCheckboxButton';
import FormDropdownButton from '../icons/FormDropdownButton';
import FormRadioButton from '../icons/FormRadioButton';
import FormTextInputButton from '../icons/FormTextInputButton';
import FormRatingButton from '../icons/FormRatingButton';
import PrevNextButton from '../icons/PrevNextButton';

import { EDITOR_TYPES, categories } from '../helpers/constants';

const MENU_HEIGHT_ALLOWANCE = 300;

const editors = {
  [EDITOR_TYPES.TEXT]: {
    Button: TextButton,
    text: 'Text',
    type: 'RichText',
    category: 'Text'
  },
  [EDITOR_TYPES.IMAGE]: {
    Button: ImageButton,
    text: 'Image',
    type: 'Image',
    category: 'Media'
  },
  [EDITOR_TYPES.HERO]: {
    Button: HeroButton,
    text: 'Hero/Header',
    type: 'Hero',
    category: 'Media'
  },
  [EDITOR_TYPES.EMOJI]: {
    Button: EmojiButton,
    text: 'Emoji',
    type: 'Emoji',
    category: 'Media'
  },
  [EDITOR_TYPES.VIDEO]: {
    Button: VideoButton,
    text: 'Video',
    type: 'Video',
    defaultAction: 'code',
    category: 'Media'
  },
  [EDITOR_TYPES.HTML]: {
    Button: CodeButton,
    text: 'HTML',
    type: 'HTML',
    defaultAction: 'code',
    category: 'Advanced'
  },
  [EDITOR_TYPES.TEXTINPUT]: {
    Button: FormTextInputButton,
    text: 'Small Text Input',
    type: 'TextInput',
    category: 'Forms'
  },
  [EDITOR_TYPES.TEXTAREAINPUT]: {
    Button: FormTextInputButton,
    text: 'Big Text Input',
    type: 'TextAreaInput',
    category: 'Forms'
  },
  [EDITOR_TYPES.RADIO]: {
    Button: FormRadioButton,
    text: 'Radio Select',
    type: 'SelectionField',
    category: 'Forms'
  },
  [EDITOR_TYPES.RATING]: {
    Button: FormRatingButton,
    text: 'Rating',
    type: 'Rating',
    category: 'Forms'
  },
  [EDITOR_TYPES.BUTTON]: {
    Button: ButtonButton,
    text: 'Button',
    type: 'Button',
    category: 'Advanced'
  }
};


/**
 * A React component that displays the dropdown menu
 * for selecting which editor type to add to the Canvas
 * @class
 */
export default class EditorSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      primaryHoverMenu: '',
      openSubMenu: '',
      hasRoomToRenderBelow: true
    };
  }

  componentDidMount() {
    this.setHasRoomToRenderBelow();
  }

  componentDidUpdate() {
    this.setHasRoomToRenderBelow();
  }

  render() {
    const { onSelect, allowedEditorTypes, showEditorSelector } = this.props;
    const { hasRoomToRenderBelow, primaryHoverMenu, openSubMenu } = this.state;

    const menuStyle = {
      zIndex: 100,
      position: 'absolute',
      width: 160,
      left: 'calc(-80px + 50%)',
      animationName: `editor-slide-${(showEditorSelector) ? 'in' : 'out'}-${(hasRoomToRenderBelow) ? 'bottom' : 'top'}`,
      animationTimingFunction: 'ease-out',
      animationDuration: '0.15s',
      animationIterationCount: 1,
      animationDirection: 'normal',
      animationFillMode: 'both'
    };

    if (hasRoomToRenderBelow) {
      menuStyle.top = 5;
    } else {
      menuStyle.bottom = 48;
    }

    const secondaryMenuStyle = {
      zIndex: 101,
      width: 160,
      position: 'absolute',
      bottom: 0,
      left: 150
    };

    const editorMenu = categories.map((category) => {
      return {
        name: category.name,
        icon: category.icon,
        items: category.content.filter((editor) => {
          return allowedEditorTypes.includes(editor);
        })
      };
    });

    return (
      <div ref={(el) => this.wrapper = el} style={{position: 'absolute', ...menuStyle}}>
        <Menu style={{overflow: 'hidden'}}>
          {
            editorMenu.map((category) => {
              if (category.items.length === 1) {
                return this.renderSubMenuItems(category.items);
              }
              else {
                return ( category.items.length ?
                  <div style={{display: 'flex', alignItems: 'center', backgroundColor: (openSubMenu === category.name && '#3498db'), zIndex: 102}}
                    key={category.name}
                    onMouseEnter={() => this.onHoverExpandMenu(category.name)}
                    onMouseLeave={() => this.onHoverExpandMenu()}>
                    { category.icon &&
                      <div style={{display: 'inline-flex', width: 36 }}>
                        { category.icon && <category.icon
                          hideBackground={true}
                          color={openSubMenu === category.name ? '#fff' : '#C0C0C0'}
                          textColor={openSubMenu === category.name ? '#fff' : '#606060'}/>
                        }
                      </div>
                    }
                    <p style={{margin: '0px', color: (openSubMenu === category.name ? '#fff' : '#606060')}}>{category.name}
                    </p>
                    <div style={{position: 'absolute', right: 0}}>
                      <RightButton
                        hideBackground={true}
                        color={openSubMenu === category.name ? '#fff' : '#C0C0C0'}
                        textColor={openSubMenu === category.name ? '#fff' : '#606060'}/>
                    </div>
                    <div style={secondaryMenuStyle}>
                      { openSubMenu === category.name &&
                        <Menu style={{overflow: 'hidden'}}>
                          { this.renderSubMenuItems(category.items) }
                        </Menu>
                      }
                    </div>
                  </div> : null
                );
              }
            })
          }
        </Menu>
      </div>
    );
  }

  renderSubMenuItems(categoryContent) {
    const { onSelect } = this.props;
    const { primaryHoverMenu } = this.state;

    const contents = categoryContent.map((editor) => {
      const isHover = editors[editor].type === primaryHoverMenu;
      const style = {backgroundColor: isHover && '#3498db'};
      const editorElement = editors[editor];
      return (
        <a href="#"
          key={editorElement.text}
          style={{textDecoration: 'none'}}
          onClick={(e) => {
            e.preventDefault();
            onSelect(editorElement.type, editorElement.rows, editorElement.defaultAction);
          }}>
          <div
            className="menuItem"
            style={style}
            onMouseOver={() => this.setHover(editorElement.type, true)}
            onMouseOut={() => this.setHover('', false)}>
            <editorElement.Button
              hideBackground={true}
              color={isHover ? '#fff' : '#C0C0C0'}
              textColor={isHover ? '#fff' : '#606060'}
              text={editorElement.text}
              textStyle={{ fontSize: 15 }}
              cursor="pointer"/>
          </div>
        </a>
      );
    });

    return contents;
  }

  onHoverExpandMenu(category) {
    const { openSubMenu } = this.state;
    if (openSubMenu !== category) {
      this.setState({openSubMenu: category});
    }
  }

  setHover(primaryHoverMenu, isOver) {
    const update = {};
    if (primaryHoverMenu !== this.state.primaryHoverMenu) {
      update.primaryHoverMenu = isOver && primaryHoverMenu;
    }

    if (Object.keys(update).length) {
      this.setState(update);
    }
  }

  setHasRoomToRenderBelow() {
    const hasRoomToRenderBelow = ((window.innerHeight - this.wrapper.parentElement.getBoundingClientRect().top) > MENU_HEIGHT_ALLOWANCE);
    if (hasRoomToRenderBelow != this.state.hasRoomToRenderBelow){
      this.setState({ hasRoomToRenderBelow });
    }
  }

}
EditorSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
  allowedEditorTypes: PropTypes.instanceOf(List),
  showEditorSelector: PropTypes.bool
};
