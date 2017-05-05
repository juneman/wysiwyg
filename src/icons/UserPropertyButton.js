import React from 'react';

import IconButton from './IconButton';

export default class UserProperty extends React.PureComponent {
  render() {
    return (
      <IconButton
        title="user-property"
        pathNode={
          <path d="M20 21.859c0 2.281-1.5 4.141-3.328 4.141h-13.344c-1.828 0-3.328-1.859-3.328-4.141 0-4.109 1.016-8.859 5.109-8.859 1.266 1.234 2.984 2 4.891 2s3.625-0.766 4.891-2c4.094 0 5.109 4.75 5.109 8.859zM16 8c0 3.313-2.688 6-6 6s-6-2.688-6-6 2.688-6 6-6 6 2.688 6 6z"></path>
        }
        viewBox="0 0 20 28"
        {...this.props}
      />
    );
  }
}
