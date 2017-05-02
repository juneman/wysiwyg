import React from 'react';
import HyperlinkBlock from '../../src/editor-actions/HyperlinkBlock';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import sinon from 'sinon';

describe('<HyperlinkBlock />', () => {

  it('should render the <Hyperlink /> component', () => {
    const wrapper = shallow(
      <HyperlinkBlock
        onChange={() => {}}
        onToggleActive={() => {}}
        isActive={false}
        localState={Map()}
        persistedState={Map()}
      />
    );
    expect(wrapper.find('Hyperlink')).to.have.length(1);
  });

  it('should set link properties in persistedState onChange', () => {
    const onChange = sinon.spy();
    const persistedState = Map();
    const localState = Map();

    const wrapper = shallow(
      <HyperlinkBlock
        onChange={onChange}
        onToggleActive={() => {}}
        isActive={false}
        localState={localState}
        persistedState={persistedState}
      />
    );
    wrapper.instance().handleLink('a.com', true);
    expect(onChange).to.have.been.calledWith({
      localState,
      persistedState: persistedState
        .set('href', 'a.com')
        .set('isNewWindow', true)
    });
  });

});