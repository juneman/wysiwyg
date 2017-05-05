import React from 'react';

import IconButton from './IconButton';

export default class AlignRight extends React.Component {
  render() {
    return (
      <IconButton
        title="add"
        pathNode={
          <path d="M28 21v2c0 0.547-0.453 1-1 1h-26c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h26c0.547 0 1 0.453 1 1zM28 15v2c0 0.547-0.453 1-1 1h-20c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h20c0.547 0 1 0.453 1 1zM28 9v2c0 0.547-0.453 1-1 1h-24c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h24c0.547 0 1 0.453 1 1zM28 3v2c0 0.547-0.453 1-1 1h-18c-0.547 0-1-0.453-1-1v-2c0-0.547 0.453-1 1-1h18c0.547 0 1 0.453 1 1z"></path>
        }
        viewBox="0 0 28 28"
        {...this.props}
      />
    );
  }
}