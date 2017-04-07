import React from 'react';

import EditorBase from './EditorBase';

export default class PlainTextEditor extends EditorBase {
  constructor(props) {
    super(props);

    this.state = {
      content: props.content || 'Edit this text'
    };
  }

  render() {
    let { content } = this.state;
    const { isActive } = this.props;

    return (
      <div
        contentEditable={(isActive ? true : false)}
        onKeyUp={(e) => this.handleKeyUp(e)}
        dangerouslySetInnerHTML={{
          __html: content
        }}
      ></div>
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
        html: content
      });
    }
  }
}
