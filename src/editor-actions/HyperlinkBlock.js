import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Hyperlink from './Hyperlink';

export default class HyperlinkBlock extends React.Component {

  render() {
    const {
      persistedState,
      isActive,
      onToggleActive,
      hasRoomToRenderBelow,
      focusEditor
    } = this.props;
    const { href, isNewWindow } = persistedState.toJS();

    return (
      <Hyperlink
        href={ href }
        isNewWindow={ isNewWindow }
        isActive={ isActive }
        onToggleActive={ onToggleActive }
        hasRoomToRenderBelow={ hasRoomToRenderBelow }
        onChange={ (href, isNewWindow) => this.handleLink(href, isNewWindow) }
        focusEditor={ focusEditor }
      />);
  }

  handleLink(href, isNewWindow) {
    const { localState, persistedState, onChange } = this.props;

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
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  hasRoomToRenderBelow: PropTypes.bool.isRequired,
  focusEditor: PropTypes.func.isRequired
};
