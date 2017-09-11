import React from 'react';

import IconButton from './IconButton';

export default class EmojiButton extends React.PureComponent {
  render() {
    return (
      <IconButton
        title="file-upload"
        pathNode={
          <path d="M12,0C5.4,0,0,5.4,0,12s5.4,12,12,12s12-5.4,12-12S18.6,0,12,0 M12,22C6.5,22,2,17.5,2,12S6.5,2,12,2s10,4.5,10,10 S17.5,22,12,22 M8,7C6.9,7,6,7.8,6,9c0,1.1,0.8,2,2,2c0,0,0.1,0,0.1,0c1.1,0,2-0.9,2-2C9.9,7.9,9.1,7,8,7 M16,7c-1.1,0-2,0.8-2,2 s0.9,2,2,2c0,0,0.1,0,0.1,0c1.1,0,2-0.9,2-2C17.9,7.9,17.1,7,16,7 M15.2,15c-0.7,1.2-1.9,2-3.3,2c-1.5,0-2.7-0.8-3.3-2H15 M18,13H6 c0,3.3,2.7,6,6,6S18,16.3,18,13"/>
        }
        viewBox="0 0 24 24"
        {...this.props}
      />
    );
  }
}