import React from 'react';

import IconButton from './IconButton';

export default class MarginButton extends React.PureComponent {
  render() {
    return (
      <IconButton
        title="margin"
        pathNode={
          <g id="Layer_1-2" data-name="Layer 1"><path d="M29.71,0,25.49,4.57h-19L2.29,0ZM25.49,27.43h-19L2.29,32H29.71ZM27.43,6.51v19L32,29.71V2.29ZM0,2.29V29.71l4.57-4.22v-19Z"/><rect style={{opacity: 0.5}} x="6.86" y="6.86" width="18.29" height="18.29"/></g>
        }
        viewBox="0 0 32, 32"
        {...this.props}
        iconStyle={{
          width: 22,
          height: 22
        }}
      />
    );
  }
}
