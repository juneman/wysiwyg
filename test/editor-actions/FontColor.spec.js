import React from 'react';
import FontColor from '../../src/editor-actions/FontColor';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import { EditorState } from 'draft-js';
import { decorator, convertFromHTML, convertToHTML } from '../../src/helpers/draft/convert';

describe('<FontColor />', () => {

  it('should set the font color in editorState onChange', (done) => {
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
      <FontColor
        onChange={(update) => {
          const editorState = update.localState.get('editorState');
          const htmlContent = convertToHTML(editorState);
          expect(htmlContent).to.equal('<p><span style="color:#FF0000;">Sample Text</span></p>');
          done();
        }}
        onToggleActive={() => {}}
        isActive={false}
        localState={localState}
        persistedState={persistedState}
      />
    );
    wrapper.instance().handleColor({
      hex: '#FF0000'
    });
  });

});