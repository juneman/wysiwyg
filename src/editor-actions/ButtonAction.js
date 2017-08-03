import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, textInputStyle, checkboxStyle, secondaryMenuTitleStyle, selectMenuStyle, shortInputStyle, buttonNavTypeWrapperStyle, buttonNavTypeMenuStyle, buttonNavOptionStyle} from '../helpers/styles/editor';
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
      dataStepOption: null,
      dataStepIndex: 1
    };
  }

  componentWillReceiveProps(nextProps){
    const update = {};
    if (nextProps.href !== this.props.href) {
      update.href = nextProps.href;
    }
    if (nextProps.isNewWindow !== this.props.isNewWindow) {
      update.isNewWindow = nextProps.isNewWindow;
    }
    if (nextProps.isActive !== this.props.isActive) {
      update.isMenuOpen = nextProps.isActive;
    }
    if (Object.keys(update).length) {
      this.setState(update);
    }
  }

  render() {
    const { persistedState, isActive, hasRoomToRenderBelow, numPages } = this.props;
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
    }

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
        value: 'previous'
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

    const row = {
      marginTop: 5
    };

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>

        <div style={titleStyles}>Button Actions</div>

        <div style={buttonNavTypeWrapperStyle} className="button-action-nav-wrapper">
            <p style={buttonNavOptionStyle} onClick={() => this.handleSelectActionMenu('isURLOpen')}>By URL</p>
            <p style={buttonNavOptionStyle} onClick={() => this.handleSelectActionMenu('isNavigationOpen')}>By Type</p>
            <p style={buttonNavOptionStyle} onClick={() => this.handleSelectActionMenu('isStepIndexOpen')}>By Step Number</p>
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
              <select value={dataStepOption} style={selectMenuStyle} className="form-control" onChange={(e) => this.handleSave(e)}>
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
              <input type="number" min={1} max={numPages} value={dataStepIndex} disabled={numPages === 1} style={shortInputStyle} onChange={(e) => this.handleSave(e)}/>
              { numPages >= 1 &&
                <p>This group contains {numPages} steps.</p>
              }
            </div>
          }

        <div style={{textAlign: 'right', ...row}}>
          <Button className="btn" onClick={(e) => this.handleSave(e)}>Save</Button>
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

  handleSave(e) {
    this.handleAction(e.target.value && e.target.value.length ? e.target.value : null);
    if (e) {
      e.preventDefault();
    }
    const { onChange, onToggleActive } = this.props;
    const { isNewWindow, href, dataStepOption, dataStepIndex, isNavigationOpen,
      isStepIndexOpen,
      isURLOpen } = this.state;

    // this.setState({
    //   isMenuOpen: false
    // });

    // setTimeout(() => onToggleActive(false), 200);

    const hrefWithProtocol = (href.includes('://')) ? href : '//' + href;

    // onChange(hrefWithProtocol, isNewWindow);
  }

  handleAction(value) {
    const { localState, persistedState, onChange, onToggleActive } = this.props;
     const { isNewWindow, href, dataStepOption, dataStepIndex, isNavigationOpen, isStepIndexOpen, isURLOpen  } = this.state;

    if (isStepIndexOpen) {
      this.setState({
        dataStepIndex: value
      });
      return
    }

    if (isNavigationOpen) {
      const newPersistedState = persistedState.set('buttonAction', value);

      onChange({
        localState,
        persistedState: newPersistedState
      });
      this.setState({
        dataStepOption: value
      });
      return
    }

    const newPersistedState = persistedState
      .set('buttonAction', value)
      .delete('href')
      .delete('isNewWindow');

    // this.setState({
    //   isMenuOpen: !this.state.isMenuOpen
    // });

    // setTimeout(() => onToggleActive(false), 200);

    // onChange({
    //   localState,
    //   persistedState: newPersistedState
    // });
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
