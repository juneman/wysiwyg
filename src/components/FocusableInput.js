import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FocusableInput extends Component {
  constructor(props) {
    super(props);

    this.getWindow = this.getWindow.bind(this);
    this.focusInput = this.focusInput.bind(this);
  }

  focusInput() {
    const win = this.getWindow();
    if(win) {
      const input = win.document.getElementById('focusableInput');
      input.focus();
    }
  }

  getWindow() {
    if (this.container && this.container.ownerDocument) {
      return this.container.ownerDocument.defaultView;
    }
    return null;
  }

  render() {
    const { 
      handleChange, 
      inputStyles, 
      placeholder, 
      stateProperty,
      value
    } = this.props;

    return (
      <div
        onClick={this.focusInput}
        ref={container => (this.container = container)}>
        <input 
          id="focusableInput"
          style={inputStyles}
          onChange={(e) => handleChange(e.target.value, stateProperty)}
          value={value}
          placeholder={placeholder}
        />
      </div>
    );
  }
}

FocusableInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  inputStyles: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  stateProperty: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default FocusableInput;
