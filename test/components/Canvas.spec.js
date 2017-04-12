import React from 'react';
import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Canvas from '../../src/components/Canvas';

describe('<Canvas />', () => {

  it('should require a height and width as a fixed number', () => {
    const wrapper = shallow(
      <Canvas
        height={100}
        width={300}
      />
    );
    expect(wrapper).to.have.tagName('div');
    expect(wrapper).to.have.style('height', '100px');
    expect(wrapper).to.have.style('width', '300px');
  });

  it('should render a FullAddElement if no rows exist', () => {
    const wrapper = shallow(
      <Canvas
        height={100}
        width={300}
      />
    );
    expect(wrapper.find('FullAddElement')).to.have.length(1);
    expect(wrapper.find('AddButton')).to.have.length(0);
  });

  it('should render an AddButton if rows do exist', () => {
    const rows = [{
      id: '20',
      zones: [
        {
          id: '10',
          type: 'RichText',
          persistedState: {}
        }
      ]
    }];

    const wrapper = shallow(
      <Canvas
        height={100}
        width={300}
        rows={rows}
      />
    );
    expect(wrapper.find('FullAddElement')).to.have.length(0);
    expect(wrapper.find('AddButton')).to.have.length(1);
  });

  it('should take an onSave callback that passes a full HTML render and zone array', () => {
    const wrapper = shallow(
      <Canvas
        height={100}
        width={300}
        onSave={(update) => {
          expect(update.html).to.equal('<div class="canvas"><div class="row">...</div></div>');
        }}
      />
    );

    const row = fromJS({
      id: '20',
      zones: [
        {
          id: '10',
          type: 'RichText',
          persistedState: Map()
        }
      ],
      html: '<div class="row">...</div>'
    });

    wrapper.instance().save(0, row);
  });

  it('should have the ability to add a new blank row', () => {
    const wrapper = shallow(
      <Canvas
        height={100}
        width={300}
      />
    );

    const row = fromJS({
      id: '20',
      zones: [
        {
          id: '10',
          type: 'RichText',
          persistedState: Map()
        }
      ]
    });

    expect(wrapper.find('Row')).to.have.length(0);
    wrapper.instance().addRow(row);
    expect(wrapper.find('Row')).to.have.length(1);
  });

});
