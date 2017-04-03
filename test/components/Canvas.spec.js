/* eslint-disable no-unused-vars */
import React, { html } from 'react';
/* eslint-enable no-unused-vars */

import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';

chai.use(chaiEnzyme());

import Canvas from '../../src/components/Canvas';

describe('<Canvas />', () => {

  it('mounts a component with a <div> wrapper', () => {
    const wrapper = shallow(<Canvas />);
    expect(wrapper).to.have.tagName('div');
  });

});
