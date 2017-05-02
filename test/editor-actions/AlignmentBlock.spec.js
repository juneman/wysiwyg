import React from 'react';
import AlignmentBlock from '../../src/editor-actions/AlignmentBlock';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import sinon from 'sinon';

describe('<AlignmentBlock />', () => {

  it('should render the <Alignment /> component', () => {
    const wrapper = shallow(
      <AlignmentBlock
        onChange={() => {}}
        onToggleActive={() => {}}
        isActive={false}
        localState={Map()}
        persistedState={Map()}
      />
    );
    expect(wrapper.find('Alignment')).to.have.length(1);
  });

  it('should set textAlign in persistedState onChange', () => {
    const onChange = sinon.spy();
    const persistedState = Map();
    const localState = Map();

    const wrapper = shallow(
      <AlignmentBlock
        onChange={onChange}
        onToggleActive={() => {}}
        isActive={false}
        localState={localState}
        persistedState={persistedState}
      />
    );
    wrapper.instance().handleAlignment('right');
    expect(onChange).to.have.been.calledWith({
      localState,
      persistedState: persistedState.set('textAlign', 'right')
    });
  });

});