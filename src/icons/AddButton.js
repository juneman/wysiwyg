import React from 'react';

import IconButton from './IconButton';

export default class AddButton extends React.Component {
  render() {
    return (
      <IconButton
        title="add"
        pathNode={
          <path d="M18.984 12.984h-6v6h-1.969v-6h-6v-1.969h6v-6h1.969v6h6v1.969z"></path>
        }
        {...this.props}
      />
    );
  }
}
