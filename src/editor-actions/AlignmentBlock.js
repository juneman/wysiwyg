import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Alignment from './Alignment';

export default class AlignmentBlock extends React.Component {
  render() {
    const { onToggleActive, isActive } = this.props;
    return (
      <Alignment
        onChange={(type) => this.handleAlignment(type)}
        onToggleActive={onToggleActive}
        isActive={isActive}
      />);
  }

  handleAlignment(type) {
    const { localState, persistedState, onChange } = this.props;
    
    const newPersistedState = persistedState.set('textAlign', type);

    onChange({
      localState,
      persistedState: newPersistedState
    });
  }

}

AlignmentBlock.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};
