import React from 'react';

import IconButton from './IconButton';

export default class EditButton extends React.Component {
  render() {
    return (
      <IconButton
        iconId="icon-mode_edit"
        {...this.props}
      />
    );
  }
}
