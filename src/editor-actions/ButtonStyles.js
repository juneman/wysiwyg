import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Toolbar from '../components/Toolbar';

import SettingsButton from '../icons/SettingsButton';

export default class ButtonStyles extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
      borderRadius: props.persistedState.get('borderRadius') || '',
      padding: props.persistedState.get('padding') || '',
      fontSize: props.persistedState.get('fontSize') || '',
      width: props.persistedState.get('width') || '',
      className: props.persistedState.get('className') || ''
    };
  }

  render() {
    const { showDropdown, borderRadius, padding, fontSize, width, className } = this.state;

    const buttonProps = {
      hideBackground: true,
      color: '#303030',
      clickColor: '#333',
      activeColor: '#C0C0C0'
    };

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      padding: 10,
      width: 300
    };

    const titleStyles = {
      textTransform: 'uppercase',
      fontSize: 'smaller',
      color: '#808080',
      marginBottom: 20
    };

    const row = {
      marginTop: 20
    };

    const dropdownNodes = showDropdown ? (
      <Toolbar style={dropdownStyles}>
        <div style={titleStyles}>Advanced Button Options</div>
        <div>
          <div style={row}>
            <label>Border Radius</label>
            <input type="text" value={borderRadius} className="form-control" onChange={(e) => this.handleChange(e, 'borderRadius')} />
          </div>
          <div style={row}>
            <label>Padding</label>
            <input type="text" value={padding} className="form-control" onChange={(e) => this.handleChange(e, 'padding')} />
          </div>
          <div style={row}>
            <label>Font Size</label>
            <input type="text" value={fontSize} className="form-control" onChange={(e) => this.handleChange(e, 'fontSize')} />
          </div>
          <div style={row}>
            <label>Width</label>
            <input type="text" value={width} className="form-control" onChange={(e) => this.handleChange(e, 'width')} />
          </div>
          <div style={row}>
            <label>Class Name</label>
            <input type="text" value={className} className="form-control" onChange={(e) => this.handleChange(e, 'className')} />
          </div>
          <div style={{textAlign: 'right', ...row}}>
            <button className="btn" onClick={(e) => this.handleSave(e)}>Save</button>
          </div>
        </div>
      </Toolbar>
    ) : null;

    return (
      <div>
        <a href="#" onClick={(e) => this.toggleDropdown(e)}><SettingsButton {...buttonProps} /> Field Options</a>
        { dropdownNodes }
      </div>
    );
  }

  toggleDropdown(e) {
    e.preventDefault();
    const { showDropdown } = this.state;
    this.setState({
      showDropdown: !showDropdown
    });
  }

  handleChange(e, field) {
    const value = e.target.value;
    const update = {};
    update[field] = value;
    this.setState(update);
  }

  handleSave(e) {
    e.preventDefault();
    const { localState, persistedState, onChange } = this.props;

    let newPersistedState = persistedState;
    
    Object.keys(this.state).forEach((key) => {
      const val = this.state[key];
      if (val && val.length) {
        newPersistedState = newPersistedState.set(key, val);
      } else {
        newPersistedState = newPersistedState.delete(key);
      }
    });

    this.setState({
      showDropdown: false
    });
      
    onChange({
      localState,
      persistedState: newPersistedState
    });
  }

}

ButtonStyles.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
