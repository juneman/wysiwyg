import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import IconButton from '../../src/icons/IconButton';


import ActionButton from '../../src/icons/ActionButton';
import AddButton from '../../src/icons/AddButton';
import AdvancedStylingButton from '../../src/icons/AdvancedStylingButton';
import AlignCenter from '../../src/icons/AlignCenter';
import AlignLeft from '../../src/icons/AlignLeft';
import AlignRight from '../../src/icons/AlignRight';
import BoldButton from '../../src/icons/BoldButton';
import ButtonButton from '../../src/icons/ButtonButton';
import CancelButton from '../../src/icons/CancelButton';
import CodeButton from '../../src/icons/CodeButton';
import DeleteButton from '../../src/icons/DeleteButton';
import EditButton from '../../src/icons/EditButton';
import FileUploadButton from '../../src/icons/FileUploadButton';
import FontColorButton from '../../src/icons/FontColorButton';
import FontStyleButton from '../../src/icons/FontStyleButton';
import FormButton from '../../src/icons/FormButton';
import FormCheckboxButton from '../../src/icons/FormCheckboxButton';
import FormDropdownButton from '../../src/icons/FormDropdownButton';
import FormRadioButton from '../../src/icons/FormRadioButton';
import FormRatingButton from '../../src/icons/FormRatingButton';
import FormTextInputButton from '../../src/icons/FormTextInputButton';
import HeroButton from '../../src/icons/HeroButton';
import ImageButton from '../../src/icons/ImageButton';
import ItalicButton from '../../src/icons/ItalicButton';
import LinkButton from '../../src/icons/LinkButton';
import ListBullet from '../../src/icons/ListBullet';
import ListNumbered from '../../src/icons/ListNumbered';
import MoveVertButton from '../../src/icons/MoveVertButton';
import OkButton from '../../src/icons/OkButton';
import PrevNextButton from '../../src/icons/PrevNextButton';
import SelectSizeButton from '../../src/icons/SelectSizeButton';
import SettingsButton from '../../src/icons/SettingsButton';
import SquareButton from '../../src/icons/SquareButton';
import TextButton from '../../src/icons/TextButton';
import UserPropertyButton from '../../src/icons/UserPropertyButton';
import VerticalLine from '../../src/icons/VerticalLine';
import VideoButton from '../../src/icons/VideoButton';

describe('<IconButton />', () => {

  it('should render an svg and title', () => {

    const wrapper = shallow(<IconButton
      title="add"
      pathNode={
        <path d="M18.984 12.984h-6v6h-1.969v-6h-6v-1.969h6v-6h1.969v6h6v1.969z"></path>
      }
      viewBox="0 0 28 28"
    />);

    expect(wrapper.find('svg')).to.have.length(1);
    expect(wrapper.find('svg').find('title').text()).to.equal('add');

  });

  it('should render all icons that wrap the IconButton', () => {

    const buttonNodes = [
      ActionButton,
      AddButton,
      AdvancedStylingButton,
      AlignCenter,
      AlignLeft,
      AlignRight,
      BoldButton,
      ButtonButton,
      CancelButton,
      CodeButton,
      DeleteButton,
      EditButton,
      FileUploadButton,
      FontColorButton,
      FontStyleButton,
      FormButton,
      FormCheckboxButton,
      FormDropdownButton,
      FormRadioButton,
      FormRadioButton,
      FormRatingButton,
      FormTextInputButton,
      HeroButton,
      ImageButton,
      ItalicButton,
      LinkButton,
      ListBullet,
      ListNumbered,
      MoveVertButton,
      OkButton,
      PrevNextButton,
      SelectSizeButton,
      SettingsButton,
      SquareButton,
      TextButton,
      UserPropertyButton,
      VerticalLine,
      VideoButton
    ];

    buttonNodes.forEach((Button) => {
      const wrapper = shallow(<Button />);
      expect(wrapper.find('IconButton')).to.have.length(1);
    });

  });

});