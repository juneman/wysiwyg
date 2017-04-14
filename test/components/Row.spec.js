import React from 'react';
import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Row } from '../../src/components/Row';

describe('<Row />', () => {

  it('should render an array of zones', () => {
    const row = Map({
      zones: fromJS([
        {
          id: '10',
          type: 'RichText',
          persistedState: Map()
        }
      ])
    });

    const wrapper = shallow(
      <Row
        row={row}
        onSave={() => {}}
        onRemoveRow={() => {}}
        onToggleEditMode={() => {}}
        isCanvasInEditMode={false}
      />
    );
    expect(wrapper.find('Zone')).to.have.length(1);
  });

  it('should take an onSave callback that passes a full HTML render and zone array', () => {
    const row = fromJS({
      zones: [
        {
          id: '10',
          type: 'RichText',
          persistedState: Map()
        }
      ]
    });

    const wrapper = shallow(
      <Row
        row={row}
        onRemoveRow={() => {}}
        onToggleEditMode={() => {}}
        isCanvasInEditMode={false}
        onSave={(updatedRow) => {
          updatedRow = updatedRow.toJS();
          expect(updatedRow.zones).to.have.length(1);
          expect(updatedRow.zones[0]).to.have.property('id', '10');
          expect(updatedRow.html).to.equal('<div class="row"><div class="zone"></div></div>');
        }}
      />
    );

    const updatedZone = Map({
      id: '10',
      html: '<div class="zone"></div>'
    });

    wrapper.instance().save(0, updatedZone);
  });

});
