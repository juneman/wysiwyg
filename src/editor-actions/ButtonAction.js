import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, textInputStyle, checkboxStyle, secondaryMenuTitleStyle, selectMenuStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';
import Button from '../components/Button';

import ActionButton from '../icons/ActionButton';

export default class ButtonAction extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      href: props.href || '',
      isNewWindow: props.isNewWindow || false,
      isMenuOpen: props.isActive || false
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
    const { persistedState, isActive, hasRoomToRenderBelow } = this.props;
    const { href, isNewWindow, isMenuOpen } = this.state;
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
      marginTop: 10
    };

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>

        <div style={titleStyles}>Button Action</div>
        <select value={buttonAction} style={selectMenuStyle} className="form-control" onChange={(e) => this.handleSave(e)}>
          { actionOption.map((styleOption) => {
            return (
              <option style={{marginLeft: '15px'}} key={styleOption.value} value={styleOption.value}>{styleOption.name}</option>
            );
          })}
        </select>


        <div style={titleStyles}>Create a Link</div>
          <div>
            <label>URL</label>
            <input autoFocus type="text" style={textInputStyle} value={href} onClickCapture={this.handleClick} onChange={(e) => this.handleHref(e)} />
          </div>
          <div style={row}>
            <input id="link-checkbox" type="checkbox" style={checkboxStyle} checked={isNewWindow} onChange={(e) => this.handleIsNewWindow(e)} />
            <label htmlFor="link-checkbox">Open In New Window</label>
          </div>

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
    // this.handleAction(e.target.value && e.target.value.length ? e.target.value : null);
    // if (e) {
    //   e.preventDefault();
    // }
    // const { onChange, onToggleActive } = this.props;
    // const { isNewWindow, href } = this.state;

    // this.setState({
    //   isMenuOpen: false
    // });

    // setTimeout(() => onToggleActive(false), 200);

    // const hrefWithProtocol = (href.includes('://')) ? href : '//' + href;

    // onChange(hrefWithProtocol, isNewWindow);
  }

  handleAction(value) {
    const { localState, persistedState, onChange, onToggleActive } = this.props;

    const newPersistedState = persistedState
      .set('buttonAction', value)
      .delete('href')
      .delete('isNewWindow');

    this.setState({
      isMenuOpen: !this.state.isMenuOpen
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
