import React from 'react';

import IconButton from './IconButton';

export default class CodeButton extends React.Component {
  render() {
    return (
      <IconButton
        title="add"
        pathNode={
          <path d="M14.578 16.594l4.641-4.594-4.641-4.594 1.406-1.406 6 6-6 6zM9.422 16.594l-1.406 1.406-6-6 6-6 1.406 1.406-4.641 4.594z"></path>
        }
        {...this.props}
      />
    );
  }
}
