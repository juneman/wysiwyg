import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, secondaryMenuTitleStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';

import SelectSizeButton from '../icons/SelectSizeButton';

export default class ImageSize extends React.Component {

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
    const { isActive } = this.props;

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      padding: 10,
      width: 300
    };

    const titleStyles = secondaryMenuTitleStyle;

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
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
      </Menu>
    ) : null;

    return (
      <div>
        <a href="#" onClick={() => this.toggleDropdown()}><SelectSizeButton {...buttonProps} /></a>
        { dropdownNodes }
      </div>
    );
  }

  toggleDropdown() {
    const { onToggleActive, isActive } = this.props;
    onToggleActive(!isActive);
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
    const { localState, persistedState, onChange } = this.props;
    const { height, width } = this.state;
    
    const newPersistedState = persistedState
      .set('height', height)
      .set('width', width);

    onChange({
      localState,
      persistedState: newPersistedState
    });
  }

}

ImageSize.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};
