import React from 'react';
import { Map, List } from 'immutable';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import EditorSelector from '../../src/components/EditorSelector';

describe('<EditorSelector />', () => {

  it('should render a list of editor options', () => {
    const wrapper = shallow(<EditorSelector
      onSelect={() => {}}
      onCancel={() => {}}
      setPosition={Map()}
      canvasPosition={Map()}
      addButtonPosition={Map()}
      screenSize={Map({
        width: 1024,
        height: 768
      })}
      allowedEditorTypes={List()}
    />);

    expect(wrapper.find('ImageButton')).to.have.length(1);
    expect(wrapper.find('.menuItem')).to.have.length.greaterThan(5);
  });

  it('should trim the list of editor options if allowedEditorTypes is passed in', () => {
    const wrapper = shallow(<EditorSelector
      onSelect={() => {}}
      onCancel={() => {}}
      canvasPosition={Map()}
      setPosition={Map()}
      addButtonPosition={Map()}
      screenSize={Map({
        width: 1024,
        height: 768
      })}
      allowedEditorTypes={List(["Text"])}
    />);

    expect(wrapper.find('ImageButton')).to.have.length(0);
    expect(wrapper.find('TextButton')).to.have.length(1);
    expect(wrapper.find('.menuItem')).to.have.length(1);
  });

});