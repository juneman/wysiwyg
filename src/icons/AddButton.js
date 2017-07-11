import React from 'react';
import tinycolor from 'tinycolor2'

import IconButton from './IconButton';

export default class AddButton extends React.PureComponent {
  render() {
    return (
      <IconButton
        title="add"
        pathNode={
          <path d="M22 11.5v3c0 0.828-0.672 1.5-1.5 1.5h-6.5v6.5c0 0.828-0.672 1.5-1.5 1.5h-3c-0.828 0-1.5-0.672-1.5-1.5v-6.5h-6.5c-0.828 0-1.5-0.672-1.5-1.5v-3c0-0.828 0.672-1.5 1.5-1.5h6.5v-6.5c0-0.828 0.672-1.5 1.5-1.5h3c0.828 0 1.5 0.672 1.5 1.5v6.5h6.5c0.828 0 1.5 0.672 1.5 1.5z"></path>
        }
        viewBox="0 0 22 28"

        color="#00b850"
        hoverColor={tinycolor("#00b850").lighten(5)}
        {...this.props}
      />
    );
  }
}
