import React from 'react';
import PropTypes from 'prop-types';
import { CustomPicker } from 'react-color';
import { Hue, Saturation } from 'react-color/lib/components/common';
import {  inputStyle } from '../helpers/styles/editor';


class ColorPicker extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      inputVal: props.hex
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const { hex, saveUpdatedHexValue } = this.props;

    if (hex != nextProps.hex) {
      saveUpdatedHexValue({hex: nextProps.hex});
      this.setState({inputVal: nextProps.hex});
    } else if (hex != nextState.inputVal) {
      saveUpdatedHexValue({hex: nextState.inputVal});
    }
  }

  render() {
    const { onChange } = this.props;
    const { inputVal } = this.state;

    return (
      <section>
          <section style={{position: 'relative', height: '80px', margin: '4px 0'}}>
            <Saturation
              {...this.props}
              onChangeComplete={ (val) => onChange(val)}
              direction='horizontal'/>
          </section>
          <section style={{position: 'relative', height: '10px', margin: '4px 0'}}>
            <Hue
              {...this.props}
              onChangeComplete={ (val) => onChange(val) }
              direction='horizontal'/>
          </section>
          <input
            style={ inputStyle }
            autoFocus
            onClickCapture={ (e) => e.target.focus() }
            value={ inputVal }
            onChange={ (e) => this.setState({inputVal: e.target.value}) }/>
      </section>);
  }
}


ColorPicker.propTypes = {
    color: PropTypes.string.isRequired,
    saveUpdatedHexValue: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    hex: PropTypes.string,
    hsl: PropTypes.object,
    rgb: PropTypes.object
  };


const wrapped = CustomPicker(ColorPicker);

export { wrapped as ColorPicker };