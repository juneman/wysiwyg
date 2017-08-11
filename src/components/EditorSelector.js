import React from 'react';
import PropTypes from 'prop-types';
import { List, fromJS } from 'immutable';
import uuid from 'uuid/v4';

import Menu from './Menu';
import TextButton from '../icons/TextButton';
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

import { categories, textEditors, formEditors, mediaEditors, advancedEditors } from '../helpers/constants';

const MENU_HEIGHT_ALLOWANCE = 300;

const editors = [
  {
    Button: TextButton,
    text: 'Text',
    type: 'RichText',
    category: 'Text'
  },
  {
    Button: ImageButton,
    text: 'Image',
    type: 'Image',
    category: 'Media'
  },
  {
    Button: HeroButton,
    text: 'Hero/Header',
    type: 'Hero',
    category: 'Media'
  },
  {
    Button: VideoButton,
    text: 'Video',
    type: 'Video',
    defaultAction: 'code',
    category: 'Media'
  },
  {
    Button: CodeButton,
    text: 'HTML',
    type: 'HTML',
    defaultAction: 'code',
    category: 'Advanced'
  },
  {
    Button: FormButton,
    text: 'Form',
    type: 'Form'
  },
  {
    Button: FormTextInputButton,
    text: 'Small Text Input',
    type: 'TextInput',
    category: 'Forms'
  },
  {
    Button: FormTextInputButton,
    text: 'Big Text Area',
    type: 'TextAreaInput',
    category: 'Forms'
  },
  {
    Button: FormRadioButton,
    text: 'Radio Select',
    type: 'SelectionField',
    category: 'Forms',
    rows: fromJS([
      {
        id: uuid(),
        zones: [
          {
            id: uuid(),
            type: 'SelectionField'
          }
        ]
      }
    ])
  },
  {
    Button: FormRatingButton,
    text: 'Rating',
    type: 'Rating',
    category: 'Forms'
  },
  {
    Button: ButtonButton,
    text: 'Button',
    type: 'Button',
    category: 'Advanced'
  }
];

/**
 * A React component that displays the dropdown menu
 * for selecting which editor type to add to the Canvas
 * @class
 */
export default class EditorSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      primaryHoverMenu: '',
      secondaryMenuHover: '',
      menuState: '',
      textElements: [],
      mediaElements: [],
      formElements: [],
      advancedElements: [],
      hasRoomToRenderBelow: true
    };
  }

  componentDidMount() {
    const { allowedEditorTypes } = this.props;
    this.setHasRoomToRenderBelow();

    const editorUpdate = {};
    editorUpdate.textElements = !allowedEditorTypes.isEmpty() && editors.filter((editor) => {
        return (textEditors.includes(editor.type) && allowedEditorTypes.includes(editor.type))
    })
    editorUpdate.mediaElements = !allowedEditorTypes.isEmpty() && editors.filter((editor) => {
        return (mediaEditors.includes(editor.type) && allowedEditorTypes.includes(editor.type))
    })
    editorUpdate.formElements = !allowedEditorTypes.isEmpty() && editors.filter((editor) => {
        return (formEditors.includes(editor.type) && allowedEditorTypes.includes(editor.type))
    })
    editorUpdate.advancedElements = !allowedEditorTypes.isEmpty() && editors.filter((editor) => {
        return (advancedEditors.includes(editor.type) && allowedEditorTypes.includes(editor.type))
    })
    console.log('LOG editor selector did mount, elements to load?', editorUpdate)

    this.setState(editorUpdate)
  }

  componentDidUpdate() {
    this.setHasRoomToRenderBelow();
  }

  render() {
    const { onSelect, allowedEditorTypes, showEditorSelector } = this.props;
    const { hasRoomToRenderBelow, showForm, primaryHoverMenu, secondaryMenuHover, menuState, textElements, mediaElements, formElements, advancedElements } = this.state;

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
      menuStyle.top = 8;
    } else {
      menuStyle.bottom = 48;
    }

    const secondaryMenuStyle = {
      zIndex: 101,
      width: 180,
      position: 'absolute',
      top: 0,
      left: 130
    };

    return (
      <div ref={(el) => this.wrapper = el} style={{position: 'absolute', ...menuStyle}}>
        <Menu style={{overflow: 'hidden'}}>
          { categories.map((category) => {
              if ([category.content].length && !category.willExpand) {
                return this.renderSubMenuItems(this.state[category.content])
              } else {
                return (
                  <div style={{textAlign: 'center', padding: '5px 0'}}key={category.name}>
                    <hr style={{margin: '5px'}}/>
                    <p 
                      onMouseOver={() => this.onHoverExpandMenu(category.name)}
                      onMouseOut={() => this.onHoverExpandMenu('')}
                      style={{color: 'rgb(96, 96, 96)', margin: '0', fontSize: '15px'}}
                      >{category.name}</p>
                    { menuState === category.name && this.renderSubMenuItems(this.state[category.content])}
                  </div>
                )
              }
            })
          }
        </Menu>

        <div ref={(el) => this.secondaryMenu = el} style={secondaryMenuStyle}>
          { showForm &&
            <Menu style={{overflow: 'hidden'}}>
              Form editor here
            </Menu>
          }
        </div>
      </div>
    );
  }

  renderSubMenuItems(categoryContent) {
    const { primaryHoverMenu } = this.state;
    
    const contents = categoryContent.map((editor) => {
      const isHover = editor.type === primaryHoverMenu;
      const style = {backgroundColor: isHover && '#3498db'};
      return (
        <a href="#"
          key={editor.text}
          style={{textDecoration: 'none'}}
          onClick={(editor.type === 'Form') ? (e) => e.preventDefault() : (e) => {
            e.preventDefault();
            onSelect(editor.type, editor.rows, editor.defaultAction);
          }}>
          <div
            className="menuItem"
            style={style}
            ref={(wrapper) => this[`wrapper${editor.type}`] = wrapper}
            onMouseEnter={(editor.type === 'Form') ? () => this.setState({showForm: true}) : () => this.setState({showForm: false})}
            onMouseOver={() => this.setHover(editor.type, true)}
            onMouseOut={() => this.setHover(editor.type, false)}>
            <editor.Button
              hideBackground={true}
              color={isHover ? '#fff' : '#C0C0C0'}
              textColor={isHover ? '#fff' : '#606060'}
              text={editor.text}
              textStyle={{ fontSize: 15 }}
              cursor="pointer"/>
          </div>
        </a>
      );
    })

    return contents;
  }

  onHoverExpandMenu(category) {
    const { menuState } = this.state;
    this.setState({menuState: menuState !== category && category});
  }

  setHover(primaryHoverMenu, isOver, secondaryMenuHover) {
    const update = {};
    if (primaryHoverMenu !== this.state.primaryHoverMenu) {
      update.primaryHoverMenu = isOver && primaryHoverMenu;
    }
    if (secondaryMenuHover !== this.state.secondaryMenuHover) {
      update.secondaryMenuHover = isOver && secondaryMenuHover;
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
