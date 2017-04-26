import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { convertBoundingBox } from '../helpers/domHelpers';
import ImageUploader from './ImageUploader';
import AddButton from '../icons/AddButton';

export default class FullAddElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addButtonPositon: Map()
    };
  }

  componentDidMount() {
    this.setBoundingBox();
  }

  componentDidUpdate() {
    this.setBoundingBox();
  }

  render() {
    const { width } = this.props;
    let { height } = this.props;
    height = height || 150;

    const fullScreenStyles = {
      width,
      height,
      backgroundColor: '#dafeea',
      color: '#0bdc66',
      textAlign: 'center',
      border: '2px dotted #0bdc66',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    };

    const centeredContainer = {
      position: 'relative',
      height: height - 4,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    };

    return (
      <div style={centeredContainer}>
        <ImageUploader
          disableClick={true}
          onUpload={(imageDetails) => this.props.onUpload(imageDetails)}
        >
          <a href="#" style={{textDecoration: 'none'}} id="addBtn" onClick={(e) => this.handleAddNew(e)}>
            <div>
              <div style={fullScreenStyles}>
                <div style={{textAlign: 'center'}}>
                  <span style={{width: 30}} ref={(addButton) => this.addButton = addButton}><AddButton shadow={true} /></span>
                  <div style={{color: '#00b84f'}}>
                    <div style={{fontSize: 'larger', marginTop: 10}}>Click here to add some content</div>
                    <div style={{fontSize: 'smaller', marginTop: 10}}>or drag and drop an image</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </ImageUploader>
      </div>
    );
  }

  handleAddNew(e) {
    e.preventDefault();
    this.props.onClickAdd(this.state.addButtonPositon);
  }

  setBoundingBox() {
    if (!this.addButton) {
      return;
    }
    const addButtonPositon = convertBoundingBox(this.addButton.getBoundingClientRect());
    if (!addButtonPositon.equals(this.state.addButtonPositon)) {
      this.setState({addButtonPositon});
    }
  }
}

FullAddElement.propTypes = {
  onClickAdd: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number
};
