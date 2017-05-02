import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { EditorState } from 'draft-js';
import { Map, fromJS } from 'immutable';
import { flattenHTML } from '../../src/helpers/domHelpers';

import TextAreaInputEditor from '../../src/editors/form-textarea/TextAreaInputEditor';
import TextAreaInputToolbar from '../../src/editors/form-textarea/TextAreaInputToolbar';

describe('Text Input Editor', () => {

  describe('Editor', () => {

    it('should render the existing content by default', () => {
      // Purposely mounting this one to test the full component lifecycle
      const wrapper = mount(
        <TextAreaInputEditor
          isEditing={false}
          onChange={() => {}}
          persistedState={fromJS({
            label: 'Input Text Here'
          })}
          localState={Map()}
          zone={Map()}
        />
      );

      expect(wrapper.find('label')).to.have.length(1);
      expect(wrapper.find('textarea')).to.have.length(1);
    });

    it('should render the Draft Editor when isEditing===true', () => {
      const wrapper = shallow(
        <TextAreaInputEditor
          isEditing={true}
          onChange={() => {}}
          persistedState={fromJS({
            label: 'Input Text Here'
          })}
          localState={Map({
            editorState: EditorState.createEmpty()
          })}
          zone={Map()}
        />
      );
      expect(wrapper.find('DraftEditor')).to.have.length(1);
    });

    it('should render the same HTML as is outputted from generateHTML()', () => {
      const persistedState = Map({
        label: 'Input Some Text',
        placeholder: 'My Placeholder',
        isRequired: true,
        maxLength: 10
      });
      const wrapper = shallow(
        <TextAreaInputEditor
          isEditing={false}
          onChange={() => {}}
          persistedState={persistedState}
          localState={Map({
            editorState: EditorState.createEmpty()
          })}
          zone={Map({
            id: '123'
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
        <TextAreaInputToolbar
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