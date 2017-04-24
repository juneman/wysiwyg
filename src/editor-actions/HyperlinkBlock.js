import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Hyperlink from './Hyperlink';

export default class HyperlinkBlock extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false
    };
  }

  render() {
    const { persistedState } = this.props;

    return (
      <Hyperlink
        onChange={(href, isNewWindow) => this.handleLink(href, isNewWindow)}
        persistedState={persistedState}
      />);
  }

  handleLink(href, isNewWindow) {
    const { localState, persistedState, onChange } = this.props;
    
    // TODO: use editorState to modify based on the alignment selected
    const newPersistedState = persistedState
      .set('href', href)
      .set('isNewWindow', isNewWindow || false)
      .delete('buttonAction');

    onChange({
      localState,
      persistedState: newPersistedState
    });
  }

}

HyperlinkBlock.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
