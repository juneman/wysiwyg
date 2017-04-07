import React from 'react';

import IconButton from './IconButton';

export default class OkButton extends React.Component {
  render() {
    return (
      <IconButton
        iconId="icon-check"
        {...this.props}
      />
    );
  }
}
