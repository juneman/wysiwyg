import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Row from '../../src/components/Row';

describe('<Row />', () => {

  it('should render an array of zones', () => {
    const wrapper = shallow(
      <Row
        id='10'
        zones={[
          {
            id: '1'
          }
        ]}
        onSave={() => {}}
      />
    );
    expect(wrapper.find('Zone')).to.have.length(1);
  });

  it('should take an onSave callback that passes a full HTML render and zone array', () => {
    const wrapper = shallow(
      <Row
        id='1'
        zones={[
          {
            id: '1'
          }
        ]}
        onSave={(result) => {
          expect(result.zones).to.have.length(1);
          expect(result.zones[0]).to.have.property('id', '10');
          expect(result.html).to.equal('<div class="row"><div class="zone"></div></div>');
        }}
      />
    );

    const updatedZone = {
      id: '10',
      html: '<div class="zone"></div>'
    };

    wrapper.instance().save(0, updatedZone);
  });

});
