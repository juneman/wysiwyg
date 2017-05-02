import React from 'react';
import Code from '../../src/editor-actions/Code';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import sinon from 'sinon';

describe('<Code />', () => {

  it('should render an AceEditor isActive===true', () => {
    const wrapper = shallow(
      <Code
        onChange={() => {}}
        onToggleActive={() => {}}
        isActive={true}
        localState={Map()}
        persistedState={Map()}
        sanitizeHtmlConfig={Map()}
        aceEditorConfig={Map()}
        title="Testing"
      />
    );
    expect(wrapper.find('ReactAce')).to.have.length(1);
  });

  it('should set each style on instance.state in persistedState onChange', () => {
    const onChange = sinon.spy();
    const persistedState = Map();
    const localState = Map();

    const wrapper = shallow(
      <Code
        onChange={onChange}
        onToggleActive={() => {}}
        isActive={false}
        localState={localState}
        persistedState={persistedState}
        sanitizeHtmlConfig={Map()}
        aceEditorConfig={Map()}
        title="Testing"
      />
    );
    wrapper.instance().setState({content: '<div>Test</div>'});
    wrapper.instance().handleSave();
    expect(onChange).to.have.been.calledWith({
      localState,
      persistedState: persistedState.set('content', '<div>Test</div>')
    });
  });

});