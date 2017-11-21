import React from 'react';

import IconButton from './IconButton';

export default class MarginButton extends React.PureComponent {
  render() {
    return (
      <IconButton
        title="margin"
        pathNode={
          <g id="Layer_1-2" data-name="Layer 1"><path d="M4.7,25.54,2,28.24V3.76l.54.54L4.7,6.46ZM29.46,4.3,27.3,6.46V25.54l2.7,2.7V3.76Zm-3.92,23H6.46L4.3,29.46,3.76,30H28.24l-.54-.54Zm0-22.6L28.24,2H3.76l2.7,2.7Z"/><path d="M25,7V25H7V7ZM0,1.75v28.5L1.25,29V3ZM1.75,32h28.5L29,30.75H3ZM32,30.25V1.75L30.75,3V29ZM30.25,0H1.75L3,1.25H29Z"/></g>
        }
        viewBox="0 0 14 14"
        {...this.props}
      />
    );
  }
}
