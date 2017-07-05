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
      position: Map()
    };
  }

  componentDidMount() {
    this.setBoundingBox();
  }

  render() {
    const { position } = this.state;
    const { isActive, hasRoomToRenderBelow } = this.props;

    const primaryButtonProps = getButtonProps(isActive);
    const secondaryButtonProps = getButtonProps(false);

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: position.left
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
    onToggleActive(!isActive);
  }

  handleList(listType) {
    const { localState, persistedState, onChange, onToggleActive } = this.props;
    
    const newLocalState = localState.set('editorState', RichUtils.toggleBlockType(localState.get('editorState'), listType));

    onToggleActive(false);

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
