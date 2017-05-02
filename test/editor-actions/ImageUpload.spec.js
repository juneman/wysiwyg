import React from 'react';
import ImageUpload from '../../src/editor-actions/ImageUpload';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import sinon from 'sinon';

describe('<ImageUpload />', () => {

  it('should only render the button when isActive===false', () => {
    const wrapper = shallow(
      <ImageUpload
        onChange={() => {}}
        onToggleActive={() => {}}
        isActive={false}
        localState={Map()}
        persistedState={Map()}
      />
    );
    expect(wrapper.find('FileUploadButton')).to.have.length(1);
  });

  it('should set backroundColor in persistedState onChange', () => {
    const onChange = sinon.spy();
    const persistedState = Map({
      width: 200,
      height: 300
    });
    const localState = Map();

    const wrapper = shallow(
      <ImageUpload
        onChange={onChange}
        onToggleActive={() => {}}
        isActive={false}
        localState={localState}
        persistedState={persistedState}
      />
    );
    wrapper.instance().handleUpload({
      url: 'a.com',
      width: 200,
      height: 300
    });
    expect(onChange).to.have.been.calledWith({
      localState,
      persistedState: persistedState
        .set('url', 'a.com')
        .set('width', 200)
        .set('height', 300)
    });
  });

});