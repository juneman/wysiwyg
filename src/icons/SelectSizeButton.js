import React from 'react';

import IconButton from './IconButton';

export default class SelectSizeButton extends React.Component {
  render() {
    return (
      <IconButton
        title="select_size"
        pathNode={
          <path d="M8.703 20h9.297v-9.297zM8 19.297l9.297-9.297h-9.297v9.297zM26 20.5v3c0 0.281-0.219 0.5-0.5 0.5h-3.5v3.5c0 0.281-0.219 0.5-0.5 0.5h-3c-0.281 0-0.5-0.219-0.5-0.5v-3.5h-13.5c-0.281 0-0.5-0.219-0.5-0.5v-13.5h-3.5c-0.281 0-0.5-0.219-0.5-0.5v-3c0-0.281 0.219-0.5 0.5-0.5h3.5v-3.5c0-0.281 0.219-0.5 0.5-0.5h3c0.281 0 0.5 0.219 0.5 0.5v3.5h13.297l3.844-3.859c0.203-0.187 0.516-0.187 0.719 0 0.187 0.203 0.187 0.516 0 0.719l-3.859 3.844v13.297h3.5c0.281 0 0.5 0.219 0.5 0.5z"></path>
        }
        viewBox="0 0 26 28"
        {...this.props}
      />
    );
  }
}