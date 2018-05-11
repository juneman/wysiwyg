import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, inputStyle, checkboxStyle, labelStyle, secondaryMenuTitleStyle, flexColumn, flexJustifyContentSpaceBetween, shortInputStyle, buttonNavTypeMenuStyle, dropdownStyle, flexRow } from '../helpers/styles/editor';
import { BUTTON_ACTION_TYPES, BUTTON_ACTION_TYPES_LIST, BUTTON_ACTIONS_WITH_DATA_STEP_ATTRS, DEFAULT_USER_PROPS } from '../helpers/constants';
import { isTimestamp } from '../helpers/utils';
import Menu from '../components/Menu';
import DropDownMenu from '../components/DropDownMenu';

import ActionButton from '../icons/ActionButton';
import AddButton from '../icons/AddButton';
import CancelButton from '../icons/CancelButton';


const subsectionBorderLeft = {
  borderLeft: '4px solid rgba(0,0,0,0.14)',
  margin: '0 8px 8px',
  padding: '4px 0 4px 8px'
};
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
      flowId: '',
      eventName: '',
      trackEvent: false,
      keyToAdd: null,
      valueToAdd: null,
      userPropertiesToUpdate: Map({}),
      updateUserProperties: false,
      userPropertiesDropdown: []
    };
  }

  componentDidMount() {
    const { userProperties: userPropertyList } = this.props;
    this.setState({
      userPropertiesDropdown: [
        ...(userPropertyList)
        .map((userProperty) => {
          return userProperty.toJS();
        })
        .filter((userProperty) => {

          const isTimestamp = (userProperty.options && userProperty.options.length > 0) ?
            !isTimestamp(userProperty.options[0].name) :
            false;

          return (
            DEFAULT_USER_PROPS.indexOf(userProperty.value) == -1 &&
            isTimestamp
          );
        })
      ].map((userProperty) => ({
         label: userProperty.name,
         type: this.setUserPropertyType(userProperty.options),
         ...userProperty
      }))
    });
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
      'markCurrentFlowAsComplete',
      'eventName',
      'trackEvent',
      'userPropertiesToUpdate',
      'updateUserProperties'
    ].forEach((property) => {
      let persistedStateVal = persistedState.get(property);

      if(nextProps[property] !== this.props[property]) {
        update[property] = nextProps[property];
      }
      if (persistedStateVal !== undefined) {
        update[property] = persistedStateVal;
      }
    });

    if (nextProps.isActive !== this.props.isActive) {
      this.setState({
        isMenuOpen: nextProps.isActive
      });
    }

    if (Object.keys(update).length) {
      this.setState(update);
    }

  }

  render() {
    const { isActive, hasRoomToRenderBelow, numPages } = this.props;
    const { href, isNewWindow, isMenuOpen, buttonActionType, stepIndex, flowId, markCurrentFlowAsComplete, eventName, trackEvent, keyToAdd, valueToAdd, userPropertiesToUpdate, updateUserProperties, userPropertiesDropdown } = this.state;

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      ...dropdownStyle,
      width: 364,
      animationName: `editor-slide-${(isMenuOpen) ? 'in' : 'out'}-${(hasRoomToRenderBelow) ? 'bottom' : 'top'}`
    };
    if (!hasRoomToRenderBelow) {
      dropdownStyles.bottom = dropdownStyles.top;
      delete dropdownStyles.top;
    }

    const smallInputStyle = {
      fontSize: 12,
      width: 132,
      height: 32,
      marginLeft: 8,
      flexShrink: 1,
      flexBasis: '55%'
    };

    const hasMoreThanOneStep = numPages > 1;
    const remainingUserProperties = userPropertiesDropdown.filter((property) => userPropertiesToUpdate.get(property.value) == undefined);
    const propertyDropdownExample = keyToAdd && userPropertiesDropdown.find((property) => property.value == keyToAdd);
    const exampleInput = (propertyDropdownExample && propertyDropdownExample.options.length > 0) ? propertyDropdownExample.options[0].name : 'Enter Value';
    const inputFieldType = this.getUserPropertyType(keyToAdd, userPropertiesDropdown);

    const dropdownNodes = isActive ? (
      <Menu style={{...dropdownStyles, ...flexColumn, maxHeight: 300, overflow: 'scroll' }}>
        <h4 style={ secondaryMenuTitleStyle }>When the button is clicked</h4>

        <div style={{marginBottom: 8}}>
          <p htmlFor="button-action-menu" style={labelStyle}>Trigger Action</p>
          <DropDownMenu
            className="form-control"
            id="button-action-menu"
            unsearchable
            selectedValue={ buttonActionType }
            options={ BUTTON_ACTION_TYPES_LIST }
            overflowDropdown
            onSelect={ (value) => this.handleAction(value) }/>
        </div>

        { buttonActionType === BUTTON_ACTION_TYPES.URL &&
          <div style={{marginBottom: 8}}>
            <div style={ flexColumn }>
              <label htmlFor="url-input-field" style={ labelStyle }>Link to URL</label>
              <input id="url-input-field" autoFocus type="text" style={ inputStyle } value={href} onClickCapture={this.handleClick} onChange={(e) => this.handleHref(e)} />
            </div>
            <div style={{ marginTop: 4 }}>
              <input id="link-checkbox" type="checkbox" style={checkboxStyle} checked={isNewWindow} onChange={(e) => this.handleIsNewWindow(e)} />
              <label htmlFor="link-checkbox">Open In New Window</label>
            </div>
            <div style={{ marginTop: 4 }}>
              <input id="mark-current-as-complete-checkbox" type="checkbox" style={checkboxStyle} checked={markCurrentFlowAsComplete} onChange={(e) => this.handleMarkCurrentFlowAsComplete(e)} />
              <label htmlFor="mark-current-as-complete-checkbox">Mark flow in progress as complete</label>
            </div>
          </div>
        }
        { buttonActionType === BUTTON_ACTION_TYPES.CUSTOM_PAGE &&
          <div style={{marginBottom: 8}}>
            <div style={ flexColumn }>
              <label style={ labelStyle }>Step number</label>
              <input autoFocus onClickCapture={this.handleClick}  type="number" min={1} max={numPages} value={ hasMoreThanOneStep ? stepIndex + 1 : 1} disabled={!hasMoreThanOneStep} style={ shortInputStyle } onChange={(e) => this.handleStepIndex(e)}/>
            </div>
            <p style={{marginTop: '8px', lineHeight: '16px'}}>
              {
                `This group contains ${ numPages === 1 ? 'only' : '' } ${ numPages || 'an unknown number of' } step${ hasMoreThanOneStep ? 's' : '' }. ${ hasMoreThanOneStep ? 'Set a number to this button to direct users to that specific step.' : '' }`
              }
            </p>
          </div>
        }

        { buttonActionType === BUTTON_ACTION_TYPES.APPCUES &&
          <div style={{marginBottom: 8}}>
            <div style={ flexColumn }>
              <label style={ labelStyle }>Flow ID</label>
              <input type="text" value={ flowId } style={ inputStyle } onChange={(e) => this.handleAppcuesShow(e)}/>
            </div>
            <p style={{marginTop: '10px', lineHeight: '16px'}}>Enter the Flow ID of a published flow to trigger it from this button.
            </p>
          </div>
        }

        <label htmlFor="user-properties-checkbox" style={{cursor: 'pointer', marginBottom: 8, width: 'fit-content'}}>
          <input id="user-properties-checkbox" type="checkbox" style={checkboxStyle} checked={updateUserProperties} onChange={(e) => this.handleUpdateUserProperties(e)} />
          Update User Properties
        </label>

        { updateUserProperties &&
          <div style={subsectionBorderLeft}>
            { userPropertiesToUpdate.size > 0 &&
              <div style={{...flexColumn, alignItems: 'flex-start', marginBottom: 8}}>
                { Object.keys(userPropertiesToUpdate.toJS()).map((key, index) => (
                  <div key={ index } style={{...flexRow, alignItems: 'center' }}>
                    <span style={{marginRight: 8}}><strong>{key}:</strong> {userPropertiesToUpdate.get(key).toString()}</span>
                    <CancelButton
                      onClick={() => this.deleteUserProperty(key)}
                      smallButton
                      hideBackground
                      color="#808080"/>
                  </div>
                ))

                }
              </div>
            }
            {  userPropertiesToUpdate.size == 0 && remainingUserProperties.length > 0 &&
              <div style={{marginBottom: 8}}>
                Choose a property to update:
              </div>
            }

            { remainingUserProperties.length > 0 &&
              <div style={{...flexColumn, alignItems: 'center'}}>
                <div style={ {...flexJustifyContentSpaceBetween, alignItems: 'center', position: 'relative', width: '100%', paddingRight: 8} }>
                  <div style={{ flexBasis: '50%' }}>
                    <DropDownMenu
                      className="form-control"
                      defaultValue="Choose property"
                      options={remainingUserProperties}
                      selectedValue={keyToAdd}
                      smallDropDown
                      overflowDropdown
                      onSelect={(value) => this.setState({keyToAdd: value})}
                      />
                  </div>
                  { inputFieldType !== 'checkbox' &&
                    <input
                      type={ inputFieldType }
                      value={ valueToAdd }
                      style={ {...inputStyle, ...smallInputStyle, marginLeft: 8} }
                      placeholder={ (exampleInput) ? `Try "${exampleInput}"` : 'Set value'}
                      onChange={(e) => this.setValueToAdd(e.target.value)}/>
                  }
                  { inputFieldType === 'checkbox' &&
                    <div style={{marginLeft: 8, flexBasis: '55%'}} >
                      <DropDownMenu
                      className="form-control"
                      defaultValue="Set value"
                      options={[{label: 'True', value: true}, {label: 'False', value: false}]}
                      selectedValue={valueToAdd}
                      smallDropDown
                      overflowDropdown
                      onSelect={(value) => this.setValueToAdd(value)}
                      />
                    </div>
                  }

                  <div style={{marginLeft: 8, transform: 'scale(0.8)'}}>
                    <AddButton
                      onClick={() => this.addUserProperty()}
                      smallButton
                      disabled={ !keyToAdd || (valueToAdd == null)}/>
                  </div>
                </div>
              </div>
            }
          </div>

        }


        <label htmlFor="track-event-checkbox" style={{cursor: 'pointer', marginBottom: 8, width: 'fit-content'}}>
          <input id="track-event-checkbox" type="checkbox" style={checkboxStyle} checked={trackEvent} onChange={(e) => this.handleTrackEvent(e)} />
          Track Event
        </label>

        { trackEvent &&
          <div style={subsectionBorderLeft}>
            <div style={ flexColumn }>
              <input type="text" placeholder="Enter an event name to track" value={ eventName } style={ inputStyle } onChange={(e) => this.handleAddEvent(e)}/>
            </div>
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

  setUserPropertyType(userPropertyOptions) {
    if(!userPropertyOptions[0] || !userPropertyOptions[0].name) return 'text';
    let exampleVal = userPropertyOptions[0].name;
    if (exampleVal === "true" || exampleVal === "false") {
      return 'checkbox';
    } else if (!isNaN(Number(exampleVal))) {
      return 'number';
    } else {
      return 'text';
    }

  }

  getUserPropertyType(key, options) {
    if (!key) return 'text';
    return options.find((option) => option.value == key).type;
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

  setValueToAdd(valueToAdd) {
    this.setState({
      valueToAdd
    });
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

  handleAddEvent(e) {
    const value = e.target.value;
    this.setState({
      eventName: value
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

  handleTrackEvent(e) {
    const trackEvent = e.target.checked;
    this.setState({
      trackEvent
    }, this.saveAction);
  }

  handleUpdateUserProperties(e) {
    const updateUserProperties = e.target.checked;
    this.setState({
      updateUserProperties
    }, this.saveAction);
  }

  addUserProperty() {
    const { keyToAdd, valueToAdd, userPropertiesToUpdate } = this.state;
    if(valueToAdd == undefined || valueToAdd == null) return;
    this.setState({
      userPropertiesToUpdate: userPropertiesToUpdate.set(keyToAdd, valueToAdd),
      keyToAdd: null,
      valueToAdd: null
    }, this.saveAction);
  }

  deleteUserProperty(key) {
    const { userPropertiesToUpdate } = this.state;
    this.setState({ userPropertiesToUpdate: userPropertiesToUpdate.delete(key) }, this.saveAction);
  }

  getPersistedStateByButtonActionType(buttonActionType, persistedState, state={}) {
    const { stepIndex } = this.state;

    if (BUTTON_ACTIONS_WITH_DATA_STEP_ATTRS.includes(buttonActionType)) {
      return persistedState
        .set('buttonActionType', buttonActionType)
        .delete('markCurrentFlowAsComplete')
        .set('eventName', state.eventName)
        .set('trackEvent', state.trackEvent)
        .set('userPropertiesToUpdate', state.userPropertiesToUpdate)
        .set('updateUserProperties', state.updateUserProperties)
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
        .set('eventName', state.eventName)
        .set('trackEvent', state.trackEvent)
        .set('userPropertiesToUpdate', state.userPropertiesToUpdate)
        .set('updateUserProperties', state.updateUserProperties)
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
        .set('eventName', state.eventName)
        .set('trackEvent', state.trackEvent)
        .set('userPropertiesToUpdate', state.userPropertiesToUpdate)
        .set('updateUserProperties', state.updateUserProperties)
        .delete('stepIndex')
        .delete('flowId');
    }

    if (buttonActionType == BUTTON_ACTION_TYPES.APPCUES) {
      return persistedState
        .set('buttonActionType', buttonActionType)
        .set('flowId', state.flowId)
        .delete('markCurrentFlowAsComplete')
        .set('eventName', state.eventName)
        .set('trackEvent', state.trackEvent)
        .set('userPropertiesToUpdate', state.userPropertiesToUpdate)
        .set('updateUserProperties', state.updateUserProperties)
        .delete('href')
        .delete('isNewWindow')
        .delete('stepIndex');
    }

    return persistedState;
  }

  saveAction() {
    const { localState, persistedState, onChange } = this.props;
    const { isNewWindow, href, buttonActionType, markCurrentFlowAsComplete, flowId, eventName, trackEvent, userPropertiesToUpdate, updateUserProperties } = this.state;

    const newPersistedState = this.getPersistedStateByButtonActionType(buttonActionType, persistedState, { href, isNewWindow, markCurrentFlowAsComplete, flowId, eventName, trackEvent, userPropertiesToUpdate, updateUserProperties });

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
  userProperties: PropTypes.List,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  markCurrentFlowAsComplete: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
  hasRoomToRenderBelow: PropTypes.bool,
  numPages: PropTypes.number
};
