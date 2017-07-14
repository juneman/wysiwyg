import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { Map } from 'immutable';

export class ImageUploader extends React.Component {
  constructor(props) { 
    super(props);

    this.state = {
      isUploading: false
    };
  }

  render() {
    const { children, disableClick, disableUploadText, preventDropOnDocument } = this.props;
    const { isUploading } = this.state;

    const baseStyle = {
      border: 'none',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column'
    };
    const style = { ...baseStyle, ...this.props.style };

    const uploadingContainerStyle = {
      ...style,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'hsla(37, 80%, 65%, 0.43)',
      color: 'hsla(37, 80%, 35%, 0.43)',
      borderRadius: 4
    };

    return isUploading && !disableUploadText ? (
      <div style={ uploadingContainerStyle }>Uploading...</div>
    ) : (
      <Dropzone
        multiple={false}
        accept="image/*"
        style={style}
        onDrop={(files) => this.handleDrop(files)}
        disableClick={disableClick}
        preventDropOnDocument={preventDropOnDocument}
      >
        {children}
      </Dropzone>
    );
  }

  handleDrop(files) {
    this.setState({ isUploading: true });
    this.uploadImageFile(files[0]);
  }

  uploadImageFile(file) {
    const { onUpload } = this.props;
    const { uploadUrl, apiKey, accountId, userId } = this.props.cloudinary.toJS();

    var data = new FormData();
    data.append('file', file);

    data.append('api_key', apiKey);
    data.append('timestamp', (Date.now() / 1000 | 0));
    data.append('tags', [`account-${accountId}`, `user-${userId}`].join(','));
    data.append('folder', accountId);

    // Transforming GIFs can have unintended consequences for Cloudinary,
    // like causing the GIF to become to large if it's scaled up, or dropping
    // frames if a transformation doesn't support the full resolution.
    const uploadPreset = (file.type === 'image/gif') ? 'gif_preset' : 'sdruqnxi';
    data.append('upload_preset', uploadPreset);

    fetch(uploadUrl, {
      method: 'POST',
      body: data
    }).then((response) => {
      return response.json();
    }).then((imageDetails) => {
      this.setState({ isUploading: false });
      onUpload(imageDetails);
    }).catch((err) => {
      console.error('parsing failed', err);
    });
  }

}

ImageUploader.propTypes = {
  children: PropTypes.element.isRequired,
  onUpload: PropTypes.func.isRequired,
  disableClick: PropTypes.bool,
  preventDropOnDocument: PropTypes.bool,
  disableUploadText: PropTypes.bool,
  style: PropTypes.object,
  cloudinary: PropTypes.instanceOf(Map).isRequired
};

ImageUploader.defaultProps = {
  disableUploadText: false
};

function mapStateToProps(state) {
  return {
    cloudinary: state.editor.get('cloudinary')
  };
}

export default connect(mapStateToProps)(ImageUploader);
