import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { placeholderStyle } from '../../helpers/styles/editor';

export default class VideoEditor extends React.Component {

  componentWillMount() {
    const { persistedState, localState, onChange } = this.props;

    if (!persistedState.get('content')) {
      const newPersistedState = persistedState.set('content', '');
      const newLocalState = localState.set('content', '');
      onChange({
        persistedState: newPersistedState,
        localState: newLocalState,
        html: this.generateHTML(newPersistedState)
      });
    }
  }

  render() {
    const { persistedState } = this.props;

    const content = persistedState.get('content');

    return (content) ? (
      <div
        className="video-html"
        dangerouslySetInnerHTML={{__html: content}}
      ></div>
    ) : (
      <div style={ placeholderStyle }>Add your Video Script</div>
    );
  }

  // Instance Method
  focus() {
    // Do nothing for this editor
  }

  generateHTML(persistedState) {
    const content = persistedState.get('content') || '';

    return `<div class="video-html">${content}</div>`;
  }

}

VideoEditor.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  localState: PropTypes.instanceOf(Map).isRequired
};
