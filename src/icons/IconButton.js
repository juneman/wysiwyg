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
  height: 42,
  width: 42,
  margin: '0 5px'
};

export default class IconButton extends React.Component {

  render() {
    const { iconId, color, text, shadow } = this.props;

    const iconWrapperStyle = Object.assign({}, {
      textAlign: 'center',
      backgroundColor: '#0bdc66',
      color: '#FFF',
      display: 'inline-block',
      borderRadius: '50%',
      height: 30,
      width: 30,
      padding: 5
    }, {
      boxShadow: (shadow) ? '2px 3px 3px rgba(0,0,0,0.3)' : null
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

    return (
      <span style={wrapperStyle}>
        <span style={iconWrapperStyle}><svg style={iconStyle} className={iconId}><use xlinkHref={`#${iconId}`}></use></svg></span>
        { (text) ? (<span style={textStyle}>{text}</span>) : null }
      </span>
    );
  }
}

IconButton.propTypes = {
  iconId: React.PropTypes.string.isRequired,
  text: React.PropTypes.string,
  color: React.PropTypes.string,
  shadow: React.PropTypes.bool
};