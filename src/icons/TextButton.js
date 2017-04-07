import React from 'react';

import IconButton from './IconButton';

export default class TextButton extends React.Component {
  render() {
    return (
      <IconButton
        iconId="icon-text_fields"
        text="Text"
        {...this.props}
      />
    );
  }
}
