import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
  render() {
    const { label, onClick, children } = this.props;

    const buttonStyle = {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '9px 12px 8px',
      textAlign: 'center',
      cursor: 'pointer',
      borderRadius: '4px',
      fontSize: '15px',
      fontWeight: 500,
      backgroundColor: '#00b850',
      color: 'rgba(255, 255, 255, 0.9)'
    };

    return (
      <btn
        style={ buttonStyle }
        onClick={ onClick }>
          { label &&
            <div>
            { label }
            </div>
          }
          { children }
      </btn>
    );
  }

}

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node
};

