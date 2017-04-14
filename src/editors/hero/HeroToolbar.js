import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import ImageUploader from '../../components/ImageUploader';

import ImageResizeToolbar from '../image/ImageResizeToolbar';
import SelectSizeButton from '../../icons/SelectSizeButton';
import FileUploadButton from '../../icons/FileUploadButton';

export default class HeroToolbar extends React.Component {

  render() {
    const { localState } = this.props;
    const selectedToolbar = localState.get('selectedToolbar');

    const buttonProps = {
      hideBackground: true,
      color: '#808080',
      clickColor: '#333',
      activeColor: '#5e9bff'
    };

    return (
      <div style={{display:'grid', width: 50}}>
        <div style={{gridColumn: 1, gridRow: 1}}>
          <ImageUploader
            onUpload={(imageDetails) => this.handleUpload(imageDetails)}
          >
            <FileUploadButton onClick={() => {}} {...buttonProps} />
          </ImageUploader>
        </div>
        <div style={{gridColumn: 2, gridRow: 1}}>
          <SelectSizeButton onClick={() => this.showResizeToolbar()} isActive={(selectedToolbar === 'selectSize')} {...buttonProps} />
        </div>
      </div>
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

  showResizeToolbar() {
    const { onShowSecondaryToolbar, onChange, localState, persistedState } = this.props;
    const newLocalState = localState.set('selectedToolbar', 'selectSize');
    onChange({
      localState: newLocalState,
      persistedState
    });
    onShowSecondaryToolbar(
      <ImageResizeToolbar />
    );
  }
}

HeroToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onShowSecondaryToolbar: PropTypes.func.isRequired,
  canvasPosition: PropTypes.instanceOf(Map).isRequired
};
