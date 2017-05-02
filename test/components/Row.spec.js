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
          persistedState: {}
        },
        {
          id: '11',
          type: 'RichText',
          persistedState: {}
        }
      ])
    });

    const wrapper = shallow(
      <Row
        row={row}
        isDragging={false}
        isMovable={false}
        showMoveButton={false}
      />
    );
    expect(wrapper.find('.row')).to.have.length(1);
    expect(wrapper.find('.row').children()).to.have.length(2);
  });

});
