import React from 'react';
import PropTypes from 'prop-types';
import { Map, fromJS } from 'immutable';
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
              content: '1',
              textAlign: 'center'
            }
          },
          {
            id: uuid(),
            type: 'Button',
            persistedState: {
              content: '2',
              textAlign: 'center'
            }
          },
          {
            id: uuid(),
            type: 'Button',
            persistedState: {
              content: '3',
              textAlign: 'center'
            }
          },
          {
            id: uuid(),
            type: 'Button',
            persistedState: {
              content: '4',
              textAlign: 'center'
            }
          },
          {
            id: uuid(),
            type: 'Button',
            persistedState: {
              content: '5',
              textAlign: 'center'
            }
          }
        ]
      }
    ])
  }
];

export default class EditorSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formPosition: Map(),
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
    const { addButtonPosition, onSelect } = this.props;
    const { formPosition, showForm, primaryHoverMenu, secondaryMenuHover } = this.state;

    const menuStyle = {
      zIndex: 11,
      position: 'absolute',
      top: addButtonPosition.get('top') + 10,
      left: addButtonPosition.get('left') - 50,
      width: 160
    };

    const secondaryMenyStyle = {
      zIndex: 11,
      position: 'absolute',
      top: (formPosition.get('top')) ? formPosition.get('top') : null,
      left: (formPosition.get('right')) ? formPosition.get('right') - 20 : null,
      width: 180
    };

    return (
      <div>
        <Menu style={menuStyle}>
          { editors.map((editor) => {
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
        { (showForm) ? (
          <Menu style={secondaryMenyStyle}>
            { formEditors.map((editor) => {
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
    if (!this.wrapperForm) {
      return;
    }
    const formPosition = convertBoundingBox(this.wrapperForm.getBoundingClientRect());
    if (!formPosition.equals(this.state.formPosition)) {
      this.setState({formPosition});
    }
  }

}
EditorSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
  addButtonPosition: PropTypes.instanceOf(Map).isRequired,
};