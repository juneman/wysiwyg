import React from 'react';
import PropTypes from 'prop-types';
import tinyColor from 'tinycolor2';

export default class IconButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      colorOverride: null,
      shadowOverride: null,
      hoverColor: props.color ? tinyColor(props.color).lighten(5).toHexString() : null
    };
  }

  render() {
    const {
      title,
      pathNode,
      iconStyle,
      viewBox,
      color,
      textColor,
      text,
      shadow,
      hideBackground,
      onClick,
      onMouseDown,
      onMouseUp,
      isActive,
      activeColor,
      cursor,
      svg,
      style,
      secondary,
      textStyle,
      smallButton
    } = this.props;

    const { colorOverride, shadowOverride } = this.state;

    let finalColor = color;
    if (isActive && activeColor) {
      finalColor = activeColor;
    } else if (colorOverride) {
      finalColor = colorOverride;
    }

    const baseIconStyle = {
      display: 'inline-block',
      width: 16,
      height: 16,
      strokeWidth: 0,
      stroke: 'currentColor',
      fill: 'currentColor',
      transition: 'background-color 0.15s ease-in'
    };

    const wrapperStyle = {
      zIndex: 10,
      display: 'flex',
      alignItems: 'center'
    };

    const iconWrapperStyle = Object.assign({}, {
      position: 'relative',
      textAlign: 'center',
      backgroundColor: 'transparent',
      color: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '50%',
      height: 36,
      width: 36,
      padding: 5,
      lineHeight: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: '0',
      transition: 'all 0.15s ease-out'
    }, {
      boxShadow: (shadow || shadowOverride) ? 'rgba(0, 0, 0, 0.3) 0 0 10px' : null
    });

    const combinedTextStyle = {
      fontSize: 16,
      color: '#0bdc66',
      ...textStyle
    };

    if (finalColor) {
      iconWrapperStyle.backgroundColor = finalColor;
      combinedTextStyle.color = finalColor;
    }
    if (textColor && !colorOverride) {
      combinedTextStyle.color = textColor;
    } else if (textColor && colorOverride) {
      combinedTextStyle.color = colorOverride;
    }

    if (secondary) {
      iconWrapperStyle.border = `2px solid ${ finalColor }`;
      iconWrapperStyle.color = finalColor;
      delete iconWrapperStyle.backgroundColor;
    }

    if (hideBackground) {
      delete iconWrapperStyle.backgroundColor;
      delete iconWrapperStyle.boxShadow;
      if (finalColor) {
        iconWrapperStyle.color = finalColor;
      }
    }

    if (smallButton) {
      iconWrapperStyle.height = 24;
      iconWrapperStyle.width = 24;
      baseIconStyle.height = 12;
      baseIconStyle.width = 12;
    }

    const finalIconStyle = Object.assign({}, baseIconStyle, iconStyle);

    const iconNodes = (
      <span style={wrapperStyle}>
        <span style={iconWrapperStyle}>
          <svg className="wysiwyg--icon" style={finalIconStyle} viewBox={viewBox}>
            <title>{title}</title>
            {pathNode}
          </svg>
        </span>
        { (text) ? (<span style={combinedTextStyle}>{text}</span>) : null }
      </span>
    );

    const linkStyle = {
      textDecoration: 'none',
      ...style
    };
    if (cursor) linkStyle.cursor = cursor;

    return (onClick || onMouseDown || onMouseUp) ? (
      <a href="#"
        style={linkStyle}
        onClick={(e) => this.handleClick(e)}
        onMouseDown={(e) => this.handleMouseDown(e)}
        onMouseUp={() => this.handleMouseUp()}
        onMouseOver={() => this.handleMouseOver()}
        onMouseOut={() => this.handleMouseOut()}
      >
        {iconNodes}
      </a>
    ) : iconNodes ;
  }

  handleClick(e) {
    e.preventDefault();
    const { onClick } = this.props;
    if (onClick) {
      onClick(e);
    }
  }

  handleMouseOver() {
    const { onMouseOver } = this.props;
    const { hoverColor } = this.state;

    this.setState({ shadowOverride: true });

    if (hoverColor) {
      this.setState({
        colorOverride: hoverColor
      });
    }
    if (onMouseOver) {
      onMouseOver();
    }
  }

  handleMouseOut() {
    const { onMouseOut } = this.props;
    const { hoverColor } = this.state;

    this.setState({ shadowOverride: false });

    if (hoverColor) {
      this.setState({
        colorOverride: null
      });
    }
    if (onMouseOut) {
      onMouseOut();
    }

    /*
    This was necessary at one point.
    Leaving it commented as a reminder
    if (onMouseUp) {
      onMouseUp();
    }
    */
  }

  handleMouseDown(e) {
    e.preventDefault();
    const { clickColor, onMouseDown } = this.props;

    if (clickColor) {
      this.setState({
        colorOverride: clickColor
      });
    }
    if (onMouseDown) {
      onMouseDown(e);
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

IconButton.defaultProps = {
  style: {},
  textStyle: {},
  secondary: false
};

IconButton.propTypes = {
  title: PropTypes.string.isRequired,
  pathNode: PropTypes.node.isRequired,
  viewBox: PropTypes.string.isRequired,
  iconStyle: PropTypes.object,
  text: PropTypes.string,
  color: PropTypes.string,
  textColor: PropTypes.string,
  cursor: PropTypes.string,
  clickColor: PropTypes.string,
  activeColor: PropTypes.string,
  shadow: PropTypes.bool,
  hideBackground: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  isActive: PropTypes.bool,
  svg: PropTypes.element,
  style: PropTypes.object,
  textStyle: PropTypes.object,
  secondary: PropTypes.bool,
  smallButton: PropTypes.bool
};
