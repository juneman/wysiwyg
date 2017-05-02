import React from 'react';
import ButtonStyles from '../../src/editor-actions/ButtonStyles';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import sinon from 'sinon';

describe('<ButtonStyles />', () => {

  it('should render a list of input boxes when isActive===true', () => {
    const wrapper = shallow(
      <ButtonStyles
        onChange={() => {}}
        onToggleActive={() => {}}
        isActive={true}
        localState={Map()}
        persistedState={Map()}
      />
    );
    expect(wrapper.find('input')).to.have.length(5);
  });

  it('should set each style on instance.state in persistedState onChange', () => {
    const onChange = sinon.spy();
    const persistedState = Map();
    const localState = Map();

    const wrapper = shallow(
      <ButtonStyles
        onChange={onChange}
        onToggleActive={() => {}}
        isActive={false}
        localState={localState}
        persistedState={persistedState}
      />
    );
    wrapper.instance().setState({borderRadius: '2'});
    wrapper.instance().handleSave();
    expect(onChange).to.have.been.calledWith({
      localState,
      persistedState: persistedState.set('borderRadius', '2')
    });
  });

});