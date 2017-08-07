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
    Button: VideoButton,
    text: 'Video',
    type: 'Video',
    defaultAction: 'code',
    category: 'Media'
  },
  {
    Button: HeroButton,
    text: 'Hero/Header',
    type: 'Hero',
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

const categories = [
  {
    name: 'Text',
    content: 'textElements',
    willExpand: false
  },
  {
    name: 'Media',
    content: 'mediaElements',
    willExpand: true
  },
  {
    name: 'Forms',
    content: 'formElements',
    willExpand: true
  },
  {
    name: 'Advanced',
    content: 'advancedElements',
    willExpand: true
  },
]
const textEditors = ['RichText']
const formEditors = ['TextInput', 'TextAreaInput', 'SelectionField', 'Rating'];
const mediaEditors = ['Image', 'Hero', 'Video'];
const advancedEditors = ['Button', 'HTML'];

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

    const trimmedEditors = (allowedEditorTypes.isEmpty()) ? editors : editors.filter((editor) => {
      return (allowedEditorTypes.includes(editor.type));
    });
    const trimmedFormEditors = (allowedEditorTypes.isEmpty()) ? formEditors : formEditors.filter((editor) => {
      return (editors.includes(editor));
    });

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
    const { hasRoomToRenderBelow, showForm, primaryHoverMenu, secondaryMenuHover, textElements, mediaElements, formElements, advancedElements } = this.state;

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

    const trimmedEditors = (allowedEditorTypes.isEmpty()) ? editors : editors.filter((editor) => {
      return (allowedEditorTypes.includes(editor.type));
    });

    // const trimmedFormEditors = !allowedEditorTypes.isEmpty() && editors.filter((editor) => {
    //     return (formEditors.includes(editor.type) && allowedEditorTypes.includes(editor.type))
    // })
    const trimmedFormEditors = []
    return (
      <div ref={(el) => this.wrapper = el} style={{position: 'absolute', ...menuStyle}}>
        <Menu style={{overflow: 'hidden'}}>
          { categories.map((category) => {
              if ([category.content].length && !category.willExpand) {
                console.log('LOG category', [category.content])
                return (
                  [category.content].map((editor) => {
                    const isHover = (editor.type === primaryHoverMenu) ? true : false;
                    const style = {backgroundColor: isHover ? '#3498db' : null};
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
                          <TextButton
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
                )
              } else {

                return (
                  <div key={category.name}>{category.name}</div>
                )
              }
            })
          }

          { mediaElements.map((editor) => {
            const isHover = (editor.type === primaryHoverMenu) ? true : false;
            const style = {
              backgroundColor: isHover ? '#3498db' : null
            };
            return (
              <a href="#"
                key={editor.text}
                style={{textDecoration: 'none'}}
                onClick={(editor.type === 'Form') ? (e) => e.preventDefault() : (e) => {
                  e.preventDefault();
                  onSelect(editor.type, editor.rows, editor.defaultAction);
                }}
              >
                <div
                  className="menuItem"
                  style={style}
                  ref={(wrapper) => this[`wrapper${editor.type}`] = wrapper}
                  onMouseEnter={(editor.type === 'Form') ? () => this.setState({showForm: true}) : () => this.setState({showForm: false})}
                  onMouseOver={() => this.setHover(editor.type, true)}
                  onMouseOut={() => this.setHover(editor.type, false)}
                >
                  <editor.Button
                    hideBackground={true}
                    color={isHover ? '#fff' : '#C0C0C0'}
                    textColor={isHover ? '#fff' : '#606060'}
                    text={editor.text}
                    textStyle={{ fontSize: 15 }}
                    cursor="pointer"
                  />
                </div>
              </a>
            );
          })}
        </Menu>

        <div ref={(el) => this.secondaryMenu = el} style={secondaryMenuStyle}>
          { (showForm) ? (
            <Menu style={{overflow: 'hidden'}}>
              Form editor here
            </Menu>
          ) : null}
        </div>
      </div>
    );
  }

  renderSubMenuItems() {

    //  { categories.map((category) => {
    //     if ([category.content].length && !category.willExpand) {
    //       console.log('LOG category', [category.content]})
    //       return (
    //         [category.content].map((editor) => {
    //           const isHover = (editor.type === primaryHoverMenu) ? true : false;
    //           const style = {backgroundColor: isHover ? '#3498db' : null};
    //           return (
    //             <a href="#"
    //               key={editor.text}
    //               style={{textDecoration: 'none'}}
    //               onClick={(editor.type === 'Form') ? (e) => e.preventDefault() : (e) => {
    //                 e.preventDefault();
    //                 onSelect(editor.type, editor.rows, editor.defaultAction);
    //               }}>
    //               <div
    //                 className="menuItem"
    //                 style={style}
    //                 ref={(wrapper) => this[`wrapper${editor.type}`] = wrapper}
    //                 onMouseEnter={(editor.type === 'Form') ? () => this.setState({showForm: true}) : () => this.setState({showForm: false})}
    //                 onMouseOver={() => this.setHover(editor.type, true)}
    //                 onMouseOut={() => this.setHover(editor.type, false)}>
    //                 <TextButton
    //                   hideBackground={true}
    //                   color={isHover ? '#fff' : '#C0C0C0'}
    //                   textColor={isHover ? '#fff' : '#606060'}
    //                   text={editor.text}
    //                   textStyle={{ fontSize: 15 }}
    //                   cursor="pointer"/>
    //               </div>
    //             </a>
    //           );
    //         })
    //       )
    //     } else {

    //       return (
    //         <div key={category.name}>{category.name}</div>
    //       )
    //     }
    //   })
    // }

  }

  setHover(primaryHoverMenu, isOver, secondaryMenuHover) {
    const update = {};
    if (primaryHoverMenu !== this.state.primaryHoverMenu) {
      update.primaryHoverMenu = (isOver) ? primaryHoverMenu : null;
    }
    if (secondaryMenuHover !== this.state.secondaryMenuHover) {
      update.secondaryMenuHover = (isOver) ? secondaryMenuHover : null;
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
