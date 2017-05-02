import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Menu from '../../src/components/Menu';

describe('<Menu />', () => {

  it('should put a light wrapper and render the children', () => {
    const wrapper = shallow(
      <Menu><div className="test"></div></Menu>
    );

    expect(wrapper.find('.test')).to.have.length(1);
  });

});