import React from 'react';

import IconButton from './IconButton';

export default class PrevNextButton extends React.Component {
  render() {
    return (
      <IconButton
        title="prev-next"
        pathNode={
          <path d="M27.266 4.641c0.203 0.203 0.203 0.516 0 0.719l-2.203 2.203c-0.281 0.281-0.672 0.438-1.062 0.438h-21c-0.547 0-1-0.453-1-1v-4c0-0.547 0.453-1 1-1h9v-1c0-0.547 0.453-1 1-1h2c0.547 0 1 0.453 1 1v1h8c0.391 0 0.781 0.156 1.062 0.438zM12 19h4v8c0 0.547-0.453 1-1 1h-2c-0.547 0-1-0.453-1-1v-8zM25 12c0.547 0 1 0.453 1 1v4c0 0.547-0.453 1-1 1h-21c-0.391 0-0.781-0.156-1.062-0.438l-2.203-2.203c-0.203-0.203-0.203-0.516 0-0.719l2.203-2.203c0.281-0.281 0.672-0.438 1.062-0.438h8v-3h4v3h9z"></path>
        }
        viewBox="0 0 28 28"
        {...this.props}
      />
    );
  }
}
