import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { getButtonProps, inputStyle, checkboxStyle, labelStyle, secondaryMenuTitleStyle, flexColumn, flexJustifyContentSpaceBetween, shortInputStyle, buttonNavTypeMenuStyle, dropdownStyle } from '../helpers/styles/editor';
import { BUTTON_ACTION_TYPES, BUTTON_ACTION_TYPES_LIST, BUTTON_ACTIONS_WITH_DATA_STEP_ATTRS, DEFAULT_USER_PROPS } from '../helpers/constants';
import { isTimestamp } from '../helpers/utils';
import Menu from '../components/Menu';
import DropDownMenu from '../components/DropDownMenu';

import ActionButton from '../icons/ActionButton';
import AddButton from '../icons/AddButton';
import CancelButton from '../icons/CancelButton';

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
      userPropertiesToUpdate: {'': ''},
      updateUserProperties: false
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
        .filter((userProperty) => DEFAULT_USER_PROPS.indexOf(userProperty.value) == -1 && !isTimestamp(userProperty.options[0].name))
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
      // 'userProperties',
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

    if (Object.keys(update).length) {
      this.setState(update);
    }

    if (nextProps.isActive !== this.props.isActive) {
      this.setState({
        isMenuOpen: nextProps.isActive
      });
    }
  }

  render() {
    const { isActive, hasRoomToRenderBelow, numPages } = this.props;
    const { href, isNewWindow, isMenuOpen, buttonActionType, stepIndex, flowId, markCurrentFlowAsComplete, eventName, trackEvent, userPropertiesToUpdate, updateUserProperties, userPropertiesDropdown } = this.state;

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

    console.log(userPropertiesDropdown, userPropertiesToUpdate);

    const dropdownNodes = isActive ? (
      <Menu style={{...dropdownStyles, ...flexColumn, maxHeight: 300, overflow: 'scroll' }}>
        <h4 style={ secondaryMenuTitleStyle }>When the button is clicked</h4>

        <div style={{...buttonNavTypeMenuStyle, marginTop: 0}}>
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
          <div style={{ margin: '-8px 8px 16px 8px'}}>
            <div style={ flexColumn }>
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
          <div style={{ margin: '-8px 8px 16px 8px'}}>
            <div style={ flexColumn }>
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
          <div style={{ margin: '-8px 8px 16px 8px'}}>
            <div style={ flexColumn }>
              <label style={ labelStyle }>Flow ID</label>
              <input type="text" value={ flowId } style={ inputStyle } onChange={(e) => this.handleAppcuesShow(e)}/>
            </div>
            <p style={{marginTop: '10px', lineHeight: '16px'}}>Enter the Flow ID of a published flow to trigger it from this button.
            </p>
          </div>
        }

        <label htmlFor="user-properties-checkbox" style={{cursor: 'pointer'}}>
          <input id="user-properties-checkbox" type="checkbox" style={checkboxStyle} checked={updateUserProperties} onChange={(e) => this.handleUpdateUserProperties(e)} />
          Update User Properties
        </label>

        { updateUserProperties &&
          <div style={{...buttonNavTypeMenuStyle, ...flexColumn, alignItems: 'center'}}>
            <div style={ {...flexColumn, width: '100%'} }>
              {Object.keys(userPropertiesToUpdate).map((key, index) => (
                <div key={index} style={ {...flexJustifyContentSpaceBetween, position: 'relative', marginTop: (index > 0 ) ? 8 : 0} }>
                  <DropDownMenu
                    className="form-control"
                    defaultValue="Choose a property"
                    options={userPropertiesDropdown}
                    selectedValue={key}
                    smallDropDown
                    overflowDropdown
                    onSelect={(value) => this.selectUserProperty(key, value)}
                    />
                  <input type={ this.getUserPropertyType(key, userPropertiesDropdown) } value={ userPropertiesToUpdate[key] } style={ {...inputStyle, ...smallInputStyle, margin: '0 8px'} } onChange={(e) => this.selectUserPropertyValue(e, key)}/>
                  { index > 0 &&
                    <div style={{position: 'absolute', right: -16, cursor: 'pointer', height: 32, ...flexColumn, justifyContent: 'center'}}>
                      <CancelButton
                        onClick={() => this.deleteUserProperty(key)}
                        smallButton
                        hideBackground={true}
                        color="#808080"/>
                    </div>
                  }
                </div>
              ))}
            </div>
            {/* disable the add button if there is an empty property in the userPropertiesToUpdate object */}
            <AddButton disabled={userPropertiesToUpdate[""] === ""} style={{marginTop: 8}} smallButton onClick={() => this.addUserProperty()}/>
          </div>
        }


        <label htmlFor="track-event-checkbox" style={{cursor: 'pointer'}}>
          <input id="track-event-checkbox" type="checkbox" style={checkboxStyle} checked={trackEvent} onChange={(e) => this.handleTrackEvent(e)} />
          Track Event
        </label>

        { trackEvent &&
          <div style={buttonNavTypeMenuStyle}>
            <div style={ flexColumn }>
              <label style={ labelStyle }>Event Name</label>
              <input type="text" value={ eventName } style={ inputStyle } onChange={(e) => this.handleAddEvent(e)}/>
            </div>
            <p style={{marginTop: '10px', lineHeight: '16px'}}>Enter the event name to trigger from this button.
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
    let userPropertiesToUpdate = {...this.state.userPropertiesToUpdate};
    userPropertiesToUpdate[''] = '';
    this.setState({ userPropertiesToUpdate }); //add saveAction
  }

  deleteUserProperty(key) {
    let userPropertiesToUpdate = {...this.state.userPropertiesToUpdate};
    delete userPropertiesToUpdate[key];
    console.log(key);
    this.setState({ userPropertiesToUpdate });//add saveAction
  }

  selectUserProperty(key, value) {
    let userPropertiesToUpdate = {...this.state.userPropertiesToUpdate};
    delete userPropertiesToUpdate[key];
    userPropertiesToUpdate[value] = '';
    console.log(key, value);
    this.setState({ userPropertiesToUpdate });//add saveAction
  }

  selectUserPropertyValue(e, key) {
    const userPropertyValue = e.target.value;
    let userPropertiesToUpdate = {...this.state.userPropertiesToUpdate};
    userPropertiesToUpdate[key] = userPropertyValue;
    this.setState({ userPropertiesToUpdate });//add saveAction
  }

  getPersistedStateByButtonActionType(buttonActionType, persistedState, state={}) {
    const { stepIndex } = this.state;

    if (BUTTON_ACTIONS_WITH_DATA_STEP_ATTRS.includes(buttonActionType)) {
      return persistedState
        .set('buttonActionType', buttonActionType)
        .delete('markCurrentFlowAsComplete')
        .set('eventName', state.eventName)
        .set('trackEvent', state.trackEvent)
        // .set('userProperties', state.userProperties)
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
        // .set('userProperties', state.userProperties)
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
        // .set('userProperties', state.userProperties)
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
        // .set('userProperties', state.userProperties)
        .set('updateUserProperties', state.updateUserProperties)
        .delete('href')
        .delete('isNewWindow')
        .delete('stepIndex');
    }

    return persistedState;
  }

  saveAction() {
    const { localState, persistedState, onChange } = this.props;
    const { isNewWindow, href, buttonActionType, markCurrentFlowAsComplete, flowId, eventName, trackEvent, userProperties, updateUserProperties } = this.state;

    const newPersistedState = this.getPersistedStateByButtonActionType(buttonActionType, persistedState, { href, isNewWindow, markCurrentFlowAsComplete, flowId, eventName, trackEvent, userProperties, updateUserProperties });

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
