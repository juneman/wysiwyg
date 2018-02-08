// This component was mostly scooped from the react-color library with the added
// getWindow function to be compatible with iframes
import React, { Component, PureComponent } from 'react';
import reactCSS from 'reactcss';

export class EditableInput extends (PureComponent || Component) {
  constructor(props) {
    super(props);

    this.state = {
      value: String(props.value).toUpperCase(),
      blurValue: String(props.value).toUpperCase()
    };
  }

  componentDidMount() {
    const win = this.getWindow();
    if(win) {
      win.document.getElementById('hexInput').focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    const input = this.input;
    if (nextProps.value !== this.state.value) {
      if (input === document.activeElement) {
        this.setState({ blurValue: String(nextProps.value).toUpperCase() });
      } else {
        this.setState({ value: String(nextProps.value).toUpperCase(), blurValue: !this.state.blurValue && String(nextProps.value).toUpperCase() });
      }
    }
  }

  componentWillUnmount() {
    this.unbindEventListeners();
  }

  getWindow() {
    if (this.container && this.container.ownerDocument) {
      return this.container.ownerDocument.defaultView;
    }
    return null;
  }

  handleBlur = () => {
    if (this.state.blurValue) {
      this.setState({ value: this.state.blurValue, blurValue: null });
    }
  }

  handleChange = (e) => {
    if (this.props.label) {
      this.props.onChange && this.props.onChange({ [this.props.label]: e.target.value }, e);
    } else {
      this.props.onChange && this.props.onChange(e.target.value, e);
    }
    this.setState({ value: e.target.value });
  }

  handleKeyDown = (e) => {
    // In case `e.target.value` is a percentage remove the `%` character
    // and update accordingly with a percentage
    // https://github.com/casesandberg/react-color/issues/383
    const stringValue = String(e.target.value);
    const isPercentage = stringValue.indexOf('%') > -1;
    const number = Number(stringValue.replace(/%/g, ''));
    if (!isNaN(number)) {
      const amount = this.props.arrowOffset || 1;

      // Up
      if (e.keyCode === 38) {
        if (this.props.label !== null) {
          this.props.onChange && this.props.onChange({ [this.props.label]: number + amount }, e);
        } else {
          this.props.onChange && this.props.onChange(number + amount, e);
        }

        if (isPercentage) {
          this.setState({ value: `${ number + amount }%` });
        } else {
          this.setState({ value: number + amount });
        }
      }

      // Down
      if (e.keyCode === 40) {
        if (this.props.label !== null) {
          this.props.onChange && this.props.onChange({ [this.props.label]: number - amount }, e);
        } else {
          this.props.onChange && this.props.onChange(number - amount, e);
        }

        if (isPercentage) {
          this.setState({ value: `${ number - amount }%` });
        } else {
          this.setState({ value: number - amount });
        }
      }
    }
  }

  handleDrag = (e) => {
    if (this.props.dragLabel) {
      const newValue = Math.round(this.props.value + e.movementX);
      if (newValue >= 0 && newValue <= this.props.dragMax) {
        this.props.onChange && this.props.onChange({ [this.props.label]: newValue }, e);
      }
    }
  }

  handleMouseDown = (e) => {
    const { onChange } = this.props;
    const { value } = this.state;

    onChange && onChange(value, e);
    if (this.props.dragLabel) {
      e.preventDefault();
      this.handleDrag(e);
    }
    const win = this.getWindow();
    if (win) {
        win.addEventListener('mousemove', this.handleDrag);
        win.addEventListener('mouseup', this.handleMouseUp);
        win.document.getElementById('hexInput').focus();
    }

  }

  handleMouseUp = () => {
    this.unbindEventListeners();
  }

  unbindEventListeners = () => {
    const win = this.getWindow();
    if (win) {
      win.removeEventListener('mousemove', this.handleDrag);
      win.removeEventListener('mouseup', this.handleMouseUp);
    }
  }

  render() {
    const styles = reactCSS({
      'default': {
        wrap: {
          position: 'relative',
        },
      },
      'user-override': {
        wrap: this.props.style && this.props.style.wrap ? this.props.style.wrap : {},
        input: this.props.style && this.props.style.input ? this.props.style.input : {},
        label: this.props.style && this.props.style.label ? this.props.style.label : {},
      },
      'dragLabel-true': {
        label: {
          cursor: 'ew-resize',
        },
      },
    }, {
      'user-override': true,
    }, this.props);

    return (
      <div
        style={ styles.wrap }
        ref={container => (this.container = container)}>
        <input
          id="hexInput"
          style={ styles.input }
          ref={ input => this.input = input }
          value={ this.state.value }
          onKeyDown={ this.handleKeyDown }
          onChange={ this.handleChange }
          onBlur={ this.handleBlur }
          placeholder={ this.props.placeholder }
          spellCheck="false"
          onMouseDown={ this.handleMouseDown }
        />
        { this.props.label ? (
          <span style={ styles.label } onMouseDown={ this.handleMouseDown }>
            { this.props.label }
          </span>
        ) : null }
      </div>
    );
  }
}

export default EditableInput;
