import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Menu from '../../components/Menu';
import Toolbar from '../../components/Toolbar';

import AlignmentBlock from '../../editor-actions/AlignmentBlock';
import Bold from '../../editor-actions/Bold';
import Italic from '../../editor-actions/Italic';
import FontColor from '../../editor-actions/FontColor';
import BackgroundColor from '../../editor-actions/BackgroundColor';
import ButtonAction from '../../editor-actions/ButtonAction';
import Margin from '../../editor-actions/Margin';
import ButtonStyles from '../../editor-actions/ButtonStyles';

const actions = [
  {
    Component: AlignmentBlock,
    name: 'alignment-block'
  },
  // {
  //   Component: FontColor,
  //   name: 'font-color',
  //   isButtonComponent: true
  // },
  // {
  //   Component: BackgroundColor,
  //   name: 'background-color'
  // },
  {
    Component: Margin,
    name: 'margin'
  },
  {
    separator: true
  },
  {
    Component: ButtonStyles,
    name: 'button-styles'
  },
  {
    Component: ButtonAction,
    name: 'button-action'
  },

];

export default function ButtonToolbar(props) {
  return (
    <Menu>
      <Toolbar
        actions={actions}
        {...props}
      />
    </Menu>
  );
}

ButtonToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
