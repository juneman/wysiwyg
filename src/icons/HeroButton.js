import React from 'react';

import IconButton from './IconButton';

export default class HeroButton extends React.PureComponent {
  render() {
    return (
      <IconButton
        title="add"
        pathNode={
          <path d="M1.50998238,12 L13.5076442,12 C13.8371688,12 14,11.8754739 14,11.4972141 L14,7 L1,7 L1,11.4972141 C1,11.831426 1.20094071,12 1.50998238,12 Z M15.0000179,1.35416667 L15.0000179,11.6458333 C15.0000179,12.390625 14.3973386,13 13.6607306,13 L1.33928731,13 C0.60267929,13 0,12.390625 0,11.6458333 L0,1.35416667 C0,0.609375 0.60267929,0 1.33928731,0 L13.6607306,0 C14.3973386,0 15.0000179,0.609375 15.0000179,1.35416667 Z"></path>
        }
        viewBox="0 0 15 13"
        {...this.props}
      />
    );
  }
}
