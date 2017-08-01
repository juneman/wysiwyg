import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Menu from '../../components/Menu';
import Toolbar from '../../components/Toolbar';
import InputFieldOptions from '../../editor-actions/InputFieldOptions';
import Margin from '../../editor-actions/Margin';

const actions = [
  {
    Component: InputFieldOptions,
    name: 'inputfield-options'
  },
  {
    separator: true
  },
  {
      Component: Margin,
      name: 'margin'
  }
];

export default function TextAreaInputToolbar(props) {
  return (
    <Menu>
      <Toolbar
        actions={actions}
        {...props}
      />
    </Menu>
  );
}

TextAreaInputToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
