import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

export default class MultiselectOptionsToolbar extends React.Component {
  constructor(props) {
    super(props);

    const { persistedState } = props;

    this.state = {
      isRequired: persistedState.get('isRequired') || false,
      isMultiselect: persistedState.get('isMultiselect') || false
    };
  }

  render() {
    const { isRequired, isMultiselect } = this.state;

    const formStyles = {
      width: 500,
      margin: 20
    };
    const titleStyles = {
      textTransform: 'uppercase',
      fontSize: 'smaller',
      color: '#808080'
    };

    return (
      <div style={formStyles}>
        <div style={titleStyles}>Settings</div>
        <div style={{marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: 20}}>
          <div style={{gridColumn: 1, gridRow: 1}}>
            <input type="checkbox" checked={isRequired} onChange={(e) => this.handleIsRequired(e)} />
            <label>Required Field</label>
          </div>
          <div style={{gridColumn: 2, gridRow: 1}}>
            <input type="checkbox" checked={isMultiselect} onChange={(e) => this.handleIsMultiselect(e)} />
            <label>Allow Multiple Selections</label>
          </div>
          <div style={{gridColumn: 2, gridRow: 2, textAlign: 'right'}}>
            <button className="btn" onClick={(e) => this.handleSave(e)}>Save</button>
          </div>
        </div>
      </div>
    );
  }

  handleIsRequired(e) {
    const isRequired = e.target.checked;
    this.setState({
      isRequired
    });
  }

  handleIsMultiselect(e) {
    const isMultiselect = e.target.checked;
    this.setState({
      isMultiselect
    });
  }

  handleSave(e) {
    e.preventDefault();
    const { localState, persistedState, onSave } = this.props;
    const { isRequired, isMultiselect } = this.state;

    const newPersistedState = persistedState
      .set('isMultiselect', isMultiselect)
      .set('isRequired', isRequired);

    const newLocalState = localState.delete('selectedToolbar');
      
    onSave({
      localState: newLocalState,
      persistedState: newPersistedState
    });
  }

}

MultiselectOptionsToolbar.propTypes = {
  onSave: PropTypes.func,
  localState: PropTypes.instanceOf(Map),
  persistedState: PropTypes.instanceOf(Map),
  zonePosition: PropTypes.instanceOf(Map)
};