import React from 'react';
import PropTypes from 'prop-types';
import { labelStyle, colors } from '../helpers/styles/editor';
import ReactSimpleRange from 'react-simple-range';

const ZoomSlider = ({ handleChange, zoom }) => {
  return(
    <div>
      <label style={ labelStyle }>Zoom:</label>
      <ReactSimpleRange
        label
        sliderSize={6}
        trackColor={colors.informationalBlue}
        thumbColor={colors.informationalBlue}
        max={200}
        min={100}
        onChange={handleChange}
        value={zoom}
      />
    </div>
  );
};

ZoomSlider.propTypes = {
  handleChange: PropTypes.func.isRequired,
  zoom: PropTypes.number.isRequried
};

export default ZoomSlider;
