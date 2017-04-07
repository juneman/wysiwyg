import React from 'react';

import EditorBase from './EditorBase';

export default class RichTextEditor extends EditorBase {

  shouldComponentUpdate(nextProps) {
    if (this.props.isEditing === true && nextProps.isEditing === true) {
      return false;
    }
    return true;
  }

  render() {
    const { isEditing, value } = this.props;

    const content = (value && value.content) || 'Edit This Text';

    return (
      <div>
        { (isEditing) ? (
          <div
            contentEditable={true}
            onKeyUp={(e) => this.handleKeyUp(e)}
            dangerouslySetInnerHTML={{
              __html: content
            }}
          />
        ) : (
          <div>{content}</div>
        )}
      </div>
    );
  }

  handleKeyUp(e) {
    const content = e.currentTarget.innerHTML || '';
    this.saveChanges({content});
  }

  saveChanges(value) {
    this.props.onChange({
      value,
      html: `<div><div>${value.content}</div></div>`
    });
  }
}
