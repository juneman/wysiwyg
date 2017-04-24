import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Toolbar from '../components/Toolbar';
import { convertBoundingBox } from '../helpers/domHelpers';

import ListBullet from '../icons/ListBullet';
import ListNumbered from '../icons/ListNumbered';

export default class List extends React.Component {

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
          <div style={{gridRow: 1, gridColumn: 1}}><ListBullet onClick={() => this.handleList('ul')} {...buttonProps} /></div>
          <div style={{gridRow: 2, gridColumn: 1}}><ListNumbered onClick={() => this.handleList('ol')} {...buttonProps} /></div>
        </div>
      </Toolbar>
    ) : null;

    return (
      <div ref={(el) => this.wrapper = el}>
        <ListBullet onClick={() => this.toggleDropdown()} {...buttonProps} />
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

  handleList(type) {
    const { localState, persistedState, onChange } = this.props;
    
    // TODO: use editorState to modify based on the alignment selected
    const newPersistedState = persistedState.set('textAlign', type);

    this.setState({
      showDropdown: false
    });

    onChange({
      localState,
      persistedState: newPersistedState
    });
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

List.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};