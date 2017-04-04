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
  color: '#008800',
  fontSize: '30pt',
  textAlign: 'center'
}

export default class AddButton extends React.Component {
  render() {
    return (
      <div style={wrapperStyle}>
        <svg style={iconStyle} className="icon-add_circle"><use xlinkHref="#icon-add_circle"></use></svg>
      </div>
    );
  }
}
