import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { EditorState } from 'draft-js';
import { Map } from 'immutable';
import { flattenHTML } from '../../src/helpers/domHelpers';

import RichTextEditor from '../../src/editors/richtext/RichTextEditor';
import RichTextToolbar from '../../src/editors/richtext/RichTextToolbar';

describe('Button Editor', () => {

  describe('Editor', () => {

    it('should render the existing content by default', () => {
      // Purposely mounting this one to test the full component lifecycle
      const wrapper = mount(
        <RichTextEditor
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

      expect(wrapper.find('.rich-text')).to.have.length(1);
    });

    it('should render the Draft Editor when isEditing===true', () => {
      const wrapper = shallow(
        <RichTextEditor
          isEditing={true}
          onChange={() => {}}
          persistedState={Map({
            content: '<p>Sample Text</p>'
          })}
          localState={Map({
            editorState: EditorState.createEmpty()
          })}
          zone={Map()}
          canvasPosition={Map()}
          zonePosition={Map()}
        />
      );
      expect(wrapper.find('DraftEditor')).to.have.length(1);
    });

    it('should render the same HTML as is outputted from generateHTML()', () => {
      const persistedState = Map({
        content: '<p>Sample Text</p>'
      });
      const wrapper = shallow(
        <RichTextEditor
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
        <RichTextToolbar
          localState={Map()}
          persistedState={Map()}
          onChange={() => {}}
        />
      );

      expect(wrapper.find('Menu')).to.have.length(1);
      expect(wrapper.find('Menu').children()).to.have.length(1);

    });

  });

});