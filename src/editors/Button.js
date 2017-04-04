import React from 'react';

import EditorBase from './EditorBase';

export default class ButtonEditor extends EditorBase {
  constructor(props) {
    super(props);

    this.state = {
      content: 'Button Text'
    };
  }

  render() {
    let { content } = this.state;

    return (
      <button className="button" disabled>
        <span
          contentEditable={true}
          onKeyUp={(e) => this.handleKeyUp(e)}
          dangerouslySetInnerHTML={{
            __html: content
          }}
        ></span>
      </button>
    );
  }

  handleKeyUp(e) {
    const content = e.currentTarget.innerHTML || '';
    this.saveChanges(content);
  }

  saveChanges(content) {
    const { onChange } = this.props;
    if (onChange) {
      onChange({
        content,
        html: `<button class="button">${content}</button>`
      });
    }
  }
}
