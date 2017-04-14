import React from 'react';

import IconButton from './IconButton';

export default class AlignCenter extends React.Component {
  render() {
    return (
      <IconButton
        title="add"
        pathNode={
          <path d="M3 3h18v2.016h-18v-2.016zM6.984 6.984h10.031v2.016h-10.031v-2.016zM3 12.984v-1.969h18v1.969h-18zM3 21v-2.016h18v2.016h-18zM6.984 15h10.031v2.016h-10.031v-2.016z"></path>
        }
        {...this.props}
      />
    );
  }
}
