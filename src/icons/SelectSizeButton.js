import React from 'react';

import IconButton from './IconButton';

export default class SelectSizeButton extends React.Component {
  render() {
    return (
      <IconButton
        title="select_size"
        pathNode={
          <path d="M21 15v6h-6l2.297-2.297-2.906-2.859 1.453-1.453 2.859 2.906zM9 21h-6v-6l2.297 2.297 2.859-2.906 1.453 1.453-2.906 2.859zM3 9v-6h6l-2.297 2.297 2.906 2.859-1.453 1.453-2.859-2.906zM15 3h6v6l-2.297-2.297-2.859 2.906-1.453-1.453 2.906-2.859z"></path>
        }
        {...this.props}
      />
    );
  }
}
