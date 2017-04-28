import React from 'react';
import PropTypes from 'prop-types';
import { Map, List, fromJS } from 'immutable';
import uuid from 'uuid/v4';

import Menu from './Menu';
import { convertBoundingBox } from '../helpers/domHelpers';
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
    text: 'Hero',
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
    Button: ButtonButton,
    text: 'Button',
    type: 'Button'
  }
];

const formEditors = [
  {
    Button: FormTextInputButton,
    text: 'Text Field',
    type: 'TextInput'
  },
  {
    Button: FormTextInputButton,
    text: 'TextArea Field',
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
    Button: FormDropdownButton,
    text: 'Dropdown',
    type: 'SelectionField',
    rows: fromJS([
      {
        id: uuid(),
        zones: [
          {
            id: uuid(),
            type: 'SelectionField',
            persistedState: {
              fieldType: 'dropdown'
            }
          }
        ]
      }
    ])
  },
  {
    Button: FormCheckboxButton,
    text: 'Checkbox',
    type: 'SelectionField',
    rows: fromJS([
      {
        id: uuid(),
        zones: [
          {
            id: uuid(),
            type: 'SelectionField',
            persistedState: {
              fieldType: 'checkbox'
            }
          }
        ]
      }
    ])
  },
  {
    Button: FormRatingButton,
    text: 'Rating',
    rows: fromJS([
      {
        id: uuid(),
        zones: [
          {
            id: uuid(),
            type: 'RichText',
            persistedState: {
              content: 'Please Rate Us From 1 (not so great) to 5 (awesome!)'
            }
          }
        ]
      },
      {
        id: uuid(),
        zones: [
          {
            id: uuid(),
            type: 'Button',
            persistedState: {
              content: '<p>1</p>',
              textAlign: 'center'
            }
          },
          {
            id: uuid(),
            type: 'Button',
            persistedState: {
              content: '<p>2</p>',
              textAlign: 'center'
            }
          },
          {
            id: uuid(),
            type: 'Button',
            persistedState: {
              content: '<p>3</p>',
              textAlign: 'center'
            }
          },
          {
            id: uuid(),
            type: 'Button',
            persistedState: {
              content: '<p>4</p>',
              textAlign: 'center'
            }
          },
          {
            id: uuid(),
            type: 'Button',
            persistedState: {
              content: '<p>5</p>',
              textAlign: 'center'
            }
          }
        ]
      }
    ])
  },
  {
    Button: PrevNextButton,
    text: 'Prev/Next',
    rows: fromJS([
      {
        id: uuid(),
        zones: [
          {
            id: uuid(),
            type: 'Button',
            persistedState: {
              content: '<p>Previous</p>',
              textAlign: 'left',
              buttonAction: 'prev'
            }
          },
          {
            id: uuid(),
            type: 'Button',
            persistedState: {
              content: '<p>Next</p>',
              textAlign: 'right',
              buttonAction: 'next'
            }
          }
        ]
      }
    ])
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
      position: Map(),
      formPosition: Map(),
      secondaryMenuPosition: Map(),
      showForm: false,
      primaryHoverMenu: '',
      secondaryMenuHover: ''
    };
  }

  componentDidMount() {
    this.setBoundingBox();
  }

  componentDidUpdate() {
    this.setBoundingBox();
  }

  render() {
    const { addButtonPosition, onSelect, screenSize, allowedEditorTypes } = this.props;
    const { position, formPosition, secondaryMenuPosition, showForm, primaryHoverMenu, secondaryMenuHover } = this.state;

    const positionBelowAddBtn = {
      top: addButtonPosition.get('top') + 10,
      left: addButtonPosition.get('left') - 50,
    };

    const positionAboveAddBtn = {
      top: addButtonPosition.get('top') - position.get('height'),
      left: addButtonPosition.get('left') - 50,
    };

    const hasRoomToRenderBelow = (addButtonPosition.get('top') + 300 < screenSize.get('height')) ? true : false;

    const menuPosition = hasRoomToRenderBelow
      ? positionBelowAddBtn
      : positionAboveAddBtn;

    const menuStyle = (position.get('height')) ? {
      zIndex: 11,
      position: 'absolute',
      width: 160
    } : {};

    const secondaryMenuStyle = (secondaryMenuPosition.get('height')) ? {
      zIndex: 11,
      position: 'absolute',
      width: 180,
      top: (formPosition.get('top')) ? formPosition.get('top') - secondaryMenuPosition.get('height') + 20 : null,
      left: (formPosition.get('right')) ? formPosition.get('right') - 20 : null,
    } : {};

    const trimmedEditors = (allowedEditorTypes.isEmpty()) ? editors : editors.filter((editor) => {
      return (allowedEditorTypes.includes(editor.text));
    });
    const trimmedFormEditors = (allowedEditorTypes.isEmpty()) ? formEditors : formEditors.filter((editor) => {
      return (allowedEditorTypes.includes(editor.text));
    });

    return (
      <div style={{position: 'absolute', ...menuPosition}}>
        <div ref={(el) => this.wrapper = el} style={menuStyle}>
          <Menu>
            { trimmedEditors.map((editor) => {
              const isHover = (editor.text === primaryHoverMenu) ? true : false;
              const style = {
                backgroundColor: isHover ? '#3498db' : null
              };
              return (
                <div
                  style={style}
                  key={editor.text}
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
                    onClick={(editor.type === 'Form') ? null : () => onSelect(editor.type, editor.rows, editor.defaultAction)}
                  />
                </div>
              );
            })}
          </Menu>
        </div>
        <div ref={(el) => this.secondaryMenu = el} style={secondaryMenuStyle}>
          { (showForm) ? (
            <Menu>
              { trimmedFormEditors.map((editor) => {
                const isHover = (editor.text === secondaryMenuHover) ? true : false;
                const style = {
                  backgroundColor: isHover ? '#3498db' : null
                };
                return (
                  <div
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

  setBoundingBox() {
    const update = {};
    if (this.wrapper) {
      const position = convertBoundingBox(this.wrapper.getBoundingClientRect());
      if (!position.equals(this.state.position)) {
        update.position = position;
      }
    }
    if (this.secondaryMenu) {
      const secondaryMenuPosition = convertBoundingBox(this.secondaryMenu.getBoundingClientRect());
      if (!secondaryMenuPosition.equals(this.state.secondaryMenuPosition)) {
        update.secondaryMenuPosition = secondaryMenuPosition;
      }
    }
    if (this.wrapperForm) {
      const formPosition = convertBoundingBox(this.wrapperForm.getBoundingClientRect());
      if (!formPosition.equals(this.state.formPosition)) {
        update.formPosition = formPosition;
      }
    }
    if (Object.keys(update).length) {
      this.setState(update);
    }
  }

}
EditorSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
  addButtonPosition: PropTypes.instanceOf(Map).isRequired,
  screenSize: PropTypes.instanceOf(Map).isRequired,
  allowedEditorTypes: PropTypes.instanceOf(List)
};