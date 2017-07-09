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
      title: 'Paste in the script for your video below',
      overrideSanitizeHtmlConfig: {
        allowedTags: false,
        allowedAttributes: false
      }
    },
    name: 'code'
  }
];

export default function VideoEditorToolbar(props) {
  return (
    <Menu>
      <Toolbar
        actions={actions}
        {...props}
      />
    </Menu>
  );
}

VideoEditorToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
