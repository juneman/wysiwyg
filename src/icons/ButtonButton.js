import React from 'react';

import IconButton from './IconButton';

export default class ButtonButton extends React.Component {
  render() {
    return (
      <IconButton
        title="add"
        pathNode={
          <path d="M14,1.85292871 L14,8.02940147 C14,9.05237977 13.1700365,9.88234329 12.1470582,9.88234329 L1.85294183,9.88234329 C0.829963526,9.88234329 0,9.05237977 0,8.02940147 L0,1.85292871 C0,0.829950413 0.829963526,-1.31130219e-05 1.85294183,-1.31130219e-05 L12.1470582,-1.31130219e-05 C13.1700365,-1.31130219e-05 14,0.829950413 14,1.85292871 Z"></path>
        }
        viewBox="0 0 14 10"
        {...this.props}
      />
    );
  }
}
