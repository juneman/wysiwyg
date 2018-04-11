import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FocusableInput extends Component {
  constructor(props) {
    super(props);

    this.focusInput = this.focusInput.bind(this);
  }

  focusInput() {
    this.input.focus();
  }

  render() {
    const { 
      handleChange, 
      inputStyles, 
      placeholder, 
      value
    } = this.props;

    return (
        <input 
          ref={input => (this.input = input)}
          style={inputStyles}
          onChange={(e) => handleChange(e.target.value)}
          value={value}
          placeholder={placeholder}
          onClick={() => {this.focusInput()}}
        />
    );
  }
}

FocusableInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  inputStyles: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default FocusableInput;
