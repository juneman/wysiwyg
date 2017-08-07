import { List, fromJS } from 'immutable';
import uuid from 'uuid/v4';
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

export const DRAGABLE_ITEMS = {
  ROW: 'row',
  ZONE: 'zone'
};

export const GALLERY_TYPES = {
  HERO: 'gallery',
  EMOJI: 'emoji'
};

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
    type: 'Forms'
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


// Editor Selector render return elements
 // return (
 //      <div ref={(el) => this.wrapper = el} style={{position: 'absolute', ...menuStyle}}>
 //        <Menu style={{overflow: 'hidden'}}>
 //          { trimmedEditors.map((editor) => {
 //            const isHover = (editor.type === primaryHoverMenu) ? true : false;
 //            const style = {
 //              backgroundColor: isHover ? '#3498db' : null
 //            };
 //            return (
 //              <a href="#"
 //                key={editor.text}
 //                style={{textDecoration: 'none'}}
 //                onClick={(editor.type === 'Form') ? (e) => e.preventDefault() : (e) => {
 //                  e.preventDefault();
 //                  onSelect(editor.type, editor.rows, editor.defaultAction);
 //                }}
 //              >
 //                <div
 //                  className="menuItem"
 //                  style={style}
 //                  ref={(wrapper) => this[`wrapper${editor.type}`] = wrapper}
 //                  onMouseEnter={(editor.type === 'Form') ? () => this.setState({showForm: true}) : () => this.setState({showForm: false})}
 //                  onMouseOver={() => this.setHover(editor.type, true)}
 //                  onMouseOut={() => this.setHover(editor.type, false)}
 //                >
 //                  <editor.Button
 //                    hideBackground={true}
 //                    color={isHover ? '#fff' : '#C0C0C0'}
 //                    textColor={isHover ? '#fff' : '#606060'}
 //                    text={editor.text}
 //                    textStyle={{ fontSize: 15 }}
 //                    cursor="pointer"
 //                  />
 //                </div>

 //              </a>
 //            );
 //          })}
 //        </Menu>
 //        <div ref={(el) => this.secondaryMenu = el} style={secondaryMenuStyle}>
 //          { (showForm) ? (
 //            <Menu style={{overflow: 'hidden'}}>
 //              { trimmedFormEditors.map((editor) => {
 //                const isHover = (editor.type === secondaryMenuHover) ? true : false;
 //                const style = {
 //                  backgroundColor: isHover ? '#3498db' : null
 //                };
 //                return (
 //                  <div
 //                    className="secondaryMenuItem"
 //                    style={style}
 //                    key={editor.text}
 //                    onMouseOver={() => this.setHover('Form', true, editor.type)}
 //                    onMouseOut={() => this.setHover('Form', false, editor.type)}
 //                  >
 //                    <editor.Button
 //                      hideBackground={true}
 //                      color={isHover ? '#fff' : '#C0C0C0'}
 //                      textColor={isHover ? '#fff' : '#606060'}
 //                      text={editor.text}
 //                      onClick={() => onSelect(editor.type, editor.rows, editor.defaultAction)}
 //                    />
 //                  </div>
 //                );
 //              })}
 //            </Menu>
 //          ) : null}
 //        </div>
 //      </div>
 //    );
 //  }