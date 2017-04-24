import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Menu from '../../components/Menu';
import Toolbar from '../../components/Toolbar';

import ImageUpload from '../../editor-actions/ImageUpload';
import FontColor from '../../editor-actions/FontColor';

const editorActions = [
  {
    Component: ImageUpload,
    name: 'image-upload'
  },
  {
    Component: FontColor,
    name: 'font-color'
  }
];

export default function HeroToolbar(props) {
  return (
    <Menu>
      <Toolbar
        editorActions={editorActions}
        {...props}
      />
    </Menu>
  );
}

HeroToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  canvasPosition: PropTypes.instanceOf(Map).isRequired
};
