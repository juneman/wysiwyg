import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { convertBoundingBox } from '../helpers/domHelpers';
import Zone from './Zone';

/**
 * A React component for each row of the editor
 * @class
 */
export default class Row extends React.Component {
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
    const { row, isOver, numPages, moveZone } = this.props;
    const { position } = this.state;

    const zoneNodes = row.get('zones').map((zone, i) => {
      return (
        <Zone
          numPages={numPages}
          key={zone.get('id')}
          zone={zone}
          moveZone={ moveZone }
          row={row}
          isOver={isOver}
          rowPosition={position}
          columnIndex={i}
        />
      );
    });

    const gridStyle = {
      display: 'flex',
      flexGrow: 1
    };

    return (
      <div
        className="row"
        style={gridStyle}
        ref={(el) => this.wrapper = el}
      >
        {zoneNodes}
      </div>
    );
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

Row.propTypes = {
  row: PropTypes.instanceOf(Map).isRequired,
  isDragging: PropTypes.bool,
  isOver: PropTypes.bool.isRequired,
  moveZone: PropTypes.func.isRequired,
  numPages: PropTypes.number
};