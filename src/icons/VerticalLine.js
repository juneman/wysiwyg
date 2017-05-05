import React from 'react';

import IconButton from './IconButton';

export default class VerticalLine extends React.PureComponent {
  render() {
    return (
      <IconButton
        title="verticalLine"
        pathNode={
          <path d="M11.953 7.703c-0.078 0.172-0.25 0.297-0.453 0.297h-3.5v19.5c0 0.281-0.219 0.5-0.5 0.5h-3c-0.281 0-0.5-0.219-0.5-0.5v-19.5h-3.5c-0.203 0-0.375-0.109-0.453-0.297s-0.047-0.391 0.078-0.547l5.469-6c0.094-0.094 0.219-0.156 0.359-0.156v0c0.141 0 0.281 0.063 0.375 0.156l5.547 6c0.125 0.156 0.156 0.359 0.078 0.547z"></path>
        }
        viewBox="0 0 12 28"
        {...this.props}
      />
    );
  }
}
