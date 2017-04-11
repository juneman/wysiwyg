import React from 'react';

import IconButton from './IconButton';

export default class ItalicButton extends React.Component {
  render() {
    return (
      <IconButton
        title="format_italic"
        pathNode={
          <path d="M9.984 3.984h8.016v3h-2.813l-3.375 8.016h2.203v3h-8.016v-3h2.813l3.375-8.016h-2.203v-3z"></path>
        }
        {...this.props}
      />
    );
  }
}
