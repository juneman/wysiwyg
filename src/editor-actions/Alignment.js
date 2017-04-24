import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Toolbar from '../components/Toolbar';
import { convertBoundingBox } from '../helpers/domHelpers';

import AlignLeft from '../icons/AlignLeft';
import AlignCenter from '../icons/AlignCenter';
import AlignRight from '../icons/AlignRight';

export default class Alignment extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
      position: Map()
    };
  }

  componentDidMount() {
    this.setBoundingBox();
  }

  componentDidUpdate() {
    this.setBoundingBox();
  }

  render() {
    const { showDropdown, position } = this.state;

    const buttonProps = {
      hideBackground: true,
      color: '#303030',
      clickColor: '#333',
      activeColor: '#C0C0C0'
    };

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: position.left
    };

    const dropdownNodes = showDropdown ? (
      <Toolbar style={dropdownStyles}>
        <div style={{display: 'grid'}}>
          <div style={{gridRow: 1, gridColumn: 1}}><AlignLeft onClick={() => this.handleAlignment(null, 'left')} {...buttonProps} /></div>
          <div style={{gridRow: 1, gridColumn: 2}}><a href="#" onClick={(e) => this.handleAlignment(e, 'left')}>Left</a></div>
          <div style={{gridRow: 2, gridColumn: 1}}><AlignCenter onClick={() => this.handleAlignment(null, 'center')} {...buttonProps} /></div>
          <div style={{gridRow: 2, gridColumn: 2}}><a href="#" onClick={(e) => this.handleAlignment(e, 'center')}>Center</a></div>
          <div style={{gridRow: 3, gridColumn: 1}}><AlignRight onClick={() => this.handleAlignment(null, 'right')} {...buttonProps} /></div>
          <div style={{gridRow: 3, gridColumn: 2}}><a href="#" onClick={(e) => this.handleAlignment(e, 'right')}>Right</a></div>
        </div>
      </Toolbar>
    ) : null;

    return (
      <div ref={(el) => this.wrapper = el}>
        <AlignLeft onClick={() => this.toggleDropdown()} {...buttonProps} />
        { dropdownNodes }
      </div>
    );
  }

  toggleDropdown() {
    const { showDropdown } = this.state;
    this.setState({
      showDropdown: !showDropdown
    });
  }

  handleAlignment(e, type) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const { onChange } = this.props;
    
    this.setState({
      showDropdown: false
    });

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
  onChange: PropTypes.func.isRequired
};
