import React from 'react';
import BackgroundColor from '../../src/editor-actions/BackgroundColor';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import sinon from 'sinon';

describe('<BackgroundColor />', () => {

  it('should only render the button when isActive===false', () => {
    const wrapper = shallow(
      <BackgroundColor
        onChange={() => {}}
        onToggleActive={() => {}}
        isActive={false}
        localState={Map()}
        persistedState={Map()}
      />
    );
    expect(wrapper.find('SquareButton')).to.have.length(1);
    expect(wrapper.find('Menu')).to.have.length(0);
  });

  it('should render the Menu when isActive ==== true', () => {
    const wrapper = shallow(
      <BackgroundColor
        onChange={() => {}}
        onToggleActive={() => {}}
        isActive={true}
        localState={Map()}
        persistedState={Map()}
      />
    );
    expect(wrapper.find('Menu')).to.have.length(1);
  });

  it('should set backroundColor in persistedState onChange', () => {
    const onChange = sinon.spy();
    const persistedState = Map();
    const localState = Map();

    const wrapper = shallow(
      <BackgroundColor
        onChange={onChange}
        onToggleActive={() => {}}
        isActive={false}
        localState={localState}
        persistedState={persistedState}
      />
    );
    wrapper.instance().handleColor({
      hex: '#FF0000'
    });
    expect(onChange).to.have.been.calledWith({
      localState,
      persistedState: persistedState.set('backgroundColor', '#FF0000')
    });
  });

});