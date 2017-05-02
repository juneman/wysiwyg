import React from 'react';
import UserProperty from '../../src/editor-actions/UserProperty';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map, fromJS } from 'immutable';
import { EditorState } from 'draft-js';
import { decorator, convertFromHTML, convertToHTML } from '../../src/helpers/draft/convert';

describe('<UserProperty />', () => {

  it('should render a list of options when isActive===true', () => {
    const wrapper = shallow(
      <UserProperty
        onChange={() => {}}
        onToggleActive={() => {}}
        isActive={true}
        localState={Map()}
        persistedState={Map()}
        userProperties={fromJS([{
          name: 'First Name',
          value: '{{firstName}}'
        }])}
      />
    );
    expect(wrapper.find('option')).to.have.length(2); // Select... is the first
  });

  it('should set buttonAction in persistedState onChange', (done) => {
    let editorState = EditorState
      .createWithContent(
        convertFromHTML('<p>Sample Text</p>'),
        decorator
      );
    const persistedState = Map();
    const localState = Map({
      editorState
    });

    const wrapper = shallow(
      <UserProperty
        onChange={(update) => {
          const editorState = update.localState.get('editorState');
          const htmlContent = convertToHTML(editorState);
          expect(htmlContent).to.equal('<p>{{firstName}}Sample Text</p>');
          done();
        }}
        onToggleActive={() => {}}
        isActive={false}
        localState={localState}
        persistedState={persistedState}
        userProperties={fromJS([{
          name: 'First Name',
          value: '{{firstName}}'
        }])}
      />
    );
    wrapper.instance().handleSetValue('{{firstName}}');
  });

});