import React from 'react';
import PropTypes from 'prop-types';

const iconStyle = {
  display: 'inline-block',
  width: '1em',
  height: '1em',
  strokeWidth: 0,
  stroke: 'currentColor',
  fill: 'currentColor'
};

const wrapperStyle = {
  fontSize: '20pt',
  height: 35,
  width: 35,
  margin: '0 5px'
};

export default class IconButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      colorOverride: null
    };
  }

  render() {
    const {
      title,
      pathNode,
      color,
      text,
      shadow,
      hideBackground,
      onClick,
      onMouseDown,
      onMouseUp,
      isActive,
      activeColor,
      cursor
    } = this.props;

    const { colorOverride } = this.state;

    let finalColor = color;
    if (isActive && activeColor) {
      finalColor = activeColor;
    } else if (colorOverride) {
      finalColor = colorOverride;
    }

    const iconWrapperStyle = Object.assign({}, {
      textAlign: 'center',
      backgroundColor: '#0bdc66',
      color: '#FFF',
      display: 'inline-block',
      borderRadius: '50%',
      height: 25,
      width: 26,
      padding: 5
    }, {
      boxShadow: (shadow) ? '1px 1px 4px rgba(0,0,0,0.4)' : null
    });

    const textStyle = {
      fontSize: '14pt',
      position: 'relative',
      color: '#0bdc66',
      top: -3,
      left: 10
    };

    if (finalColor) {
      iconWrapperStyle.backgroundColor = finalColor;
      textStyle.color = finalColor;
    }
    if (hideBackground) {
      delete iconWrapperStyle.backgroundColor;
      delete iconWrapperStyle.boxShadow;
      if (finalColor) {
        iconWrapperStyle.color = finalColor;
      }
    }

    const iconNodes = (
      <span style={wrapperStyle}>
        <span style={iconWrapperStyle}>
          <svg style={iconStyle} viewBox="0 0 26 28">
            <title>{title}</title>
            {pathNode}
          </svg>
        </span>
        { (text) ? (<span style={textStyle}>{text}</span>) : null }
      </span>
    );

    const linkStyle = {};
    if (cursor) linkStyle.cursor = cursor;

    return (onClick || onMouseDown || onMouseUp) ? (
      <a href="#"
        style={linkStyle}
        onClick={(e) => this.handleClick(e)}
        onMouseDown={() => this.handleMouseDown()}
        onMouseUp={() => this.handleMouseUp()}
      >
        {iconNodes}
      </a>
    ) : iconNodes ;
  }

  handleClick(e) {
    e.preventDefault();
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
  }

  handleMouseDown() {
    const { clickColor, onMouseDown } = this.props;

    if (clickColor) {
      this.setState({
        colorOverride: clickColor
      });
    }
    if (onMouseDown) {
      onMouseDown();
    }
  }

  handleMouseUp() {
    const { clickColor, onMouseUp } = this.props;
    if (clickColor) {
      this.setState({
        colorOverride: null
      });
    }
    if (onMouseUp) {
      onMouseUp();
    }
  }

}

IconButton.propTypes = {
  title: PropTypes.string.isRequired,
  pathNode: PropTypes.node.isRequired,
  text: PropTypes.string,
  color: PropTypes.string,
  cursor: PropTypes.string,
  clickColor: PropTypes.string,
  activeColor: PropTypes.string,
  shadow: PropTypes.bool,
  hideBackground: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  isActive: PropTypes.bool
};