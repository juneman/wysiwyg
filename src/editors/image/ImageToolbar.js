import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Menu from '../../components/Menu';
import Toolbar from '../../components/Toolbar';
import ImageUploadWithPresets from '../../editor-actions/ImageUploadWithPresets';
import AlignmentBlock from '../../editor-actions/AlignmentBlock';
import ImageSize from '../../editor-actions/ImageSize';
import HyperlinkBlock from '../../editor-actions/HyperlinkBlock';

import { GALLERY_TYPES } from '../../helpers/constants';

export default function ImageToolbar(props) {

  const { height: maxHeight, width: maxWidth } = props.canvasPosition.toJS();

  const actions = [
    {
      Component: ImageUploadWithPresets,
      props: {
        maxWidth,
        maxHeight,
        galleryType: GALLERY_TYPES.EMOJI
      },
      name: 'image-upload-with-presets'
    },
    {
      Component: ImageSize,
      name: 'image-size'
    },
    {
      Component: AlignmentBlock,
      name: 'alignment-block'
    },
    {
      Component: HyperlinkBlock,
      name: 'hyperlink-block'
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

ImageToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  canvasPosition: PropTypes.instanceOf(Map).isRequired
};
