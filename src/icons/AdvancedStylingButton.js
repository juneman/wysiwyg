import React from 'react';

import IconButton from './IconButton';

export default class AdvancedStyling extends React.Component {
  render() {
    return (
      <IconButton
        title="advanced-styling"
        pathNode={
          <path d="M32 6h-2v16h2v6h-6v-2h-20v2h-6v-6h2v-16h-2v-6h6v2h20v-2h6v6zM28 2v2h2v-2h-2zM2 2v2h2v-2h-2zM4 26v-2h-2v2h2zM26 24v-2h2v-16h-2v-2h-20v2h-2v16h2v2h20zM30 26v-2h-2v2h2zM20 10h6v12h-14v-4h-6v-12h14v4zM8 16h10v-8h-10v8zM24 20v-8h-4v6h-6v2h10z"></path>
        }
        viewBox="0 0 32 28"
        {...this.props}
      />
    );
  }
}