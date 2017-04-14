import React from 'react';

import IconButton from './IconButton';

export default class AlignRight extends React.Component {
  render() {
    return (
      <IconButton
        title="add"
        pathNode={
          <path d="M3 3h18v2.016h-18v-2.016zM9 9v-2.016h12v2.016h-12zM3 12.984v-1.969h18v1.969h-18zM9 17.016v-2.016h12v2.016h-12zM3 21v-2.016h18v2.016h-18z"></path>
        }
        {...this.props}
      />
    );
  }
}
