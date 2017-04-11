import React from 'react';

import IconButton from './IconButton';

export default class OkButton extends React.Component {
  render() {
    return (
      <IconButton
        title="check"
        pathNode={
          <path d="M9 16.172l10.594-10.594 1.406 1.406-12 12-5.578-5.578 1.406-1.406z"></path>
        }
        {...this.props}
      />
    );
  }
}
