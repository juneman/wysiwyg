import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Menu from '../../components/Menu';
import Toolbar from '../../components/Toolbar';
import Code from '../../editor-actions/Code';


const actions = [
  {
    Component: Code,
    props: {
      title: 'Enter your custom html below'
    },
    name: 'code'
  }
];

export default function HtmlEditorToolbar(props) {
  return (
    <Menu>
      <Toolbar
        actions={actions}
        {...props}
      />
    </Menu>
  );
}

HtmlEditorToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
