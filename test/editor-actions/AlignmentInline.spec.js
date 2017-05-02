import React from 'react';
import AlignmentInline from '../../src/editor-actions/AlignmentInline';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import { EditorState } from 'draft-js';
import { decorator, convertFromHTML, convertToHTML } from '../../src/helpers/draft/convert';

describe('<AlignmentInline />', () => {

  it('should render the <Alignment /> component', () => {
    const wrapper = shallow(
      <AlignmentInline
        onChange={() => {}}
        onToggleActive={() => {}}
        isActive={false}
        localState={Map()}
        persistedState={Map()}
      />
    );
    expect(wrapper.find('Alignment')).to.have.length(1);
  });

  it('should set textAlign in editorState onChange', (done) => {
    const initialEditorState = EditorState
      .createWithContent(
        convertFromHTML('<p>Sample Text</p>'),
        decorator
      );
    const persistedState = Map();
    const localState = Map({
      editorState: initialEditorState
    });

    const wrapper = shallow(
      <AlignmentInline
        onChange={(update) => {
          const editorState = update.localState.get('editorState');
          const htmlContent = convertToHTML(editorState);
          expect(htmlContent).to.equal('<div style="text-align:right;">Sample Text</div>');
          done();
        }}
        onToggleActive={() => {}}
        isActive={false}
        localState={localState}
        persistedState={persistedState}
      />
    );
    wrapper.instance().handleAlignment('right');
  });

});