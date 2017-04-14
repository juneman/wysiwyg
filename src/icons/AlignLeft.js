import React from 'react';

import IconButton from './IconButton';

export default class AlignLeft extends React.Component {
  render() {
    return (
      <IconButton
        title="add"
        pathNode={
          <path d="M3 3h18v2.016h-18v-2.016zM3 21v-2.016h18v2.016h-18zM3 12.984v-1.969h18v1.969h-18zM15 6.984v2.016h-12v-2.016h12zM15 15v2.016h-12v-2.016h12z"></path>
        }
        {...this.props}
      />
    );
  }
}
