import React from 'react';
import PropTypes from 'prop-types';
import { CustomPicker } from 'react-color';
import {  inputStyle } from '../helpers/styles/editor';


class ColorPicker extends React.Component {
  render() {
    const { color, onChange } = this.props;
    console.log(color, onChange);
    return (<input
        style={ inputStyle }
        autoFocus
        onClickCapture={ (e) => e.target.focus() }
        value={ color }
        onChange={ (e) => { onChange(e.target.value); } }/>);
  }
}


ColorPicker.propTypes = {
    color: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

export { ColorPicker as ColorPicker };

export default CustomPicker(ColorPicker);