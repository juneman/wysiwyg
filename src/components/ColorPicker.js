import React from 'react';
import PropTypes from 'prop-types';
import { CustomPicker } from 'react-color';
import { Hue, Saturation } from 'react-color/lib/components/common';
import {  inputStyle } from '../helpers/styles/editor';
import { debounce } from '../helpers/utils';


class ColorPicker extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      inputVal: props.hex
    };

    this.debounce = debounce((fn, data, immediate=true) => {
      fn(data, immediate);
    }, 150);
  }

  componentWillUpdate(nextProps, nextState) {
    const { hex, saveUpdatedHexValue } = this.props;


    if (hex != nextProps.hex) {
      saveUpdatedHexValue({hex: nextProps.hex});
      this.setState({inputVal: nextProps.color});
    } else if (hex != nextState.inputVal) {
      saveUpdatedHexValue({hex: nextState.inputVal});
    }
  }

  render() {

    const { inputVal } = this.state;
    const { onChange } = this.props;

    return (
      <section>
          <section style={{position: 'relative', height: '80px', margin: '4px 0'}}>
            <Saturation
              {...this.props}
              onChange={ (val) => this.debounce(onChange, val) }
              direction='horizontal'/>
          </section>
          <section style={{position: 'relative', height: '10px', margin: '4px 0'}}>
            <Hue
              {...this.props}
              onChange={ (val) => this.debounce(onChange, val) }
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