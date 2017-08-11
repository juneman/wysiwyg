import React from 'react';

import IconButton from './IconButton';

export default class AdvancedStyling extends React.PureComponent {
  render() {
    return (
      <IconButton
        title="menu"
        pathNode={
          <path d="M3 9.75v1.5q0 0.312-0.219 0.531t-0.531 0.219h-1.5q-0.312 0-0.531-0.219t-0.219-0.531v-1.5q0-0.312 0.219-0.531t0.531-0.219h1.5q0.312 0 0.531 0.219t0.219 0.531zM3 5.75v1.5q0 0.312-0.219 0.531t-0.531 0.219h-1.5q-0.312 0-0.531-0.219t-0.219-0.531v-1.5q0-0.312 0.219-0.531t0.531-0.219h1.5q0.312 0 0.531 0.219t0.219 0.531zM3 1.75v1.5q0 0.312-0.219 0.531t-0.531 0.219h-1.5q-0.312 0-0.531-0.219t-0.219-0.531v-1.5q0-0.312 0.219-0.531t0.531-0.219h1.5q0.312 0 0.531 0.219t0.219 0.531z"></path>
        }
        viewBox="0 0 2 14"
        {...this.props}
      />
    );
  }
}
