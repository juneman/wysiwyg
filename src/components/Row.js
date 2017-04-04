import React from 'react';

import Zone from './Zone';

export default class Row extends React.Component {

  render() {
    const { zones } = this.props;

    const zoneNodes = zones.map((zone, i) => {
      return (
        <Zone key={zone.id} column={i} onSave={(zone) => this.save(i, zone)} {...zone} />
      );
    });

    return (
      <div className="row">
        {zoneNodes}
      </div>
    );
  }

  save(index, zone) {
    const { zones, onSave, id } = this.props;
    zones[index] = Object.assign({}, zone);
    const zonesHtml = zones.map(zone => zone.html).join('\n');
    onSave({
      id,
      zones: zones,
      html: `<div class="row">${zonesHtml}</div>`
    });
  }

}

Row.propTypes = {
  id: React.PropTypes.string.isRequired,
  onSave: React.PropTypes.func.isRequired,
  zones: React.PropTypes.array
};
