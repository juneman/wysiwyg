import React from 'react';
import PropTypes from 'prop-types';

/**
 * A React component that gives a light wrapper
 * around toolbars and menus in a consistent format
 * @class
 */
export default class Menu extends React.Component {

  render() {
    const { style, className, children } = this.props;

    const menuStyles = Object.assign({}, {
      backgroundColor: 'white',
      borderRadius: 4,
      boxShadow: '0 0 10px rgba(0,0,0,0.33)',
      overflow: 'hidden'
    }, style);

    return (
      <div style={menuStyles} className={className}>
        { children }
      </div>
    );
  }

}

Menu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ]).isRequired,
  style: PropTypes.object,
  className: PropTypes.string
};
