import React from 'react';
import PropTypes from 'prop-types';
import { CustomPicker } from 'react-color';
import { EditableInput } from 'react-color/lib/components/common';
import Saturation from './Saturation';
import Hue from './Hue';
import { inputStyle } from '../../helpers/styles/editor';

class ColorPicker extends React.Component {

  render() {
    const { onChange, hex, hsl } = this.props;

    return (
      <section>
          <section style={{position: 'relative', height: '80px', margin: '4px 0'}}>
            <Saturation
              {...this.props}
              onChange={ onChange }
              direction='horizontal'/>
          </section>
          <section style={{position: 'relative', height: '10px', margin: '4px 0'}}>
            <Hue
              hsl={ hsl }
              onChange={ onChange }
              direction='horizontal'/>
          </section>
          <EditableInput
            style={{ input: inputStyle }}
            value={ hex }
            onChange={ onChange }/>
      </section>);
  }
}


ColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  hex: PropTypes.string,
  hsl: PropTypes.object,
  rgb: PropTypes.object
};


const wrapped = CustomPicker(ColorPicker);

export { wrapped as ColorPicker };
