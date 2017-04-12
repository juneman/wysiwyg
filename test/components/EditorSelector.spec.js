import React from 'react';
import { Map } from 'immutable';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import EditorSelector from '../../src/components/EditorSelector';

describe('<EditorSelector />', () => {

  it('should render a list of editor options', () => {
    const wrapper = shallow(<EditorSelector
      onSelect={() => {}}
      onCancel={() => {}}
      setPosition={Map({
        top: 1,
        bottom: 1,
        left: 1,
        right: 1
      })}
    />);

    expect(wrapper.find('ImageButton')).to.have.length(1);
  });

});