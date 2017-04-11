import React from 'react';

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

  render() {
    const { title, pathNode, color, text, shadow, hideBackground } = this.props;

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

    if (color) {
      iconWrapperStyle.backgroundColor = color;
      textStyle.color = color;
    }
    if (hideBackground) {
      delete iconWrapperStyle.backgroundColor;
      delete iconWrapperStyle.boxShadow;
      if (color) {
        iconWrapperStyle.color = color;
      }
    }

    return (
      <span style={wrapperStyle}>
        <span style={iconWrapperStyle}>
          <svg style={iconStyle}>
            <title>{title}</title>
            {pathNode}
          </svg>
        </span>
        { (text) ? (<span style={textStyle}>{text}</span>) : null }
      </span>
    );
  }
}

IconButton.propTypes = {
  title: React.PropTypes.string.isRequired,
  pathNode: React.PropTypes.node.isRequired,
  text: React.PropTypes.string,
  color: React.PropTypes.string,
  shadow: React.PropTypes.bool,
  hideBackground: React.PropTypes.bool
};