import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Menu from '../../components/Menu';
import Toolbar from '../../components/Toolbar';

import ImageUploadWithPresets from '../../editor-actions/ImageUploadWithPresets';
import ImageSize from '../../editor-actions/ImageSize';
import FontColor from '../../editor-actions/FontColor';
import TextStyle from '../../editor-actions/TextStyle';

import { GALLERY_TYPES } from '../../helpers/constants';


export default function HeroToolbar(props) {

  const { height: maxHeight, width: maxWidth } = props.canvasPosition.toJS();

  const actions = [
    {
      Component: ImageUploadWithPresets,
      props: {
          maxWidth,
          maxHeight,
          galleryType: GALLERY_TYPES.HERO
        },
      name: 'image-upload-with-presets'
    },
    {
      Component: ImageSize,
      props: {
        heroImage: true
      },
      name: 'image-size'
    },
    {
      Component: FontColor,
      name: 'font-color'
    },
    {
      Component: TextStyle,
      name: 'text-style'
    }
  ];

  return (
    <Menu>
      <Toolbar
        actions={actions}
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
