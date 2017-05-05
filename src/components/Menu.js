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
      backgroundColor: '#F6F6F6',
      borderRadius: 5,
      border: '1px solid #D0D0D0',
      boxShadow: '1px 1px 3px rgba(0,0,0,0.2)'
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
