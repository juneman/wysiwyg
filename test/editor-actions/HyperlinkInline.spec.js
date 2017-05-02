import React from 'react';
import HyperlinkInline from '../../src/editor-actions/HyperlinkInline';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import { EditorState } from 'draft-js';
import { decorator, convertFromHTML, convertToHTML } from '../../src/helpers/draft/convert';

describe('<HyperlinkInline />', () => {

  it('should render the <Hyperlink /> component', () => {
    const wrapper = shallow(
      <HyperlinkInline
        onChange={() => {}}
        onToggleActive={() => {}}
        isActive={false}
        localState={Map()}
        persistedState={Map()}
      />
    );
    expect(wrapper.find('Hyperlink')).to.have.length(1);
  });

  it('should set textAlign in editorState onChange', (done) => {
    let initialEditorState = EditorState
      .createWithContent(
        convertFromHTML('<p>Sample Text</p>'),
        decorator
      );

    initialEditorState = EditorState
      .forceSelection(
        initialEditorState,
        initialEditorState.getSelection().merge({hasFocus: true, anchorOffset: 11, isBackward: true})
      );

    const persistedState = Map();
    const localState = Map({
      editorState: initialEditorState
    });

    const wrapper = shallow(
      <HyperlinkInline
        onChange={(update) => {
          const editorState = update.localState.get('editorState');
          const htmlContent = convertToHTML(editorState);
          expect(htmlContent).to.equal('<p><a href="a.com" target="_blank">Sample Text</a></p>');
          done();
        }}
        onToggleActive={() => {}}
        isActive={false}
        localState={localState}
        persistedState={persistedState}
      />
    );
    wrapper.instance().handleLink('a.com', true);
  });

});