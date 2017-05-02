import React from 'react';
import TextStyle from '../../src/editor-actions/TextStyle';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import { EditorState } from 'draft-js';
import { decorator, convertFromHTML, convertToHTML } from '../../src/helpers/draft/convert';

describe('<TextStyle />', () => {

  it('should set text style in editorState onChange', (done) => {
    let editorState = EditorState
      .createWithContent(
        convertFromHTML('<p>Sample Text</p>'),
        decorator
      );

    editorState = EditorState
      .forceSelection(
        editorState,
        editorState.getSelection().merge({hasFocus: true, anchorOffset: 11, isBackward: true})
      );

    const persistedState = Map();
    const localState = Map({
      editorState: editorState
    });

    const wrapper = shallow(
      <TextStyle
        onChange={(update) => {
          const editorState = update.localState.get('editorState');
          const htmlContent = convertToHTML(editorState);
          expect(htmlContent).to.equal('<h1>Sample Text</h1>');
          done();
        }}
        onToggleActive={() => {}}
        isActive={false}
        localState={localState}
        persistedState={persistedState}
      />
    );
    wrapper.instance().handleFormat('header-one');
  });

});