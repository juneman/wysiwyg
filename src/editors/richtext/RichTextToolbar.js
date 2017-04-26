import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Menu from '../../components/Menu';
import Toolbar from '../../components/Toolbar';
import AlignmentInline from '../../editor-actions/AlignmentInline';
import Bold from '../../editor-actions/Bold';
import Italic from '../../editor-actions/Italic';
import FontColor from '../../editor-actions/FontColor';
import TextStyle from '../../editor-actions/TextStyle';
import HyperlinkInline from '../../editor-actions/HyperlinkInline';
import List from '../../editor-actions/List';
import UserProperty from '../../editor-actions/UserProperty';

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
    Component: TextStyle,
    name: 'text-style' 
  },
  {
    Component: FontColor,
    name: 'font-color'
  },
  {
    separator: true
  },
  {
    Component: List,
    name: 'list' 
  },
  {
    Component: AlignmentInline,
    name: 'alignment-inline'
  },
  {
    separator: true
  },
  {
    Component: HyperlinkInline,
    name: 'hyperlink-inline' 
  },
  {
    Component: UserProperty,
    name: 'user-property' 
  }
];

export default function RichTextToolbar(props) {
  return (
    <Menu>
      <Toolbar
        actions={actions}
        {...props}
      />
    </Menu>
  );
}

RichTextToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
