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
    const hrStyle = {
      width: '100%',
      height: 1,
      border: 0,
      position: 'relative',
      top: -20,
      left: 0,
      zIndex: 2,
      padding: 0,
      margin: 0,
      backgroundColor: '#7cf4b1',
      backgroundImage: 'linear-gradient(to right, #b8f9d5, #7cf4b1, #b8f9d5)'
    };

    return (
      <div className="add-row">
        <div style={{textAlign: 'center', zIndex: 10}} ref={(el) => this.wrapper = el}>
          <a
            href="#"
            id="addBtn"
            onClick={(e) => this.handleAddNew(e)}
            ref={(el) => this.addButton = el}
          ><AddButton shadow={true} /></a>
          <hr style={hrStyle} />
        </div>
      </div>
    );
  }

  handleAddNew(e) {
    e.preventDefault();
    this.props.onClick(this.state.addButtonPosition);
  }

  setBoundingBox() {
    if (this.addButton) {
      const addButtonPosition = convertBoundingBox(this.addButton.getBoundingClientRect());
      if (!addButtonPosition.equals(this.state.addButtonPosition)) {
        this.setState({addButtonPosition});
      }
    }
  }
}

AddButtonHorizRule.propTypes = {
  onClick: PropTypes.func.isRequired
};
