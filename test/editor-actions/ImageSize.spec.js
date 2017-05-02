import React from 'react';
import ImageSize from '../../src/editor-actions/ImageSize';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import sinon from 'sinon';

describe('<ImageSize />', () => {

  it('should only render the button when isActive===false', () => {
    const wrapper = shallow(
      <ImageSize
        onChange={() => {}}
        onToggleActive={() => {}}
        isActive={false}
        localState={Map()}
        persistedState={Map()}
      />
    );
    expect(wrapper.find('SelectSizeButton')).to.have.length(1);
    expect(wrapper.find('Menu')).to.have.length(0);
  });

  it('should render the Menu when isActive ==== true', () => {
    const wrapper = shallow(
      <ImageSize
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
    const persistedState = Map({
      width: 200,
      height: 300
    });
    const localState = Map();

    const wrapper = shallow(
      <ImageSize
        onChange={onChange}
        onToggleActive={() => {}}
        isActive={false}
        localState={localState}
        persistedState={persistedState}
      />
    );
    wrapper.instance().setState({width: 100});
    wrapper.instance().handleSave();
    expect(onChange).to.have.been.calledWith({
      localState,
      persistedState: persistedState.set('width', 100).set('height', 150)
    });
  });

});