import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Menu from '../../components/Menu';
import Toolbar from '../../components/Toolbar';

import SelectionFieldOptions from '../../editor-actions/SelectionFieldOptions';

const editorActions = [
  {
    Component: SelectionFieldOptions,
    name: 'selectionfield-options'
  }
];

export default function SelectionToolbar(props) {
  return (
    <Menu>
      <Toolbar
        editorActions={editorActions}
        {...props}
      />
    </Menu>
  );
}

SelectionToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
