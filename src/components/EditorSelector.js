import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
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
import RatingButton from '../icons/RatingButton';

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
    type: 'Video'
  },
  {
    Button: HeroButton,
    text: 'Hero',
    type: 'Hero'
  },
  {
    Button: CodeButton,
    text: 'HTML',
    type: 'HTML'
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

export default class EditorSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: Map()
    };
  }

  componentDidMount() {
    this.setBoundingBox();
  }

  componentDidUpdate() {
    this.setBoundingBox();
  }
  
  render() {
    const { position } = this.state;
    const { setPosition, onSelect } = this.props;

    const menuStyle = {
      zIndex: 10,
      position: 'absolute',
      top: setPosition.get('top'),
      left: setPosition.get('left'),
      width: 160
    };

    return (
      <Menu style={menuStyle}>
        { editors.map((editor) => {
          return (
            <div key={editor.type}>
              <editor.Button
                hideBackground={true}
                color="#C0C0C0"
                textColor="#606060"
                hoverColor="#333"
                text={editor.text}
                onClick={() => onSelect(editor.type, editor.rows)}
              />
            </div>
          );
        })}
      </Menu>
    );
    
  }

  setBoundingBox() {
    if (!this.wrapper) {
      return;
    }
    const position = convertBoundingBox(this.wrapper.getBoundingClientRect());
    if (!position.equals(this.state.position)) {
      this.setState({position});
    }
  }

}
EditorSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  setPosition: PropTypes.instanceOf(Map).isRequired,
};