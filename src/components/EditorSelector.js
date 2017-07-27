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
    type: 'RichText'
  },
  {
    Button: ImageButton,
    text: 'Image',
    type: 'Image'
  },
  {
    Button: VideoButton,
    text: 'Video',
    type: 'Video',
    defaultAction: 'code'
  },
  {
    Button: HeroButton,
    text: 'Hero/Header',
    type: 'Hero'
  },
  {
    Button: CodeButton,
    text: 'HTML',
    type: 'HTML',
    defaultAction: 'code'
  },
  {
    Button: FormButton,
    text: 'Form',
    type: 'Form'
  },
  {
    Button: FormTextInputButton,
    text: 'Small Text Input',
    type: 'TextInput'
  },
  {
    Button: FormTextInputButton,
    text: 'Big Text Area',
    type: 'TextAreaInput'
  },
  {
    Button: FormRadioButton,
    text: 'Radio Select',
    type: 'SelectionField',
    rows: fromJS([
      {
        id: uuid(),
        zones: [
          {
            id: uuid(),
            type: 'SelectionField',
            persistedState: {
              fieldType: 'radio'
            }
          }
        ]
      }
    ])
  },
  {
    Button: FormRatingButton,
    text: 'Rating',
    type: 'Rating'
  },
  {
    Button: ButtonButton,
    text: 'Button',
    type: 'Button'
  }
];

const formEditors = [];

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
    const { hasRoomToRenderBelow, showForm, primaryHoverMenu, secondaryMenuHover } = this.state;

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
    const trimmedFormEditors = (allowedEditorTypes.isEmpty()) ? formEditors : formEditors.filter((editor) => {
      return (allowedEditorTypes.includes(editor.text));
    });

    return (
      <div ref={(el) => this.wrapper = el} style={{position: 'absolute', ...menuStyle}}>
        <Menu style={{overflow: 'hidden'}}>
          { trimmedEditors.map((editor) => {
            const isHover = (editor.text === primaryHoverMenu) ? true : false;
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
                  onMouseOver={() => this.setHover(editor.text, true)}
                  onMouseOut={() => this.setHover(editor.text, false)}
                >
                  <editor.Button
                    hideBackground={true}
                    color={isHover ? '#fff' : '#C0C0C0'}
                    textColor={isHover ? '#fff' : '#606060'}
                    text={editor.text}
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
              { trimmedFormEditors.map((editor) => {
                const isHover = (editor.text === secondaryMenuHover) ? true : false;
                const style = {
                  backgroundColor: isHover ? '#3498db' : null
                };
                return (
                  <div
                    className="secondaryMenuItem"
                    style={style}
                    key={editor.text}
                    onMouseOver={() => this.setHover('Form', true, editor.text)}
                    onMouseOut={() => this.setHover('Form', false, editor.text)}
                  >
                    <editor.Button
                      hideBackground={true}
                      color={isHover ? '#fff' : '#C0C0C0'}
                      textColor={isHover ? '#fff' : '#606060'}
                      text={editor.text}
                      onClick={() => onSelect(editor.type, editor.rows, editor.defaultAction)}
                    />
                  </div>
                );
              })}
            </Menu>
          ) : null}
        </div>
      </div>
    );
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
