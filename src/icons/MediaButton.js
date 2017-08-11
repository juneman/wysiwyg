import React from 'react';

import IconButton from './IconButton';

export default class AdvancedStyling extends React.PureComponent {
  render() {
    return (
      <IconButton
        title="media"
        pathNode={
          <path d="M16 3h-1v8h1v3h-3v-1h-10v1h-3v-3h1v-8h-1v-3h3v1h10v-1h3v3zM14 1v1h1v-1h-1zM1 1v1h1v-1h-1zM2 13v-1h-1v1h1zM13 12v-1h1v-8h-1v-1h-10v1h-1v8h1v1h10zM15 13v-1h-1v1h1zM10 5h3v6h-7v-2h-3v-6h7v2zM4 8h5v-4h-5v4zM12 10v-4h-2v3h-3v1h5z"></path>
        }
        viewBox="0 0 15 15"
        {...this.props}
      />
    );
  }
}
