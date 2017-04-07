import React from 'react';

import IconButton from './IconButton';

export default class MoveVertButton extends React.Component {
  render() {
    return (
      <IconButton
        iconId="icon-swap_vert"
        {...this.props}
      />
    );
  }
}
