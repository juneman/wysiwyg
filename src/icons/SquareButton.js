import React from 'react';

import IconButton from './IconButton';

export default class SquareButton extends React.PureComponent {
  render() {
    return (
      <IconButton
        title="square"
        pathNode={
          <path d="M24 6.5v15c0 2.484-2.016 4.5-4.5 4.5h-15c-2.484 0-4.5-2.016-4.5-4.5v-15c0-2.484 2.016-4.5 4.5-4.5h15c2.484 0 4.5 2.016 4.5 4.5z"></path>
        }
        viewBox="0 0 24 28"
        {...this.props}
      />
    );
  }
}

