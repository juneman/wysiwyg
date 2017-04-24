import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import ImageUploader from '../components/ImageUploader';

import FileUploadButton from '../icons/FileUploadButton';

export default class ImageUpload extends React.Component {

  render() {
    const buttonProps = {
      hideBackground: true,
      color: '#808080',
      clickColor: '#333',
      activeColor: '#5e9bff'
    };

    return (
      <ImageUploader
        onUpload={(imageDetails) => this.handleUpload(imageDetails)}
      >
        <FileUploadButton onClick={() => {}} {...buttonProps} />
      </ImageUploader>
    );
  }

  handleUpload(imageDetails) {
    const { url, height, width } = imageDetails;
    const { localState, persistedState, onChange, canvasPosition } = this.props;
    
    let newPersistedState = persistedState
      .set('url', url)
      .set('height', height)
      .set('width', width);

    // Make sure the uploaded image does not have a larger size than the canvas
    if (height > canvasPosition.get('height')) {
      newPersistedState = newPersistedState.set('heightOverride', canvasPosition.get('height'));
    }
    if (width > canvasPosition.get('width')) {
      newPersistedState = newPersistedState.set('widthOverride', canvasPosition.get('width'));
    }

    onChange({
      localState,
      persistedState: newPersistedState
    });
  }

}

ImageUpload.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  canvasPosition: PropTypes.instanceOf(Map).isRequired
};
