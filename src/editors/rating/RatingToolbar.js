import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Menu from '../../components/Menu';
import Toolbar from '../../components/Toolbar';

import RatingOptions from '../../editor-actions/RatingOptions';
import Margin from '../../editor-actions/Margin';

const actions = [
  {
    Component: RatingOptions,
    name: 'rating-options'
  },
  {
    separator: true
  },
  {
      Component: Margin,
      name: 'margin'
  }
];

export default function RatingToolbar(props) {
  return (
    <Menu>
      <Toolbar
        actions={actions}
        {...props}
      />
    </Menu>
  );
}

RatingToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
