import React from 'react';

import IconButton from './IconButton';

export default class TextButton extends React.Component {
  render() {
    return (
      <IconButton
        title="text_fields"
        pathNode={
          <path d="M21.516 9v3h-3v6.984h-3v-6.984h-3v-3h9zM2.484 3.984h13.031v3h-5.016v12h-3v-12h-5.016v-3z"></path>
        }
        {...this.props}
      />
    );
  }
}
