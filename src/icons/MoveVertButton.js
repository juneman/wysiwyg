import React from 'react';

import IconButton from './IconButton';

export default class MoveVertButton extends React.Component {
  render() {
    return (
      <IconButton
        title="swap_vert"
        pathNode={
          <path d="M9 3l3.984 3.984h-3v7.031h-1.969v-7.031h-3zM15.984 17.016h3l-3.984 3.984-3.984-3.984h3v-7.031h1.969v7.031z"></path>
        }
        {...this.props}
      />
    );
  }
}
