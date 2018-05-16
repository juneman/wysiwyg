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
        const { title, label, style, children } = this.props;

        const dropDownButtonStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            flexShrink: 0,
            flexGrow: 1,
            padding: '9px 12px 8px',
            textAlign: 'center',
            cursor: 'pointer',
            borderRadius: 4,
            color: '#999',
            border: '1px solid #CCC',
            fontSize: '15px',
            fontWeight: '500',
            boxSizing: 'border-box',
            ...style
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
                    <div>
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

DropDownButton.defaultProps = {
    style: {}
};

DropDownButton.propTypes = {
    title: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    style: PropTypes.object,
    children: PropTypes.node,
};
