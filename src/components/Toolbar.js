import React from 'react';
import PropTypes from 'prop-types';

export default class Toolbar extends React.Component {

  render() {
    const { style, children } = this.props;

    const toolbarStyles = Object.assign({}, {
      backgroundColor: '#F6F6F6',
      borderRadius: 5,
      border: '1px solid #D0D0D0',
      boxShadow: '1px 1px 3px rgba(0,0,0,0.2)'
    }, style);

    return (
      <div style={toolbarStyles}>
        { children }
      </div>
    );
  }

}

Toolbar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ]).isRequired,
  style: PropTypes.object
};
