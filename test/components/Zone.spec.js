import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map, List } from 'immutable';

import { Zone } from '../../src/components/Zone';

describe('<Zone />', () => {

  it('should render the underlying editor for the type specified', () => {
    const zone = Map({
      id: '10',
      type: 'RichText'
    });

    const wrapper = shallow(
      <Zone
        zone={zone}
        dispatch={() => {}}
        row={Map()}
        columnIndex={1}
        canvasPosition={Map({})}
        rowPosition={Map({})}
        localState={Map({})}
        persistedState={Map({})}
        html=""
        isEditing={false}
        isHover={false}
        disableAddButton={false}
        userProperties={List()}
        cloudinary={Map()}
      />
    );

    expect(wrapper.find('RichTextEditor')).to.have.length(1);
  });

});
