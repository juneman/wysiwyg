import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { EditorState } from 'draft-js';
import { Map } from 'immutable';
import { flattenHTML } from '../../src/helpers/domHelpers';

import ButtonEditor from '../../src/editors/button/ButtonEditor';
import ButtonToolbar from '../../src/editors/button/ButtonToolbar';

describe('Button Editor', () => {

  describe('Editor', () => {

    it('should render the existing content by default', () => {
      // Purposely mounting this one to test the full component lifecycle
      const wrapper = mount(
        <ButtonEditor
          isEditing={false}
          onChange={() => {}}
          persistedState={Map({
            content: '<p>Sample Text</p>'
          })}
          localState={Map()}
          zone={Map()}
        />
      );

      expect(wrapper.find('.button-wrapper')).to.have.length(1);
      const btn = wrapper.find('.button-wrapper').find('button');
      expect(btn).to.have.length(1);
      expect(btn.find('span')).to.have.length(1);
      expect(btn.find('span').html()).to.equal('<span><p>Sample Text</p></span>');
    });

    it('should render the Draft Editor when isEditing===true', () => {
      const wrapper = shallow(
        <ButtonEditor
          isEditing={true}
          onChange={() => {}}
          persistedState={Map({
            content: '<p>Sample Text</p>'
          })}
          localState={Map({
            editorState: EditorState.createEmpty()
          })}
          zone={Map()}
        />
      );
      expect(wrapper.find('div.btn')).to.have.length(1);
      expect(wrapper.find('DraftEditor')).to.have.length(1);
    });

    it('should add styling passed in from persistedState', () => {
      const wrapper = shallow(
        <ButtonEditor
          isEditing={false}
          onChange={() => {}}
          persistedState={Map({
            content: '<p>Sample Text</p>',
            backgroundColor: '#FF0000'
          })}
          localState={Map()}
          zone={Map()}
        />
      );

      expect(wrapper.find('.button-wrapper')).to.have.length(1);
      expect(wrapper.find('.button-wrapper').find('button')).to.have.style('background-color', '#FF0000');
    });

    it('should render the same HTML as is outputted from generateHTML()', () => {
      const persistedState = Map({
        content: '<p>Sample Text</p>'
      });
      const wrapper = shallow(
        <ButtonEditor
          isEditing={false}
          onChange={() => {}}
          persistedState={persistedState}
          localState={Map()}
          zone={Map({
            id: '123'
          })}
        />
      );

      const reactHtml = wrapper.html();
      const generatedHtml = wrapper.instance().generateHTML(persistedState);
      expect(flattenHTML(generatedHtml)).to.equal(flattenHTML(reactHtml).replace('disabled="" ', ''));
    });

  });

  describe('Toolbar', () => {

    it('should render a <Menu /> of <Toolbar /> components', () => {

      const wrapper = shallow(
        <ButtonToolbar
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