import React from 'react';

import IconButton from './IconButton';

export default class ImageButton extends React.Component {
  render() {
    return (
      <IconButton
        title="icon-image"
        pathNode={
          <path d="M8.484 13.5l-3.469 4.5h13.969l-4.5-6-3.469 4.5zM21 18.984c0 1.078-0.938 2.016-2.016 2.016h-13.969c-1.078 0-2.016-0.938-2.016-2.016v-13.969c0-1.078 0.938-2.016 2.016-2.016h13.969c1.078 0 2.016 0.938 2.016 2.016v13.969z"></path>
        }
        {...this.props}
      />
    );
  }
}
