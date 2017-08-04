import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, textInputStyle, checkboxStyle, secondaryMenuTitleStyle, selectMenuStyle, shortInputStyle, buttonNavTypeWrapperStyle, buttonNavTypeMenuStyle, buttonNavOptionStyle, buttonNavOptionSelectedStyle} from '../helpers/styles/editor';
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
      isNavigationOpen: false,
      isStepIndexOpen: false,
      isURLOpen: true,
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
      update.dataStepIndex = buttonAction + 1;
      update.isStepIndexOpen = true;
      update.isURLOpen = false;
    };
    if (buttonAction && typeof buttonAction === 'string') {
      update.dataStepOption = buttonAction;
      update.isNavigationOpen = true;
      update.isURLOpen = false;
    };

    if (Object.keys(update).length) {
      this.setState(update);
    };
  }

  render() {
    const { persistedState, isActive, hasRoomToRenderBelow, numPages, isFirst, isLast } = this.props;
    const { href, isNewWindow, isMenuOpen, isNavigationOpen, isStepIndexOpen, isURLOpen, dataStepIndex, dataStepOption } = this.state;
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

    const actionOption = ([
      {
        name: 'None',
        value: ''
      },
      {
        name: 'Next',
        value: 'next'
      },
      {
        name: 'Previous',
        value: 'prev'
      },
      {
        name: 'Skip',
        value: 'skip'
      },
      {
        name: 'End',
        value: 'end'
      }
    ]);

    const hasMoreThanOneStep = numPages > 1;

    // TO DO: 
    // Allow flow ID selection for buttons to launch another flow
    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>

        <div style={titleStyles}>Button Actions</div>

        <div style={buttonNavTypeWrapperStyle} className="button-action-nav-wrapper">
            <p style={isURLOpen ? buttonNavOptionSelectedStyle : buttonNavOptionStyle} onClick={() => this.handleSelectActionMenu('isURLOpen')}>By URL</p>
            <p style={isNavigationOpen ? buttonNavOptionSelectedStyle : buttonNavOptionStyle} onClick={() => this.handleSelectActionMenu('isNavigationOpen')}>By Type</p>
            <p style={isStepIndexOpen ? buttonNavOptionSelectedStyle : buttonNavOptionStyle} onClick={() => this.handleSelectActionMenu('isStepIndexOpen')}>By Step Number</p>
          </div>

          { isURLOpen &&
            <div style={buttonNavTypeMenuStyle}>
              <label>Link to URL</label>
              <input autoFocus type="text" style={textInputStyle} value={href} onClickCapture={this.handleClick} onChange={(e) => this.handleHref(e)} />

              <input id="link-checkbox" type="checkbox" style={checkboxStyle} checked={isNewWindow} onChange={(e) => this.handleIsNewWindow(e)} />
              <label htmlFor="link-checkbox">Open In New Window</label>
            </div>
          }
          { isNavigationOpen &&
            <div style={buttonNavTypeMenuStyle}>
              <label>Navigation Type</label>
              <select value={dataStepOption} style={selectMenuStyle} className="form-control" onChange={(e) => this.handleAction(e)}>
                { actionOption.map((option) => {
                  return (
                    <option style={{marginLeft: '15px'}} key={option.value} value={option.value}>{option.name}</option>
                  );
                })}
              </select>
            </div>
          }
          { isStepIndexOpen &&
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

  handleSelectActionMenu(menuOption){
    const {isNavigationOpen, isStepIndexOpen, isURLOpen} = this.state;

    switch (menuOption) {
      case 'isURLOpen':
        this.setState({
          isURLOpen: true,
          isNavigationOpen: false,
          isStepIndexOpen: false
        });
        break;
      case 'isNavigationOpen':
        this.setState({
          isURLOpen: false,
          isNavigationOpen: true,
          isStepIndexOpen: false
        });
        break;
      case 'isStepIndexOpen':
        this.setState({
          isURLOpen: false,
          isNavigationOpen: false,
          isStepIndexOpen: true
        });
        break;
    }
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
    const { dataStepOption, dataStepIndex, isNavigationOpen, isStepIndexOpen  } = this.state;
    
    const value = e.target.value;
    
    if (isStepIndexOpen) {
      this.setState({
        dataStepIndex: value
      });
      return
    };

    if (isNavigationOpen) {
      this.setState({
        dataStepOption: value
      });
      return
    };
    
  }

  saveAction() {
    const { localState, persistedState, onChange, onToggleActive } = this.props;
    const { isMenuOpen, isNewWindow, href, dataStepOption, dataStepIndex, isNavigationOpen, isStepIndexOpen, isURLOpen  } = this.state;

    const hrefWithProtocol = (href.includes('://') || href.includes('//')) ? href : '//' + href;

    let newPersistedState;
    
    if (isNavigationOpen) {
      newPersistedState = persistedState
        .set('buttonAction', dataStepOption)
        .delete('href')
        .delete('isNewWindow');
    };

    if (isStepIndexOpen) {
      newPersistedState = persistedState
        .set('buttonAction', dataStepIndex - 1)
        .delete('href')
        .delete('isNewWindow')
    };

    if (isURLOpen) {
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
