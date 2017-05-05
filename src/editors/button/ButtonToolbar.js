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
import HyperlinkBlock from '../../editor-actions/HyperlinkBlock';
import ButtonStyles from '../../editor-actions/ButtonStyles';

const actions = [
  {
    Component: Bold,
    name: 'bold' 
  },
  {
    Component: Italic,
    name: 'italic' 
  },
  {
    Component: AlignmentBlock,
    name: 'alignment-block'
  },
  {
    separator: true
  },
  {
    Component: FontColor,
    name: 'font-color'
  },
  {
    Component: BackgroundColor,
    name: 'background-color'
  },
  {
    Component: ButtonStyles,
    name: 'button-styles'
  },
  {
    separator: true
  },
  {
    Component: ButtonAction,
    name: 'button-action'
  },
  {
    Component: HyperlinkBlock,
    name: 'hyperlink-block'
  }
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