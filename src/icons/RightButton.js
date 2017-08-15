import React from 'react';

import IconButton from './IconButton';

export default class RightButton extends React.PureComponent {
  render() {
    return (
      <IconButton
        title="menu"
        pathNode={
          <path d="M4.5 7q0 0.203-0.148 0.352l-3.5 3.5q-0.148 0.148-0.352 0.148t-0.352-0.148-0.148-0.352v-7q0-0.203 0.148-0.352t0.352-0.148 0.352 0.148l3.5 3.5q0.148 0.148 0.148 0.352z"></path>
        }
        viewBox="0 0 14 14"
        {...this.props}
      />
    );
  }
}
