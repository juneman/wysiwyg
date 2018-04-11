import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, inputStyle, checkboxStyle, labelStyle, secondaryMenuTitleStyle, fieldGroupStyle, shortInputStyle, buttonNavTypeMenuStyle, dropdownStyle } from '../helpers/styles/editor';
import { BUTTON_ACTION_TYPES, BUTTON_ACTION_TYPES_LIST, BUTTON_ACTIONS_WITH_DATA_STEP_ATTRS } from '../helpers/constants';
import Menu from '../components/Menu';
import DropDownMenu from '../components/DropDownMenu';

import ActionButton from '../icons/ActionButton';

export default class ButtonAction extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      href: props.href || '',
      isNewWindow: props.isNewWindow || false,
      markCurrentFlowAsComplete: props.markCurrentFlowAsComplete || false,
      isMenuOpen: props.isActive || false,
      buttonActionType: BUTTON_ACTION_TYPES.NEXT_PAGE,
      stepIndex: 0,
      flowId: ''
    };
  }

  componentWillReceiveProps(nextProps){
    const update = {};
    const { persistedState } = nextProps;

    [
      'href',
      'isNewWindow',
      'stepIndex',
      'buttonActionType',
      'flowId',
      'markCurrentFlowAsComplete'
    ].forEach((property) => {
      let persistedStateVal = persistedState.get(property);

      if(nextProps[property] !== this.props[property]) {
        update[property] = nextProps[property];
      }
      if (persistedStateVal !== undefined) {
        update[property] = persistedStateVal;
      }
    });


    if (Object.keys(update).length) {
      this.setState(update);
    }
  }

  render() {
    const { isActive, hasRoomToRenderBelow, numPages } = this.props;
    const { href, isNewWindow, isMenuOpen, buttonActionType, stepIndex, flowId, markCurrentFlowAsComplete } = this.state;

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      ...dropdownStyle,
      width: 300,
      animationName: `editor-slide-${(isMenuOpen) ? 'in' : 'out'}-${(hasRoomToRenderBelow) ? 'bottom' : 'top'}`
    };
    if (!hasRoomToRenderBelow) {
      dropdownStyles.bottom = dropdownStyles.top + 55;
      delete dropdownStyles.top;
    }

    const hasMoreThanOneStep = numPages > 1;

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>

        <h4 style={ secondaryMenuTitleStyle }>When the button is clicked</h4>

          <div style={buttonNavTypeMenuStyle}>
            <p htmlFor="button-action-menu" style={labelStyle}>Trigger Action</p>
            <DropDownMenu
              className="form-control"
              id="button-action-menu"
              unsearchable
              selectedValue={ buttonActionType }
              options={ BUTTON_ACTION_TYPES_LIST }
              onSelect={ (value) => this.handleAction(value) }/>
          </div>

          { buttonActionType === BUTTON_ACTION_TYPES.URL &&
            <div style={buttonNavTypeMenuStyle}>
              <div style={ fieldGroupStyle }>
                <label htmlFor="url-input-field" style={ labelStyle }>Link to URL</label>
                <input id="url-input-field" autoFocus type="text" style={ inputStyle } value={href} onClickCapture={this.handleClick} onChange={(e) => this.handleHref(e)} />
              </div>
              <div style={{ marginTop: 5 }}>
                <input id="link-checkbox" type="checkbox" style={checkboxStyle} checked={isNewWindow} onChange={(e) => this.handleIsNewWindow(e)} />
                <label htmlFor="link-checkbox">Open In New Window</label>
              </div>
              <div style={{ marginTop: 5 }}>
                <input id="mark-current-as-complete-checkbox" type="checkbox" style={checkboxStyle} checked={markCurrentFlowAsComplete} onChange={(e) => this.handleMarkCurrentFlowAsComplete(e)} />
                <label htmlFor="mark-current-as-complete-checkbox">Mark flow in progress as complete</label>
              </div>
            </div>
          }
          { buttonActionType === BUTTON_ACTION_TYPES.CUSTOM_PAGE &&
            <div style={buttonNavTypeMenuStyle}>
              <div style={ fieldGroupStyle }>
                <label style={ labelStyle }>Step number</label>
                <input autoFocus onClickCapture={this.handleClick}  type="number" min={1} max={numPages} value={ hasMoreThanOneStep ? stepIndex + 1 : 1} disabled={!hasMoreThanOneStep} style={ shortInputStyle } onChange={(e) => this.handleStepIndex(e)}/>
              </div>
              <p style={{marginTop: '10px', lineHeight: '16px'}}>
                {
                  `This group contains ${ numPages === 1 ? 'only' : '' } ${ numPages || 'an unknown number of' } step${ hasMoreThanOneStep ? 's' : '' }. ${ hasMoreThanOneStep ? 'Set a number to this button to direct users to that specific step.' : '' }`
                }
              </p>
            </div>
          }

          { buttonActionType === BUTTON_ACTION_TYPES.APPCUES &&
            <div style={buttonNavTypeMenuStyle}>
              <div style={ fieldGroupStyle }>
                <label style={ labelStyle }>Flow ID</label>
                <input type="text" value={ flowId } style={ inputStyle } onChange={(e) => this.handleAppcuesShow(e)}/>
              </div>
              <p style={{marginTop: '10px', lineHeight: '16px'}}>Enter the Flow ID of a published flow to trigger it from this button.
              </p>
            </div>
          }

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
    }, this.saveAction);
  }

  handleClick(e) {
    e.target.focus();
  }

  handleMarkCurrentFlowAsComplete(e) {
    const markCurrentFlowAsComplete = e.target.checked;
    this.setState({
      markCurrentFlowAsComplete
    }, this.saveAction);
  }

  handleIsNewWindow(e) {
    const isNewWindow = e.target.checked;
    this.setState({
      isNewWindow
    }, this.saveAction);
  }

  handleStepIndex(e) {
    const value = e.target.value;

    this.setState({
      stepIndex: value - 1
    }, this.saveAction);
  }

  handleAction(value) {

    this.setState({
      buttonActionType: value
    }, this.saveAction);
  }

  handleAppcuesShow(e) {
    const value = e.target.value;

    this.setState({
      buttonActionType: BUTTON_ACTION_TYPES.APPCUES,
      flowId: value
    }, this.saveAction);

  }

  getPersistedStateByButtonActionType(buttonActionType, persistedState, state={}) {
    const { stepIndex } = this.state;

    if (BUTTON_ACTIONS_WITH_DATA_STEP_ATTRS.includes(buttonActionType)) {
      return persistedState
        .set('buttonActionType', buttonActionType)
        .delete('markCurrentFlowAsComplete')
        .delete('href')
        .delete('flowId')
        .delete('stepIndex')
        .delete('isNewWindow');
    }

    if (buttonActionType == BUTTON_ACTION_TYPES.CUSTOM_PAGE && stepIndex !== undefined) {
      return persistedState
        .set('buttonActionType', buttonActionType)
        .set('stepIndex', stepIndex)
        .delete('markCurrentFlowAsComplete')
        .delete('href')
        .delete('flowId')
        .delete('isNewWindow');
    }

    if (buttonActionType == BUTTON_ACTION_TYPES.URL) {
      return persistedState
        .set('buttonActionType', buttonActionType)
        .set('href', state.href)
        .set('isNewWindow', state.isNewWindow)
        .set('markCurrentFlowAsComplete', state.markCurrentFlowAsComplete)
        .delete('stepIndex')
        .delete('flowId');
    }

    if (buttonActionType == BUTTON_ACTION_TYPES.APPCUES) {
      return persistedState
        .set('buttonActionType', buttonActionType)
        .set('flowId', state.flowId)
        .delete('markCurrentFlowAsComplete')
        .delete('href')
        .delete('isNewWindow')
        .delete('stepIndex');
    }

    return persistedState;
  }

  saveAction() {
    const { localState, persistedState, onChange } = this.props;
    const { isNewWindow, href, buttonActionType, markCurrentFlowAsComplete, flowId } = this.state;

    const newPersistedState = this.getPersistedStateByButtonActionType(buttonActionType, persistedState, { href, isNewWindow, markCurrentFlowAsComplete, flowId });

    onChange({
      localState,
      persistedState: newPersistedState
    });
  }

}

ButtonAction.propTypes = {
  href: PropTypes.string,
  isNewWindow: PropTypes.bool,
  buttonActionType: PropTypes.string,
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  markCurrentFlowAsComplete: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
  hasRoomToRenderBelow: PropTypes.bool,
  numPages: PropTypes.number
};
