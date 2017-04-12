import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Zone from './Zone';

export default class Row extends React.Component {

  render() {
    const { row, onToggleEditMode, isCanvasInEditMode } = this.props;

    const zoneNodes = row.get('zones').map((zone, i) => {
      return (
        <Zone
          key={zone.get('id')}
          zone={zone}
          columnIndex={i}
          onSave={(zone) => this.save(i, zone)}
          onRemove={() => this.remove()}
          onToggleEditMode={(isEnabled) => onToggleEditMode(isEnabled)}
          isCanvasInEditMode={isCanvasInEditMode}
        />
      );
    });

    const gridStyle = {
      gridTemplateColumns: `repeat(${zoneNodes.length}, 1fr)`
    };

    return (
      <div className="row" style={gridStyle}>
        {zoneNodes}
      </div>
    );
  }

  save(index, zone) {
    const { row, onSave } = this.props;
    const updatedZones = row.get('zones').set(index, zone);
    const zonesHtml = updatedZones.toJS().map(zone => zone.html).join('\n');
    const updatedRow = row
      .set('zones', updatedZones)
      .set('html', `<div class="row">${zonesHtml}</div>`);
    onSave(updatedRow);
  }

  remove() {
    this.props.onRemoveRow();
  }

}

Row.propTypes = {
  row: PropTypes.instanceOf(Map).isRequired,
  isCanvasInEditMode: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
  onToggleEditMode: PropTypes.func.isRequired
};
