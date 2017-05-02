import React from 'react';
import ButtonAction from '../../src/editor-actions/ButtonAction';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import sinon from 'sinon';

describe('<ButtonAction />', () => {

  it('should render a list of button options when isActive===true', () => {
    const wrapper = shallow(
      <ButtonAction
        onChange={() => {}}
        onToggleActive={() => {}}
        isActive={true}
        localState={Map()}
        persistedState={Map()}
      />
    );
    expect(wrapper.find('option')).to.have.length(5);
  });

  it('should set buttonAction in persistedState onChange', () => {
    const onChange = sinon.spy();
    const persistedState = Map();
    const localState = Map();

    const wrapper = shallow(
      <ButtonAction
        onChange={onChange}
        onToggleActive={() => {}}
        isActive={false}
        localState={localState}
        persistedState={persistedState}
      />
    );
    wrapper.instance().handleAction('next');
    expect(onChange).to.have.been.calledWith({
      localState,
      persistedState: persistedState.set('buttonAction', 'next')
    });
  });

});