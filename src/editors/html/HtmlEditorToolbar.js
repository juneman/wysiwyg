import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Toolbar from '../../components/Toolbar';
import Code from '../../editor-actions/Code';

export default class HtmlEditorToolbar extends React.Component {

  render() {
    const { localState, persistedState, onChange } = this.props;

    const toolbarProps = {
      localState,
      persistedState,
      onChange
    };

    return (
      <Toolbar>
        <Code title="Enter your Custom HTML Below" {...toolbarProps} />
      </Toolbar>
    );
  }

}

HtmlEditorToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
