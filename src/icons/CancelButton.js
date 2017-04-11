import React from 'react';

import IconButton from './IconButton';

export default class CancelButton extends React.Component {
  render() {
    return (
      <IconButton
        title="close"
        pathNode={
          <path d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z"></path>
        }
        {...this.props}
      />
    );
  }
}
