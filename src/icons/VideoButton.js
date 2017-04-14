import React from 'react';

import IconButton from './IconButton';

export default class VideoButton extends React.Component {
  render() {
    return (
      <IconButton
        title="add"
        pathNode={
          <path d="M9 9.984l6.984 4.031-6.984 3.984v-8.016zM21 20.016v-12h-18v12h18zM21 6c1.078 0 2.016 0.891 2.016 2.016v12c0 1.078-0.938 1.969-2.016 1.969h-18c-1.078 0-2.016-0.891-2.016-1.969v-12c0-1.125 0.938-2.016 2.016-2.016h7.594l-3.281-3.281 0.703-0.703 3.984 3.984 3.984-3.984 0.703 0.703-3.281 3.281h7.594z"></path>
        }
        {...this.props}
      />
    );
  }
}
