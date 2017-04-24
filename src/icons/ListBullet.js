import React from 'react';

import IconButton from './IconButton';

export default class ListBullet extends React.Component {
  render() {
    return (
      <IconButton
        title="add"
        pathNode={
          <path d="M6 22c0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3 3 1.344 3 3zM6 14c0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3 3 1.344 3 3zM28 20.5v3c0 0.266-0.234 0.5-0.5 0.5h-19c-0.266 0-0.5-0.234-0.5-0.5v-3c0-0.266 0.234-0.5 0.5-0.5h19c0.266 0 0.5 0.234 0.5 0.5zM6 6c0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3 3 1.344 3 3zM28 12.5v3c0 0.266-0.234 0.5-0.5 0.5h-19c-0.266 0-0.5-0.234-0.5-0.5v-3c0-0.266 0.234-0.5 0.5-0.5h19c0.266 0 0.5 0.234 0.5 0.5zM28 4.5v3c0 0.266-0.234 0.5-0.5 0.5h-19c-0.266 0-0.5-0.234-0.5-0.5v-3c0-0.266 0.234-0.5 0.5-0.5h19c0.266 0 0.5 0.234 0.5 0.5z"></path>
        }
        {...this.props}
      />
    );
  }
}
