import React from 'react';
import Hyperlink from '../../src/editor-actions/Hyperlink';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('<Hyperlink />', () => {

  it('should render the LinkButton icon by default', () => {
    const wrapper = shallow(
      <Hyperlink
        onChange={() => {}}
        onToggleActive={() => {}}
        isActive={false}
      />
    );
    expect(wrapper.find('LinkButton')).to.have.length(1);
  });

  it('should render the link dropdown when isActive', () => {
    const wrapper = shallow(
      <Hyperlink
        onChange={() => {}}
        onToggleActive={() => {}}
        isActive={true}
      />
    );
    expect(wrapper.find('input')).to.have.length(2);
  });

  it('should send an onChange event when Save is clicked', () => {
    const onChange = sinon.spy();
    const wrapper = shallow(
      <Hyperlink
        onChange={onChange}
        onToggleActive={() => {}}
        isActive={true}
      />
    );
    wrapper.instance().setState({
      href: 'a.com',
      isNewWindow: true
    });
    wrapper.find('button').simulate('click');
    expect(onChange.calledOnce).to.be.ok;
    expect(onChange).to.have.been.calledWith('a.com', true);
  });

});