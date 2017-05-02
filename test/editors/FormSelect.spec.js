import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { EditorState } from 'draft-js';
import { Map, fromJS } from 'immutable';
import { flattenHTML } from '../../src/helpers/domHelpers';

import SelectionEditor from '../../src/editors/form-select/SelectionEditor';
import SelectionToolbar from '../../src/editors/form-select/SelectionToolbar';

describe('Selection Editor', () => {

  describe('Editor', () => {

    it('should render the existing content by default', () => {
      // Purposely mounting this one to test the full component lifecycle
      const wrapper = mount(
        <SelectionEditor
          isEditing={false}
          onChange={() => {}}
          persistedState={fromJS({
            options: ['one', 'two']
          })}
          localState={Map()}
          zone={Map()}
        />
      );

      expect(wrapper.find('label')).to.have.length(3);
      expect(wrapper.find('input')).to.have.length(2);
    });

    it('should render the Draft Editor when isEditing===true', () => {
      const wrapper = shallow(
        <SelectionEditor
          isEditing={true}
          onChange={() => {}}
          persistedState={fromJS({
            options: ['one', 'two']
          })}
          localState={Map({
            editorState: EditorState.createEmpty()
          })}
          zone={Map()}
        />
      );
      expect(wrapper.find('DraftEditor')).to.have.length(1);
    });

    it('should render a <textarea> for inputting options when isEditing===true', () => {
      const wrapper = shallow(
        <SelectionEditor
          isEditing={true}
          onChange={() => {}}
          persistedState={fromJS({
            options: ['one', 'two']
          })}
          localState={Map({
            editorState: EditorState.createEmpty()
          })}
          zone={Map()}
        />
      );
      expect(wrapper.find('textarea')).to.have.length(1);
    });

    it('should render the same HTML as is outputted from generateHTML() with radio buttons', () => {
      const persistedState = Map({
        label: 'Select One',
        options: ['one', 'two']
      });
      const wrapper = shallow(
        <SelectionEditor
          isEditing={false}
          onChange={() => {}}
          persistedState={persistedState}
          localState={Map({
            editorState: EditorState.createEmpty()
          })}
          zone={Map()}
        />
      );

      const reactHtml = wrapper.html();
      const generatedHtml = wrapper.instance().generateHTML(persistedState);
      expect(flattenHTML(generatedHtml)).to.equal(flattenHTML(reactHtml));
    });

    it('should render the same HTML as is outputted from generateHTML() with a dropdown', () => {
      const persistedState = Map({
        label: 'Select One',
        options: ['one', 'two'],
        fieldType: 'dropdown',
        isRequired: true
      });
      const wrapper = shallow(
        <SelectionEditor
          isEditing={false}
          onChange={() => {}}
          persistedState={persistedState}
          localState={Map({
            editorState: EditorState.createEmpty()
          })}
          zone={Map()}
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
        <SelectionToolbar
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