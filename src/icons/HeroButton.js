import React from 'react';

import IconButton from './IconButton';

export default class HeroButton extends React.Component {
  render() {
    return (
      <IconButton
        title="add"
        pathNode={
          <path d="M18.984 18v-9.984h-13.969v9.984h13.969zM18.984 3.984c1.125 0 2.016 0.938 2.016 2.016v12c0 1.078-0.938 2.016-2.016 2.016h-13.969c-1.125 0-2.016-0.938-2.016-2.016v-12c0-1.078 0.891-2.016 2.016-2.016h13.969z"></path>
        }
        {...this.props}
      />
    );
  }
}
