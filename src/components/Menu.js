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

    let menuStyles = {
      backgroundColor: 'white',
      borderRadius: 4,
      boxShadow: 'rgba(0, 0, 0, 0.3) 0 0 10px',
      color: 'rgb(128, 128, 128)',
      ...style
    };

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
