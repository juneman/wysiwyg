import React from 'react';

import IconButton from './IconButton';

export default class AlignCenter extends React.PureComponent {
  render() {
    return (
      <IconButton
        title="add"
        pathNode={
          <path d="M28 21v2c0 0.547-0.453 1-1 1h-26c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h26c0.547 0 1 0.453 1 1zM22 15v2c0 0.547-0.453 1-1 1h-14c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h14c0.547 0 1 0.453 1 1zM26 9v2c0 0.547-0.453 1-1 1h-22c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h22c0.547 0 1 0.453 1 1zM20 3v2c0 0.547-0.453 1-1 1h-10c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h10c0.547 0 1 0.453 1 1z"></path>
        }
        viewBox="0 0 28 28"
        {...this.props}
      />
    );
  }
}
