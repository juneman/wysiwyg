import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Alignment from './Alignment';

export default class AlignmentBlock extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false
    };
  }

  render() {
    return (<Alignment onChange={(type) => this.handleAlignment(type)} />);
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
  onChange: PropTypes.func.isRequired
};
