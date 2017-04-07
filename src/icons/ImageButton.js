import React from 'react';

import IconButton from './IconButton';

export default class ImageButton extends React.Component {
  render() {
    return (
      <IconButton
        iconId="icon-image"
        {...this.props}
      />
    );
  }
}
