import React from 'react';
import InputFieldOptions from '../../src/editor-actions/InputFieldOptions';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import sinon from 'sinon';

describe('<InputFieldOptions />', () => {

  it('should render an input for isRequired and maxLength when isActive===true', () => {
    const wrapper = shallow(
      <InputFieldOptions
        onChange={() => {}}
        onToggleActive={() => {}}
        isActive={true}
        localState={Map()}
        persistedState={Map()}
      />
    );
    expect(wrapper.find('input')).to.have.length(2);
  });

  it('should set each setting on instance.state in persistedState onChange', () => {
    const onChange = sinon.spy();
    const persistedState = Map();
    const localState = Map();

    const wrapper = shallow(
      <InputFieldOptions
        onChange={onChange}
        onToggleActive={() => {}}
        isActive={false}
        localState={localState}
        persistedState={persistedState}
      />
    );
    wrapper.instance().setState({isRequired: true, maxLength: 10});
    wrapper.instance().handleSave();
    expect(onChange).to.have.been.calledWith({
      localState,
      persistedState: persistedState
        .set('isRequired', true)
        .set('maxLength', 10)
    });
  });

});