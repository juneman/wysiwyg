import React from 'react';
import PropTypes from 'prop-types';

export default class DropDownButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovering: false
        };
    }

    render() {
        const { isHovering } = this.state;
        const { className, title, label, onClick, draggable, style, create, dark, danger, success, secondary, disabled, block, icon, toggle, external, forceHover, trash, children } = this.props;

        const dropDownButtonStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            flexShrink: 0,
            padding: '9px 12px 8px',
            textAlign: 'center',
            cursor: 'pointer',
            borderRadius: 4,
            color: '#999',
            border: '1px solid #CCC',
            fontSize: '15px',
            fontWeight: '500',
            boxSizing: 'border-box'
        };

        if (isHovering) {
            dropDownButtonStyle.borderColor = '#999';
        }

        return (
            <btn
                title={ title }
                style={ dropDownButtonStyle }
                onMouseOver={ () => this.setState({ isHovering: true }) }
                onMouseOut={ () => this.setState({ isHovering: false }) }
                onMouseUp={ (e) => this.onMouseUp(e) }
                onClick={ (e) => this.onClick(e) }
                onMouseDown={ (e) => this.onMouseDown(e) }>
                { label &&
                    <div className={ styles.label }>
                        { label }
                    </div>
                }
                { children }
            </btn>
        );
    }

    blockEvent(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    onClick(e) {
        const { draggable } = this.props;

        if (!draggable) {
            this.blockEvent(e);
        }
    }

    onMouseDown(e) {
        const { draggable } = this.props;

        if (!draggable) {
            this.blockEvent(e);
        }
    }

    onMouseUp(e) {
        const { onClick, draggable } = this.props;

        if (!draggable) {
            this.blockEvent(e);
        }

        onClick();
    }
}

DropDownButton.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    style: PropTypes.object,
    children: PropTypes.node,
    forceHover: PropTypes.bool,
};
