import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

import Canvas from '../../src/components/Canvas';
import AddButton from '../../src/components/AddButton';
import SvgIcons from '../../src/components/SvgIcons';

describe('<Canvas />', () => {

  describe('Basic Rendering', () => {

    it('mounts a component with a <div> wrapper', () => {
      const wrapper = shallow(<Canvas />);
      expect(wrapper).to.have.tagName('div');
    });

    it('should accept a height and width', () => {
      const wrapper = shallow(
        <Canvas
          height="100%"
          width="300px"
        />
      );
      expect(wrapper).to.have.tagName('div');
      expect(wrapper).to.have.style('height', '100%');
      expect(wrapper).to.have.style('width', '300px');
    });

    it('should render the <SvgIcons /> node at the end of the container', () => {
      const wrapper = shallow(<Canvas />);
      expect(wrapper.find('div').children().last()).to.contain(<SvgIcons />);
    });

    it('should render a <AddButton /> node to add a new zone at the top if no data exists', () => {
      const wrapper = shallow(<Canvas />);
      expect(wrapper.find('div').children().first()).to.contain(<AddButton />);
    });

    it('should take an onSave callback that passes a full HTML render and zone array', () => {
      const wrapper = shallow(
        <Canvas
          onSave={(result) => {
            expect(result.html).to.equal('<div class="canvas"><div class="row">...</div></div>');
          }}
        />
      );

      wrapper.instance().save(0, {
        id: '10',
        html: '<div class="row">...</div>'
      });
    });

  });

  describe('Adding New Rows', () => {

    it('should add a new row if the user clicks the Add button', () => {
      const wrapper = mount(<Canvas />);
      wrapper.find('#addBtn').simulate('click');
      expect(wrapper.find('Row')).to.have.length(1);
    });

  });

});
