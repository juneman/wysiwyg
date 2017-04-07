import React from 'react';

import IconButton from './IconButton';

export default class CancelButton extends React.Component {
  render() {
    return (
      <IconButton
        iconId="icon-close"
        {...this.props}
      />
    );
  }
}
