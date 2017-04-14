import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import AlignLeft from '../../icons/AlignLeft';
import AlignCenter from '../../icons/AlignCenter';
import AlignRight from '../../icons/AlignRight';

export default class ButtonToolbar extends React.Component {

  render() {
    const buttonProps = {
      hideBackground: true,
      color: '#808080',
      clickColor: '#333',
      activeColor: '#5e9bff'
    };

    return (
      <div>
        <AlignLeft onClick={() => this.handleAlignment('left')} {...buttonProps} />
        <AlignCenter onClick={() => this.handleAlignment('center')} {...buttonProps} />
        <AlignRight onClick={() => this.handleAlignment('right')} {...buttonProps} />
      </div>
    );
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

ButtonToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
