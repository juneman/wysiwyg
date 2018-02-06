import React from 'react';
import PropTypes from 'prop-types';
import { CustomPicker } from 'react-color';
import EditableInput from './EditableInput';
import Saturation from './Saturation';
import Hue from './Hue';
import { inputStyle } from '../../helpers/styles/editor';

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hsl: this.props.hsl,
      hex: this.props.hex
    };
  }

  render() {
    const { hsl } = this.props;
    const { hex } = this.state;

    return (
      <section>
          <section style={{position: 'relative', height: '80px', margin: '4px 0'}}>
            <Saturation
              {...this.props}
              onChange={ this.onChangeSaturationOrHue }
              direction='horizontal'/>
          </section>
          <section style={{position: 'relative', height: '10px', margin: '4px 0'}}>
            <Hue
              hsl={ hsl }
              onChange={ this.onChangeSaturationOrHue }
              direction='horizontal'/>
          </section>
          <EditableInput
              style={{ input: inputStyle }}
              value={ hex || this.props.hex }
              onChange={ this.onChangeInput }/>

      </section>);
  }

  onChangeInput = (input, event) => {
    const { onChange } = this.props;

    this.setState({ hex: input });
    onChange(input, event);
  }

  onChangeSaturationOrHue = (change, event) => {
    const { onChange } = this.props;
    // for hue and saturation, set hex to null and let it grab new value from props
    this.setState({ hex: null });
    onChange(change, event);
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
