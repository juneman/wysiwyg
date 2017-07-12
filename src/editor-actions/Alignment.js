import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Menu from '../components/Menu';
import { convertBoundingBox } from '../helpers/domHelpers';
import { getButtonProps } from '../helpers/styles/editor';

import AlignLeft from '../icons/AlignLeft';
import AlignCenter from '../icons/AlignCenter';
import AlignRight from '../icons/AlignRight';

export default class Alignment extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      position: Map(),
      isMenuOpen: props.isActive || false
    };
  }

  componentDidMount() {
    this.setBoundingBox();
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.isActive !== this.props.isActive) {
      this.setState({
        isMenuOpen: nextProps.isActive
      });
    }
  }


  render() {
    const { position, isMenuOpen } = this.state;
    const { isActive, hasRoomToRenderBelow } = this.props;

    const buttonProps = getButtonProps(isActive);
    const secondaryButtonProps = getButtonProps(false);

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: position.left,
      width: 120,
      animationName: `editor-slide-${(isMenuOpen) ? 'in' : 'out'}-${(hasRoomToRenderBelow) ? 'bottom' : 'top'}`,
      animationTimingFunction: 'ease-out',
      animationDuration: '0.15s',
      animationIterationCount: 1,
      animationFillMode: 'both'
    };
    if (!hasRoomToRenderBelow) {
      dropdownStyles.bottom = dropdownStyles.top;
      delete dropdownStyles.top;
    }

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
        <div><AlignLeft onClick={() => this.handleAlignment(null, 'left')} text="Left" {...secondaryButtonProps} /></div>
        <div><AlignCenter onClick={() => this.handleAlignment(null, 'center')} text="Center" {...secondaryButtonProps} /></div>
        <div><AlignRight onClick={() => this.handleAlignment(null, 'right')} text="Right" {...secondaryButtonProps} /></div>
      </Menu>
    ) : null;

    return (
      <div ref={(el) => this.wrapper = el}>
        <AlignCenter onClick={() => this.toggleDropdown()} {...buttonProps} />
        { dropdownNodes }
      </div>
    );
  }

  toggleDropdown() {
    const { onToggleActive, isActive } = this.props;
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });

    if(isActive) {
      setTimeout(() => onToggleActive(!isActive), 200);
    } else {
      onToggleActive(!isActive);
    }
  }

  handleAlignment(e, type) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const { onChange, onToggleActive } = this.props;

    this.setState({
      isMenuOpen: false
    });

    setTimeout(() => onToggleActive(false), 200);
    onChange(type);
  }

  setBoundingBox() {
    if (!this.wrapper) {
      return;
    }
    const position = convertBoundingBox(this.wrapper.getBoundingClientRect());
    if (!position.equals(this.state.position)) {
      this.setState({position});
    }
  }

}

Alignment.propTypes = {
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  hasRoomToRenderBelow: PropTypes.bool
};
