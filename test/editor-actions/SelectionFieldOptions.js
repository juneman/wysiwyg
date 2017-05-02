import React from 'react';
import SelectionFieldOptions from '../../src/editor-actions/SelectionFieldOptions';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import sinon from 'sinon';

describe('<SelectionFieldOptions />', () => {

  it('should render an input for isRequired and fieldType when isActive===true', () => {
    const wrapper = shallow(
      <SelectionFieldOptions
        onChange={() => {}}
        onToggleActive={() => {}}
        isActive={true}
        localState={Map()}
        persistedState={Map()}
      />
    );
    expect(wrapper.find('input')).to.have.length(1);
    expect(wrapper.find('select')).to.have.length(1);
  });

  it('should set each setting on instance.state in persistedState onChange', () => {
    const onChange = sinon.spy();
    const persistedState = Map();
    const localState = Map();

    const wrapper = shallow(
      <SelectionFieldOptions
        onChange={onChange}
        onToggleActive={() => {}}
        isActive={false}
        localState={localState}
        persistedState={persistedState}
      />
    );
    wrapper.instance().setState({isRequired: true, fieldType: 'dropdown'});
    wrapper.instance().handleSave();
    expect(onChange).to.have.been.calledWith({
      localState,
      persistedState: persistedState
        .set('isRequired', true)
        .set('fieldType', 'dropdown')
    });
  });

});