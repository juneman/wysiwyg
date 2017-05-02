import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { Map } from 'immutable';
import { flattenHTML } from '../../src/helpers/domHelpers';

import VideoEditor from '../../src/editors/video/VideoEditor';
import VideoEditorToolbar from '../../src/editors/video/VideoEditorToolbar';

describe('Video Editor', () => {

  describe('Editor', () => {

    it('should render the existing content by default', () => {
      // Purposely mounting this one to test the full component lifecycle
      const wrapper = mount(
        <VideoEditor
          isEditing={false}
          onChange={() => {}}
          persistedState={Map({
            content: '<p>Sample Text</p>'
          })}
          localState={Map()}
          zone={Map()}
          canvasPosition={Map()}
          zonePosition={Map()}
        />
      );

      expect(wrapper.find('.video-html')).to.have.length(1);
      expect(wrapper.find('.video-html').html()).to.equal('<div class="video-html"><p>Sample Text</p></div>');
    });

    it('should render the same HTML as is outputted from generateHTML()', () => {
      const persistedState = Map({
        content: '<p>Sample Text</p>'
      });
      const wrapper = shallow(
        <VideoEditor
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
        <VideoEditorToolbar
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