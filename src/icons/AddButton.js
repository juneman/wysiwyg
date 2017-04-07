import React from 'react';

import IconButton from './IconButton';

export default class AddButton extends React.Component {
  render() {
    return (
      <IconButton
        iconId="icon-add"
        {...this.props}
      />
    );
  }
}
