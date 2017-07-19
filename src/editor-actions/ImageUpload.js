import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps } from '../helpers/styles/editor';
import ImageUploader from '../components/ImageUploader';

import FileUploadButton from '../icons/FileUploadButton';

export default class ImageUpload extends React.Component {

  render() {
    const buttonProps = getButtonProps(false);

    return (
      <ImageUploader
        disableUploadText
        onUpload={(imageDetails) => this.handleUpload(imageDetails)}
      >
        <FileUploadButton onClick={() => {}} {...buttonProps} />
      </ImageUploader>
    );
  }

  handleUpload(imageDetails) {
    const { url, width } = imageDetails;
    const { localState, persistedState, onChange, maxWidth } = this.props;

    const urlWithoutProtocol = url.replace(/^https?\:\/\//i, "//");

    let newPersistedState = persistedState
      .set('url', urlWithoutProtocol)
      .set('width', width)
      .set('textAlign', 'center');

    // Make sure the uploaded image does not have a larger size than available
    if (maxWidth && width > maxWidth) {
      newPersistedState = newPersistedState.set('widthOverride', maxWidth);
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
  maxWidth: PropTypes.number
};
