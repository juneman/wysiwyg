import React from 'react';
import Alignment from '../../src/editor-actions/Alignment';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('<Alignment />', () => {

  it('should render the AlignCenter icon by default', () => {
    const wrapper = shallow(
      <Alignment
        onChange={() => {}}
        onToggleActive={() => {}}
        isActive={false}
      />
    );
    expect(wrapper.find('AlignLeft')).to.have.length(0);
    expect(wrapper.find('AlignCenter')).to.have.length(1);
    expect(wrapper.find('AlignRight')).to.have.length(0);
  });

  it('should render the Alignment dropdown with all 3 choices when isActive', () => {
    const wrapper = shallow(
      <Alignment
        onChange={() => {}}
        onToggleActive={() => {}}
        isActive={true}
      />
    );
    expect(wrapper.find('AlignLeft')).to.have.length(1);
    expect(wrapper.find('AlignCenter')).to.have.length(2);
    expect(wrapper.find('AlignRight')).to.have.length(1);
  });

  it('should send an onToggleActive event when the button is clicked', () => {
    const onToggleActive = sinon.spy();
    const wrapper = shallow(
      <Alignment
        onChange={() => {}}
        onToggleActive={onToggleActive}
        isActive={false}
      />
    );
    wrapper.find('AlignCenter').simulate('click');
    expect(onToggleActive.calledOnce).to.be.ok;
    expect(onToggleActive).to.have.been.calledWith(true);
  });

  it('should send an onChange event when one of the alignments is clicked', () => {
    const onChange = sinon.spy();
    const wrapper = shallow(
      <Alignment
        onChange={onChange}
        onToggleActive={() => {}}
        isActive={true}
      />
    );
    wrapper.find('AlignLeft').simulate('click');
    expect(onChange.calledOnce).to.be.ok;
    expect(onChange).to.have.been.calledWith('left');
  });

});