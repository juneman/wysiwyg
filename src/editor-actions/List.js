import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { RichUtils } from 'draft-js';

import Menu from '../components/Menu';
import { convertBoundingBox } from '../helpers/domHelpers';
import { getButtonProps } from '../helpers/styles/editor';

import ListBullet from '../icons/ListBullet';
import ListNumbered from '../icons/ListNumbered';

export default class List extends React.Component {

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

    const primaryButtonProps = getButtonProps(isActive);
    const secondaryButtonProps = getButtonProps(false);

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: position.left,
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
        <div><ListBullet onClick={() => this.handleList('unordered-list-item')} {...secondaryButtonProps} /></div>
        <div><ListNumbered onClick={() => this.handleList('ordered-list-item')} {...secondaryButtonProps} /></div>
      </Menu>
    ) : null;

    return (
      <div ref={(el) => this.wrapper = el}>
        <ListBullet onClick={() => this.toggleDropdown()} {...primaryButtonProps} />
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

  handleList(listType) {
    const { localState, persistedState, onChange, onToggleActive } = this.props;

    const newLocalState = localState.set('editorState', RichUtils.toggleBlockType(localState.get('editorState'), listType));

    this.setState({
      isMenuOpen: false
    });

    setTimeout(() => onToggleActive(false), 200);

    onChange({
      localState: newLocalState,
      persistedState
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
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  hasRoomToRenderBelow: PropTypes.bool
};
