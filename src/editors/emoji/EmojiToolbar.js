import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Menu from '../../components/Menu';
import Toolbar from '../../components/Toolbar';
import EmojiSelector from '../../editor-actions/EmojiSelector';
import AlignmentBlock from '../../editor-actions/AlignmentBlock';
import ImageSize from '../../editor-actions/ImageSize';
import Margin from '../../editor-actions/Margin';

export default function EmojiToolbar(props) {

  const { height: maxHeight, width: maxWidth } = props.canvasPosition.toJS();

  const actions = [
    {
      Component: EmojiSelector,
      props: {
        maxWidth,
        maxHeight
      },
      name: 'emoji-selector'
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
      Component: Margin,
      name: 'margin'
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

EmojiToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  canvasPosition: PropTypes.instanceOf(Map).isRequired
};
