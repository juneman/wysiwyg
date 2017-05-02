import React from 'react';
import Italic from '../../src/editor-actions/Italic';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import { EditorState } from 'draft-js';
import { decorator, convertFromHTML, convertToHTML } from '../../src/helpers/draft/convert';

describe('<Italic />', () => {

  it('should set italic in editorState onChange', (done) => {
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
      <Italic
        onChange={(update) => {
          const editorState = update.localState.get('editorState');
          const htmlContent = convertToHTML(editorState);
          expect(htmlContent).to.equal('<p><em>Sample Text</em></p>');
          done();
        }}
        onToggleActive={() => {}}
        isActive={false}
        localState={localState}
        persistedState={persistedState}
      />
    );
    wrapper.instance().handleFormat();
  });

});