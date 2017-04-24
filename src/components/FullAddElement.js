import React from 'react';
import PropTypes from 'prop-types';

import ImageUploader from './ImageUploader';
import AddButton from '../icons/AddButton';

export default class FullAddElement extends React.Component {
  render() {
    const { height, width } = this.props;

    const fullScreenStyles = {
      height: height - (height / 3),
      width: width || '100%',
      paddingTop: height / 3,
      backgroundColor: '#bce2d8',
      color: '#0bdc66',
      textAlign: 'center',
      border: '2px dotted #0bdc66'
    };

    return (
      <ImageUploader
        disableClick={true}
        onUpload={(imageDetails) => this.props.onUpload(imageDetails)}
      >
        <a href="#" id="addBtn" onClick={(e) => this.handleSelect(e)}>
          <div style={fullScreenStyles}>
            <AddButton shadow={true} />
            <div style={{color: '#00b84f'}}>
              <div style={{fontSize: 'larger', marginTop: 10}}>Click here to add some content</div>
              <div style={{fontSize: 'smaller', marginTop: 10}}>or drag and drop an image</div>
            </div>
          </div>
        </a>
      </ImageUploader>
    );
  }

  handleSelect(e) {
    e.preventDefault();
    this.props.onClick();
  }
}

FullAddElement.propTypes = {
  onClick: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};
