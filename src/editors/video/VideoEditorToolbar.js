import React from 'react';

import HtmlEditorToolbar from '../html/HtmlEditorToolbar';
import HtmlEditorCodeToolbar from '../html/HtmlEditorCodeToolbar';

export default class VideoEditorToolbar extends React.Component {

  render() {
    // Render the normal HTML toolbars with different text
    return (
      <HtmlEditorToolbar
        CodeToolbarElement={
          <HtmlEditorCodeToolbar
            title="Paste in the script for your Video below"
          />
        }
        {...this.props}
      />
    );
  }

}
