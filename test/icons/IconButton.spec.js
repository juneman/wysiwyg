import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import IconButton from '../../src/icons/IconButton';
import AddButton from '../../src/icons/AddButton';
import BoldButton from '../../src/icons/BoldButton';
import CancelButton from '../../src/icons/CancelButton';
import DeleteButton from '../../src/icons/DeleteButton';
import EditButton from '../../src/icons/EditButton';
import ImageButton from '../../src/icons/ImageButton';
import ItalicButton from '../../src/icons/ItalicButton';
import MoveVertButton from '../../src/icons/MoveVertButton';
import OkButton from '../../src/icons/OkButton';
import SelectSizeButton from '../../src/icons/SelectSizeButton';
import TextButton from '../../src/icons/TextButton';
import UnderlineButton from '../../src/icons/UnderlineButton';

describe('<IconButton />', () => {

  it('should render an svg and title', () => {

    const wrapper = shallow(<IconButton
      title="add"
      pathNode={
        <path d="M18.984 12.984h-6v6h-1.969v-6h-6v-1.969h6v-6h1.969v6h6v1.969z"></path>
      }
    />);

    expect(wrapper.find('svg')).to.have.length(1);
    expect(wrapper.find('svg').find('title').text()).to.equal('add');

  });

  it('should render all icons that wrap the IconButton', () => {

    const buttonNodes = [
      AddButton,
      BoldButton,
      CancelButton,
      DeleteButton,
      EditButton,
      ImageButton,
      ItalicButton,
      MoveVertButton,
      OkButton,
      SelectSizeButton,
      TextButton,
      UnderlineButton
    ];

    buttonNodes.forEach((Button) => {
      const wrapper = shallow(<Button />);
      expect(wrapper.find('IconButton')).to.have.length(1);
    });

  });

});