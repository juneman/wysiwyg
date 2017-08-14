import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, secondaryMenuTitleStyle, dropdownStyle, checkboxStyle, buttonStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';

import SettingsButton from '../icons/SettingsButton';
import Button from '../components/Button';
import DropDownMenu from '../components/DropDownMenu';

export default class RatingOptions extends React.Component {

  constructor(props) {
    super(props);

    const { isRequired, numOptions } = props.persistedState.toJS();

    this.state = {
      isRequired: isRequired || false,
      numOptions: numOptions || 11,
      isMenuOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const update = {};
    const { isRequired, numOptions } = this.props.persistedState.toJS();
    const { isRequired: isRequiredNew, numOptions: numOptionsNew } = nextProps.persistedState.toJS();

    if (isRequired !== isRequiredNew) {
      update.isRequired = isRequiredNew;
    }
    if (numOptions !== numOptionsNew) {
      update.numOptions = numOptionsNew;
    }
    if (nextProps.isActive !== this.props.isActive) {
      update.isMenuOpen = nextProps.isActive;
    }
    if (Object.keys(update).length) {
      this.setState(update);
    }
  }

  render() {
    const { isRequired, numOptions, isMenuOpen } = this.state;
    const { isActive, hasRoomToRenderBelow } = this.props;

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      ...dropdownStyle,
      width: 300,
      animationName: `editor-slide-${(isMenuOpen) ? 'in' : 'out'}-${(hasRoomToRenderBelow) ? 'bottom' : 'top'}`
    };
    if (!hasRoomToRenderBelow) {
      dropdownStyles.bottom = dropdownStyles.top;
      delete dropdownStyles.top;
    }

    const titleStyles = secondaryMenuTitleStyle;

    const row = {
      marginTop: 20
    };
    const allOptions = [...(new Array(10))].map((_, i) => ({ label: i + 1, value: i + 2 }))

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
        <div style={titleStyles}>Rating Options</div>
        <div>
          <div style={row}>
            <input id="field-is-required" type="checkbox" style={checkboxStyle} checked={isRequired} onChange={(e) => this.handleIsRequired(e)} />
            <label htmlFor="field-is-required">Required Field</label>
          </div>
          <div style={row}>
            <DropDownMenu
              className="form-control"
              label="Rating limit"
              unsearchable
              maxHeight={150}
              selectedValue={ numOptions }
              hasRoomToRenderBelow={ hasRoomToRenderBelow }
              options={ allOptions }
              onSelect={ (value) => this.handleRatingLimit(value) }/>
          </div>
          <div style={{textAlign: 'right', ...row}}>
            <Button className="btn" onClick={(e) => this.handleSave(e)}>Save</Button>
          </div>
        </div>
      </Menu>
    ) : null;

    return (
      <div style={{marginRight: 10}}>
        <SettingsButton
          onClick={() => this.toggleDropdown()}
          text="Rating Options"
          {...buttonProps}  />
        { dropdownNodes }
      </div>
    );
  }

  toggleDropdown() {
    const { onToggleActive, isActive } = this.props;
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });

    if(isActive) {
      setTimeout(() => onToggleActive(!isActive), 200);
    } else {
      onToggleActive(!isActive);
    }
  }

  handleRatingLimit(numOptions) {
    this.setState({ 
      numOptions
    });
  }

  handleIsRequired(e) {
    const isRequired = e.target.checked;
    this.setState({
      isRequired
    });
  }

  handleSave(e) {
    if (e) {
      e.preventDefault();
    }
    const { localState, persistedState, onChange, onToggleActive } = this.props;
    const { isRequired, numOptions } = this.state;

    const newPersistedState = persistedState
      .set('numOptions', numOptions)
      .set('isRequired', isRequired);

    this.setState({
      isMenuOpen: false
    });

    setTimeout(() => onToggleActive(false), 200);

    onChange({
      localState,
      persistedState: newPersistedState
    });
  }

}

RatingOptions.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  hasRoomToRenderBelow: PropTypes.bool
};
