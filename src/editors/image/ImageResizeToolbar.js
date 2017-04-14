import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

export default class ImageResizeToolbar extends React.Component {
  constructor(props) {
    super(props);

    const { persistedState } = props;

    this.state = {
      fullWidth: persistedState.get('fullWidth') || false,
      crop: persistedState.get('crop') || false,
      height: persistedState.get('heightOverride') || persistedState.get('height') || '',
      width: persistedState.get('widthOverride') || persistedState.get('width') || ''
    };
  }

  render() {
    const { height, width, fullWidth, crop } = this.state;

    const formStyles = {
      width: 500,
      margin: 20
    };
    const titleStyles = {
      textTransform: 'uppercase',
      fontSize: 'smaller',
      color: '#808080'
    };

    return (
      <div style={formStyles}>
        <div style={titleStyles}>Set Width and Height</div>
        <div style={{marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: 20}}>
          <div style={{gridColumn: 1, gridRow: 1}}>
            <label>Width:</label><br/>
            <input className="form-control" type="number" step="1" min="10" max="1000" value={width} onChange={(e) => this.handleInputChange(e, 'width')} />
          </div>
          <div style={{gridColumn: 1, gridRow: 2}}>
            <input type="checkbox" checked={fullWidth} onChange={(e) => this.handleFullWidth(e)} />
            <label>Full Width</label>
          </div>
          <div style={{gridColumn: 2, gridRow: 1}}>
            <label>Height:</label><br/>
            <input className="form-control" type="number" step="1" min="10" max="1000" value={height} onChange={(e) => this.handleInputChange(e, 'height')} />
          </div>
          <div style={{gridColumn: 2, gridRow: 2}}>
            <input type="checkbox" checked={crop} onChange={(e) => this.handleCrop(e)} />
            <label>Crop Image to Size</label>
          </div>
          <div style={{gridColumn: 2, gridRow: 3, textAlign: 'right'}}>
            <button className="btn" onClick={(e) => this.handleSave(e)}>Save</button>
          </div>
        </div>
      </div>
    );
  }

  handleInputChange(e, name) {
    const val = e.target.value;
    const update = {};
    if (val && val.length) {
      update[name] = parseInt(val);
      this.setState(update);
    }
  }

  handleFullWidth(e) {
    const { zonePosition } = this.props;
    const val = e.target.checked;
    const update = {};
    update.fullWidth = val;
    if (val === true) {
      update.width = Math.floor(zonePosition.get('width'));
    } else {
      update.width = null;
    }
    this.setState(update);
  }

  handleCrop(e) {
    const crop = e.target.checked;
    this.setState({
      crop
    });
  }

  handleSave(e) {
    e.preventDefault();
    const { localState, persistedState, onSave } = this.props;
    const { height, width, fullWidth, crop } = this.state;
    const url = persistedState.get('url');

    const newPersistedState = persistedState
      .set('url', this.calculateResizedUrl(url, width, height, crop))
      .set('crop', crop)
      .set('fullWidth', fullWidth)
      .set('heightOverride', height)
      .set('widthOverride', width);

    const newLocalState = localState.delete('selectedToolbar');
      
    onSave({
      localState: newLocalState,
      persistedState: newPersistedState
    });
  }

  calculateResizedUrl(sourceUrl, width, height, crop) {
    const hostEndIndex = sourceUrl.indexOf('cloudinary.com') + 14;
    const host = sourceUrl.substring(0, hostEndIndex);
    const path = sourceUrl.substring(hostEndIndex);
    const folders = path.split('/');

    // Height/Width overrides go after /upload/ in the URL
    const uploadIndex = folders.indexOf('upload');
    const dynamicIndex = uploadIndex + 1;

    const dynamicFolder = `w_${width},h_${height},c_${crop ? 'crop' : 'scale'}`;

    if (folders[dynamicIndex].includes('w_') || folders[dynamicIndex].includes('h_')) {
      folders[dynamicIndex] = dynamicFolder;
    } else {
      folders.splice(dynamicIndex, 0, dynamicFolder);
    }

    return host + folders.join('/');
  }

}

ImageResizeToolbar.propTypes = {
  onSave: PropTypes.func,
  localState: PropTypes.instanceOf(Map),
  persistedState: PropTypes.instanceOf(Map),
  zonePosition: PropTypes.instanceOf(Map)
};