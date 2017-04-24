import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Menu from '../../components/Menu';
import Toolbar from '../../components/Toolbar';
import ImageUpload from '../../editor-actions/ImageUpload';
import AlignmentBlock from '../../editor-actions/AlignmentBlock';
import ImageSize from '../../editor-actions/ImageSize';
import HyperlinkBlock from '../../editor-actions/HyperlinkBlock';

export default function ImageToolbar(props) {
  const editorActions = [
    {
      Component: ImageUpload,
      props: {
        canvasPosition: props.canvasPosition
      },
      name: 'image-upload'
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
        editorActions={editorActions}
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
