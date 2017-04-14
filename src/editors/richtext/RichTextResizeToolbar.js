import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

export default class RichTextResizeToolbar extends React.Component {
  constructor(props) {
    super(props);

    const { persistedState } = props;

    this.state = {
      height: persistedState.get('height') || '',
      width: persistedState.get('width') || ''
    };
  }

  render() {
    const { height, width } = this.state;

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
        <div style={titleStyles}>Set Width and Height</div>
        <div style={{marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: 20}}>
          <div style={{gridColumn: 1, gridRow: 1}}>
            <label>Width:</label><br/>
            <input className="form-control" type="number" step="1" min="10" max="1000" value={width} onChange={(e) => this.handleInputChange(e, 'width')} />
          </div>
          <div style={{gridColumn: 2, gridRow: 1}}>
            <label>Height:</label><br/>
            <input className="form-control" type="number" step="1" min="10" max="1000" value={height} onChange={(e) => this.handleInputChange(e, 'height')} />
          </div>
          <div style={{gridColumn: 2, gridRow: 2, textAlign: 'right'}}>
            <button className="btn" onClick={(e) => this.handleSave(e)}>Save</button>
          </div>
        </div>
      </div>
    );
  }

  handleInputChange(e, name) {
    const val = e.currentTarget.value;
    const update = {};
    if (val && val.length) {
      update[name] = parseInt(val);
      this.setState(update);
    }
  }

  handleSave(e) {
    e.preventDefault();
    const { localState, persistedState, onSave } = this.props;
    const { height, width } = this.state;
    
    const newPersistedState = persistedState
      .set('height', height)
      .set('width', width);

    const newLocalState = localState.delete('selectedToolbar');
      
    onSave({
      localState: newLocalState,
      persistedState: newPersistedState
    });
  }
}

RichTextResizeToolbar.propTypes = {
  onSave: PropTypes.func,
  localState: PropTypes.instanceOf(Map),
  persistedState: PropTypes.instanceOf(Map)
};
