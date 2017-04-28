import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { convertBoundingBox } from '../helpers/domHelpers';
import AddButton from '../icons/AddButton';

/**
 * A React component renders an Add button to
 * add a new row to the Canvas
 * @class
 */
export default class AddButtonHorizRule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addButtonPosition: Map(),
      wrapper: Map()
    };
  }

  componentDidMount() {
    this.setBoundingBox();
  }

  componentDidUpdate() {
    this.setBoundingBox();
  }

  render() {
    const { wrapper } = this.state;

    const hrStyle = {
      width: (wrapper.get('width')) ? wrapper.get('width') : 100,
      height: 1,
      position: 'absolute',
      top: (wrapper.get('top')) ? wrapper.get('top') + 16 : null,
      left: (wrapper.get('left')) ? wrapper.get('left') : null,
      zIndex: 2,
      backgroundColor: '#7cf4b1',
      backgroundImage: 'linear-gradient(to right, #b8f9d5, #7cf4b1, #b8f9d5)'
    };

    return (
      <div>
        <div style={{textAlign: 'center', zIndex: 10}} ref={(el) => this.wrapper = el}>
          <a
            href="#"
            id="addBtn"
            onClick={(e) => this.handleAddNew(e)}
            ref={(el) => this.addButton = el}
          ><AddButton shadow={true} /></a>
        </div>
        <hr style={hrStyle} />
      </div>
    );
  }

  handleAddNew(e) {
    e.preventDefault();
    this.props.onClick(this.state.addButtonPosition);
  }

  setBoundingBox() {
    const update = {};
    if (this.addButton) {
      const addButtonPosition = convertBoundingBox(this.addButton.getBoundingClientRect());
      if (!addButtonPosition.equals(this.state.addButtonPosition)) {
        update.addButtonPosition = addButtonPosition;
      }
    }
    if (this.wrapper) {
      const wrapper = convertBoundingBox(this.wrapper.getBoundingClientRect());
      if (!wrapper.equals(this.state.wrapper)) {
        update.wrapper = wrapper;
      }
    }
    if (Object.keys(update).length) {
      this.setState(update);
    }
  }
}

AddButtonHorizRule.propTypes = {
  onClick: PropTypes.func.isRequired
};
