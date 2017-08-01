import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Menu from '../../components/Menu';
import Toolbar from '../../components/Toolbar';

import SelectionFieldOptions from '../../editor-actions/SelectionFieldOptions';
import Margin from '../../editor-actions/Margin';

const actions = [
  {
    Component: SelectionFieldOptions,
    name: 'selectionfield-options'
  },
  {
    separator: true
  },
  {
      Component: Margin,
      name: 'margin'
  }
];

export default function SelectionToolbar(props) {
  return (
    <Menu>
      <Toolbar
        actions={actions}
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
