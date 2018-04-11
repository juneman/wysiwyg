import React from 'react';

import IconButton from './IconButton';

export default class ActionButton extends React.PureComponent {
  render() {
    return (
      <IconButton
        title="action-button"
        pathNode={
          <path d="M24,2V12.4a2,2,0,0,1-2,2h-.77a2.14,2.14,0,0,0-.62-1.88L13.29,5a2,2,0,0,0-1.52-.65A2.16,2.16,0,0,0,9.61,6.5v7.9H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0H22A2,2,0,0,1,24,2ZM19.11,14.53a.47.47,0,0,0,.32-.8L12.08,6.17a.46.46,0,0,0-.78.33V17.61a.46.46,0,0,0,.78.33l2.24-2.3L15.69,19a.46.46,0,0,0,.6.25l1.27-.55a.48.48,0,0,0,.24-.62l-1.44-3.51h2.74Z"></path>
        }
        viewBox="0 0 24 20"
        {...this.props}
        iconStyle={{
          width: 24,
          height: 20
        }}
      />
    );
  }
}
