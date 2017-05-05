import React from 'react';

import IconButton from './IconButton';

export default class VideoButton extends React.PureComponent {
  render() {
    return (
      <IconButton
        title="video"
        pathNode={
          <path d="M28 5.5v17c0 0.406-0.25 0.766-0.609 0.922-0.125 0.047-0.266 0.078-0.391 0.078-0.266 0-0.516-0.094-0.703-0.297l-6.297-6.297v2.594c0 2.484-2.016 4.5-4.5 4.5h-11c-2.484 0-4.5-2.016-4.5-4.5v-11c0-2.484 2.016-4.5 4.5-4.5h11c2.484 0 4.5 2.016 4.5 4.5v2.578l6.297-6.281c0.187-0.203 0.438-0.297 0.703-0.297 0.125 0 0.266 0.031 0.391 0.078 0.359 0.156 0.609 0.516 0.609 0.922z"></path>
        }
        viewBox="0 0 28 28"
        {...this.props}
      />
    );
  }
}
