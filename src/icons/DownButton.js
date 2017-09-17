import React from 'react';

import IconButton from './IconButton';

export default class DownButton extends React.PureComponent {
  render() {
    return (
      <IconButton
        title="menu"
        pathNode={
          <path d="M8 5.5q0 0.203-0.148 0.352l-3.5 3.5q-0.148 0.148-0.352 0.148t-0.352-0.148l-3.5-3.5q-0.148-0.148-0.148-0.352t0.148-0.352 0.352-0.148h7q0.203 0 0.352 0.148t0.148 0.352z"></path>
        }
        viewBox="0 0 12 12"
        {...this.props}
      />
    );
  }
}
