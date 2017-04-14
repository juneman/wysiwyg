import React from 'react';

import IconButton from './IconButton';

export default class MoreButton extends React.Component {
  render() {
    return (
      <IconButton
        title="more"
        pathNode={
          <path d="M12 15.984c1.078 0 2.016 0.938 2.016 2.016s-0.938 2.016-2.016 2.016-2.016-0.938-2.016-2.016 0.938-2.016 2.016-2.016zM12 9.984c1.078 0 2.016 0.938 2.016 2.016s-0.938 2.016-2.016 2.016-2.016-0.938-2.016-2.016 0.938-2.016 2.016-2.016zM12 8.016c-1.078 0-2.016-0.938-2.016-2.016s0.938-2.016 2.016-2.016 2.016 0.938 2.016 2.016-0.938 2.016-2.016 2.016z"></path>
        }
        {...this.props}
      />
    );
  }
}
