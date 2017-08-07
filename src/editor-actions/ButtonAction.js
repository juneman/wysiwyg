import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, textInputStyle, checkboxStyle, secondaryMenuTitleStyle, selectMenuStyle, shortInputStyle, buttonNavTypeWrapperStyle, buttonNavTypeMenuStyle, buttonNavOptionStyle, buttonNavOptionSelectedStyle} from '../helpers/styles/editor';
import { BUTTON_ACTION_TYPES, BUTTON_NAVIGATION_OPTIONS } from '../helpers/constants';
import Menu from '../components/Menu';
import Button from '../components/Button';

import ActionButton from '../icons/ActionButton';

export default class ButtonAction extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      href: props.href || '',
      isNewWindow: props.isNewWindow || false,
      isMenuOpen: props.isActive || false,
      tabState: BUTTON_ACTION_TYPES.URL, 
      dataStepOption: '',
      dataStepIndex: 1
    };
  }

  componentWillReceiveProps(nextProps){
    const update = {};
    if (nextProps.href !== this.props.href) {
      update.href = nextProps.href;
    };
    if (nextProps.isNewWindow !== this.props.isNewWindow) {
      update.isNewWindow = nextProps.isNewWindow;
    };
    if (nextProps.isActive !== this.props.isActive) {
      update.isMenuOpen = nextProps.isActive;
    };

    const { persistedState } = nextProps;
    const buttonAction = persistedState.get('buttonAction');
    const href = persistedState.get('href');
    const isNewWindow = persistedState.get('isNewWindow');

    if (href) {
      update.href = href;
      update.isNewWindow = isNewWindow;
    };

    if (buttonAction && typeof buttonAction === 'number') {
      update.tabState = BUTTON_ACTION_TYPES.INDEX;
      update.dataStepIndex = buttonAction + 1;

    };
    if (buttonAction && typeof buttonAction === 'string') {
      update.tabState = BUTTON_ACTION_TYPES.NAV;
      update.dataStepOption = buttonAction;
    };

    if (Object.keys(update).length) {
      this.setState(update);
    };
  }

  render() {
    const { persistedState, isActive, hasRoomToRenderBelow, numPages, isFirst, isLast } = this.props;
    const { href, isNewWindow, isMenuOpen, tabState, dataStepIndex, dataStepOption } = this.state;
    const buttonAction = persistedState.get('buttonAction') || ''; 
    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      padding: 10,
      width: 300,
      animationName: `editor-slide-${(isMenuOpen) ? 'in' : 'out'}-${(hasRoomToRenderBelow) ? 'bottom' : 'top'}`,
      animationTimingFunction: 'ease-out',
      animationDuration: '0.15s',
      animationIterationCount: 1,
      animationFillMode: 'both'
    };
    if (!hasRoomToRenderBelow) {
      dropdownStyles.bottom = dropdownStyles.top + 55;
      delete dropdownStyles.top;
    };

    const titleStyles = secondaryMenuTitleStyle;
    const hasMoreThanOneStep = numPages > 1;

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>

        <div style={titleStyles}>Button Actions</div>

        <div style={buttonNavTypeWrapperStyle} className="button-action-nav-wrapper">
            <p style={tabState === BUTTON_ACTION_TYPES.URL ? buttonNavOptionSelectedStyle : buttonNavOptionStyle} onClick={() => this.handleSelectActionMenu(BUTTON_ACTION_TYPES.URL)}>By URL</p>
            <p style={tabState === BUTTON_ACTION_TYPES.NAV ? buttonNavOptionSelectedStyle : buttonNavOptionStyle} onClick={() => this.handleSelectActionMenu(BUTTON_ACTION_TYPES.NAV)}>By Type</p>
            <p style={tabState === BUTTON_ACTION_TYPES.INDEX ? buttonNavOptionSelectedStyle : buttonNavOptionStyle} onClick={() => this.handleSelectActionMenu(BUTTON_ACTION_TYPES.INDEX)}>By Step Number</p>
          </div>

          { tabState === BUTTON_ACTION_TYPES.URL &&
            <div style={buttonNavTypeMenuStyle}>
              <label>Link to URL</label>
              <input autoFocus type="text" style={textInputStyle} value={href} onClickCapture={this.handleClick} onChange={(e) => this.handleHref(e)} />

              <input id="link-checkbox" type="checkbox" style={checkboxStyle} checked={isNewWindow} onChange={(e) => this.handleIsNewWindow(e)} />
              <label htmlFor="link-checkbox">Open In New Window</label>
            </div>
          }
          { tabState === BUTTON_ACTION_TYPES.NAV &&
            <div style={buttonNavTypeMenuStyle}>
              <label>Navigation Type</label>
              <select value={dataStepOption} style={selectMenuStyle} className="form-control" onChange={(e) => this.handleAction(e)}>
                { BUTTON_NAVIGATION_OPTIONS.map((option) => {
                  return (
                    <option style={{marginLeft: '15px'}} key={option.value} value={option.value}>{option.name}</option>
                  );
                })}
              </select>
            </div>
          }
          { tabState === BUTTON_ACTION_TYPES.INDEX &&
            <div style={buttonNavTypeMenuStyle}>
              <label>Step number</label>
              <input type="number" min={1} max={numPages} value={ hasMoreThanOneStep ? dataStepIndex : ''} disabled={!hasMoreThanOneStep} style={shortInputStyle} onChange={(e) => this.handleAction(e)}/>
              <p style={{marginTop: '10px', lineHeight: '16px'}}>
                { `This group contains ${numPages} step${hasMoreThanOneStep ? 's' : ''}. ${hasMoreThanOneStep ? 'Set a step number to this button to direct users that step.' : ''}`
                }
              </p>
            </div>
          }

        <div style={{textAlign: 'right', marginTop: '5px'}}>
          <Button className="btn" onClick={(e) => this.saveAction(e)}>Save</Button>
        </div>

      </Menu>
    ) : null;

    return (
      <div>
        <ActionButton onClick={() => this.toggleDropdown()} {...buttonProps} />
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

  handleSelectActionMenu(actionType){
    this.setState({ tabState: actionType })
  }

  handleHref(e) {
    const href = e.target.value;
    this.setState({
      href
    });
  }

  handleClick(e) {
    e.target.focus();
  }

  handleIsNewWindow(e) {
    const isNewWindow = e.target.checked;
    this.setState({
      isNewWindow
    });
  }

  handleAction(e) {
    const { localState, persistedState, onChange, onToggleActive } = this.props;
    const { tabState, dataStepOption, dataStepIndex } = this.state;

    const value = e.target.value;
    
    if (tabState === BUTTON_ACTION_TYPES.INDEX) {
      this.setState({
        dataStepIndex: value
      });
      return
    };

    if (tabState === BUTTON_ACTION_TYPES.NAV) {
      this.setState({
        dataStepOption: value
      });
      return
    };
    
  }

  saveAction() {
    const { localState, persistedState, onChange, onToggleActive } = this.props;
    const { isMenuOpen, isNewWindow, href, dataStepOption, dataStepIndex, tabState } = this.state;

    const hrefWithProtocol = (href.includes('://') || href.includes('//')) ? href : '//' + href;

    let newPersistedState;
    
    if (tabState === BUTTON_ACTION_TYPES.NAV) {
      newPersistedState = persistedState
        .set('buttonAction', dataStepOption)
        .delete('href')
        .delete('isNewWindow');
    };

    if (tabState === BUTTON_ACTION_TYPES.INDEX) {
      newPersistedState = persistedState
        .set('buttonAction', dataStepIndex - 1)
        .delete('href')
        .delete('isNewWindow')
    };

    if (tabState === BUTTON_ACTION_TYPES.URL) {
      newPersistedState = persistedState
        .set('href', hrefWithProtocol)
        .set('isNewWindow', isNewWindow)
        .delete('buttonAction')
    };

    this.setState({
      isMenuOpen: !isMenuOpen
    });

    setTimeout(() => onToggleActive(false), 200);

    onChange({
      localState,
      persistedState: newPersistedState
    });

  }

}

ButtonAction.propTypes = {
  href: PropTypes.string,
  isNewWindow: PropTypes.bool,
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};
