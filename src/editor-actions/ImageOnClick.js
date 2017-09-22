import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, inputStyle, checkboxStyle, labelStyle, secondaryMenuTitleStyle, fieldGroupStyle, tabStyle, selectedTabStyle, buttonNavTypeWrapperStyle, buttonNavTypeMenuStyle, dropdownStyle } from '../helpers/styles/editor';
import {IMG_ACTION_TYPES } from '../helpers/constants';
import Menu from '../components/Menu';
import Button from '../components/Button';
import DropDownMenu from '../components/DropDownMenu';

import LinkButton from '../icons/LinkButton';

export default class ImageOnClick extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: props.isActive || false,
      actionType: IMG_ACTION_TYPES.URL,
      href: props.href || '',
      isNewWindow: props.isNewWindow || false,
      flowId: ''
    };
  }

  componentWillReceiveProps(nextProps){
    const update = {};
    if (nextProps.isActive !== this.props.isActive) {
      update.isMenuOpen = nextProps.isActive;
    };
    if (nextProps.href !== this.props.href) {
      update.href = nextProps.href;
    };
    if (nextProps.isNewWindow !== this.props.isNewWindow) {
      update.isNewWindow = nextProps.isNewWindow;
    };

    const { persistedState } = nextProps;
    const href = persistedState.get('href');
    const isNewWindow = persistedState.get('isNewWindow');
    const flowId = persistedState.get('flowId')

    if (href !== undefined) {
      update.href = href;
    }

    if (isNewWindow !== undefined) {
      update.isNewWindow = isNewWindow;
    }

    if (flowId) {
      update.flowId = flowId;
      update.actionType = IMG_ACTION_TYPES.APPCUES;
    }

    if (Object.keys(update).length) {
      this.setState(update);
    };
  }

  render() {
    const { persistedState, isActive, hasRoomToRenderBelow } = this.props;
    const { isMenuOpen, actionType, flowId, href, isNewWindow } = this.state;

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      ...dropdownStyle,
      width: 300,
      animationName: `editor-slide-${(isMenuOpen) ? 'in' : 'out'}-${(hasRoomToRenderBelow) ? 'bottom' : 'top'}`
    };
    if (!hasRoomToRenderBelow) {
      dropdownStyles.bottom = dropdownStyles.top + 55;
      delete dropdownStyles.top;
    };

    const titleStyles = secondaryMenuTitleStyle;
    const row = {
      marginTop: 10,
      display: 'flex'
    };

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
          <div style={buttonNavTypeWrapperStyle}>
            <div
              onClick={() => this.selectOnClickAction(IMG_ACTION_TYPES.URL)}
              style={{  ...tabStyle, ...(actionType === IMG_ACTION_TYPES.URL && selectedTabStyle), flexGrow: 1,  }}>
                Go to URL
            </div>
            <div
              onClick={() => this.selectOnClickAction(IMG_ACTION_TYPES.APPCUES)}
              style={{ ...tabStyle, ...(actionType === IMG_ACTION_TYPES.APPCUES && selectedTabStyle),flexGrow: 1 }}>
                Trigger Flow
            </div>
          </div>
          <div style={buttonNavTypeMenuStyle}>
            { actionType === IMG_ACTION_TYPES.URL &&
                <div>
                  <div style={{ ...row, flexDirection: 'column' }}>
                    <label style={ labelStyle }>URL</label>
                    <input autoFocus type="text" style={ inputStyle } value={href} onClickCapture={this.handleClick} onChange={(e) => this.handleHref(e)} />
                  </div>
                  <div style={{ ...row, alignItems: 'center' }}>
                    <input id="link-checkbox" type="checkbox" style={ checkboxStyle } checked={isNewWindow} onChange={(e) => this.handleIsNewWindow(e)} />
                    <label htmlFor="link-checkbox">Open In New Window</label>
                  </div>
                </div>
            }
            { actionType === IMG_ACTION_TYPES.APPCUES &&
              <div>
                <div style={ fieldGroupStyle }>
                  <label style={ labelStyle }>Flow ID</label>
                  <input type="text" value={ flowId } style={ inputStyle } onChange={(e) => this.handleAppcuesShow(e)}/>
                </div>
                <p style={{marginTop: '10px', lineHeight: '16px'}}>Enter the Flow ID of a published flow to trigger it from this image.
                </p>
              </div>
            }
          </div>
          
        <div style={{textAlign: 'right', marginTop: '5px'}}>
          <Button className="btn" onClick={(e) => this.saveAction(e)}>Save</Button>
        </div>

      </Menu>
    ) : null;

    return (
      <div>
        <LinkButton onClick={() => this.toggleDropdown()} {...buttonProps} />
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

  selectOnClickAction(actionType) {
    this.setState({ actionType });
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

  handleAppcuesShow(e) {
    const value = e.target.value;
    this.setState({
      flowId: value
    });
  }

  getNewState(currentActionType) {
    const { persistedState } = this.props;
    const { flowId, href, isNewWindow } = this.state;

    const hrefWithProtocol = (href.includes('://') || href.includes('//')) ? href : '//' + href;

    if (currentActionType === IMG_ACTION_TYPES.URL) {
      return persistedState
        .set('href', hrefWithProtocol)
        .set('isNewWindow', isNewWindow)
        .delete('flowId')
    }
    if (currentActionType === IMG_ACTION_TYPES.APPCUES) {
      return persistedState
        .set('flowId', flowId)
        .delete('href')
        .delete('isNewWindow')
    }

  }

  saveAction() {
    const { localState, persistedState, onChange, onToggleActive } = this.props;
    const { actionType, isMenuOpen, flowId, href, isNewWindow } = this.state;

    const newPersistedState = this.getNewState(actionType)

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

ImageOnClick.propTypes = {
  href: PropTypes.string,
  isNewWindow: PropTypes.bool,
  flowId: PropTypes.string,
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};
