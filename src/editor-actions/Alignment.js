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
      position: Map()
    };
  }

  componentDidMount() {
    this.setBoundingBox();
  }


  render() {
    const { position } = this.state;
    const { isActive } = this.props;

    const buttonProps = getButtonProps(isActive);
    const secondaryButtonProps = getButtonProps(false);

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: position.left,
      width: 120
    };

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
    onToggleActive(!isActive);
  }

  handleAlignment(e, type) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const { onChange, onToggleActive } = this.props;

    onToggleActive(false);
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
  isActive: PropTypes.bool.isRequired
};
