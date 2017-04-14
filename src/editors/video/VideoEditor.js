import React from 'react';

import HtmlEditor from '../html/HtmlEditor';

export default class VideoEditor extends React.Component {

  render() {
    return (
      <HtmlEditor
        ref={(child) => this.child = child}
        placeholder="Click to add your Video script"
        {...this.props}
      />
    );
  }

  generateHTML(persistedState) {
    if (!this.child) {
      return '';
    }
    return this.child.generateHTML(persistedState);
  }

}
