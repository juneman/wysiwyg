import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import ImageUploader from '../../components/ImageUploader';

export default class ImageEditor extends React.Component {

  render() {
    const { persistedState, isEditing } = this.props;
    const { url, height, width, heightOverride, widthOverride } = persistedState.toJS();

    const dropzoneStyle = {
      height: 70,
      paddingTop: 30,
      width: '100%',
      backgroundColor: '#bce2d8',
      color: '#0bdc66',
      textAlign: 'center'
    };

    let node = (<div className="placeholder" style={{height: 100}}>Click to add your Image</div>);
    if (url) {
      node = (<img src={url} height={heightOverride || height} width={widthOverride || width} />);
    } else if (isEditing) {
      node = (
        <ImageUploader
          onUpload={(imageDetails) => this.handleUpload(imageDetails)}
        >
          <div style={dropzoneStyle}>
            <div>Click here to select an image to upload</div>
            <div>or drag and drop an image</div>
          </div>
        </ImageUploader>
      );
    }

    return (
      <div>
        { node }
      </div>
    );
  }

  generateHTML(persistedState) {
    const { url, height, width, heightOverride, widthOverride } = persistedState.toJS();

    const html = `<img src="${url}" height="${heightOverride || height}" width="${widthOverride || width}" />`;
    return html;
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

ImageEditor.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  localState: PropTypes.instanceOf(Map).isRequired,
  canvasPosition: PropTypes.instanceOf(Map).isRequired
};

