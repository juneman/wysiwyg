import React from 'react';
import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import CanvasWithDrag, { Canvas } from '../../src/components/Canvas';

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

    const type = 'RichText';

    expect(wrapper.state('rows').size).to.equal(0);
    wrapper.instance().addRow(type);
    expect(wrapper.state('rows').size).to.equal(1);
    expect(wrapper.state('rows').get(0).get('zones').get(0).get('type')).to.equal('RichText');
  });

  it('should have the ability to remove an existing row and call onSave()', (done) => {
    const wrapper = shallow(
      <Canvas
        height={100}
        width={300}
        onSave={(update) => {
          expect(update.rows).to.have.length(0);
          done();
        }}
        rows={[
          {
            id: '123',
            zones: []
          }
        ]}
      />
    );

    expect(wrapper.state('rows').size).to.equal(1);
    wrapper.instance().removeRow('123');
    expect(wrapper.state('rows').size).to.equal(0);
  });

  it('should not call onSave if the data has not changed', (done) => {
    mount(
      <CanvasWithDrag
        height={100}
        width={300}
        onSave={() => {
          throw new Error('Should not have called onSave()');
        }}
        rows={[
          {
            id: '123',
            zones: [{
              id: '456',
              type: 'RichText',
              persistedState: {
                content: 'This is some content'
              }
            }]
          }
        ]}
      />
    );

    // Give everything a chance to mount and render
    setTimeout(() => {
      done();
    }, 500);

  });

});
