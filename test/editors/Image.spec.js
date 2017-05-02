import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { Map } from 'immutable';
import { flattenHTML } from '../../src/helpers/domHelpers';

import ImageEditor from '../../src/editors/image/ImageEditor';
import ImageToolbar from '../../src/editors/image/ImageToolbar';

describe('Button Editor', () => {

  describe('Editor', () => {

    it('should render the existing content by default', () => {
      // Purposely mounting this one to test the full component lifecycle
      const wrapper = mount(
        <ImageEditor
          isEditing={false}
          onChange={() => {}}
          persistedState={Map({
            url: 'http://sample.org/image.jpg'
          })}
          localState={Map()}
          zone={Map()}
          canvasPosition={Map()}
          zonePosition={Map()}
        />
      );

      expect(wrapper.find('.image')).to.have.length(1);
      expect(wrapper.find('.image').find('img')).to.have.length(1);
      expect(wrapper.find('.image').find('img').prop('src')).to.equal('http://sample.org/image.jpg');
    });

    it('should not render the ImageUploaded if there is a URL, even if isEditing===true', () => {
      const wrapper = shallow(
        <ImageEditor
          isEditing={true}
          onChange={() => {}}
          persistedState={Map({
            url: 'http://sample.org/image.jpg'
          })}
          localState={Map()}
          zone={Map()}
          canvasPosition={Map()}
          zonePosition={Map()}
        />
      );
      expect(wrapper.find('.image')).to.have.length(1);
      expect(wrapper.find('.image').find('img')).to.have.length(1);
      expect(wrapper.find('.image').find('img').prop('src')).to.equal('http://sample.org/image.jpg');
    });

    it('should render the ImageUploader isEditing===true', () => {
      const wrapper = shallow(
        <ImageEditor
          isEditing={true}
          onChange={() => {}}
          persistedState={Map()}
          localState={Map()}
          zone={Map()}
          canvasPosition={Map()}
          zonePosition={Map()}
        />
      );
      expect(wrapper.find('Connect(ImageUploader)')).to.have.length(1);
    });

    it('should render the same HTML as is outputted from generateHTML()', () => {
      const persistedState = Map({
        url: 'http://sample.org/image.jpg'
      });
      const wrapper = shallow(
        <ImageEditor
          isEditing={false}
          onChange={() => {}}
          persistedState={persistedState}
          localState={Map()}
          zone={Map({
            id: '123'
          })}
          canvasPosition={Map()}
          zonePosition={Map({
            width: 100
          })}
        />
      );

      const reactHtml = wrapper.html();
      const generatedHtml = wrapper.instance().generateHTML(persistedState);
      expect(flattenHTML(generatedHtml)).to.equal(flattenHTML(reactHtml));
    });

  });

  describe('Toolbar', () => {

    it('should render a <Menu /> of <Toolbar /> components', () => {

      const wrapper = shallow(
        <ImageToolbar
          localState={Map()}
          persistedState={Map()}
          canvasPosition={Map()}
          onChange={() => {}}
        />
      );

      expect(wrapper.find('Menu')).to.have.length(1);
      expect(wrapper.find('Menu').children()).to.have.length(1);

    });

  });

});