import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import Zone from '../../src/components/Zone';

const mockEvent = {
  preventDefault: function() {}
};

describe('<Zone />', () => {

  it.skip('should render an editor selector if active', () => {
    const wrapper = mount(
      <Zone
        id='10'
        onSave={() => {}}
        content='Sample Content'
        column={1}
      />
    );
    expect(wrapper.find('.editor-selector')).to.have.length(0);
    wrapper.instance().toggleEditMode(mockEvent);
    expect(wrapper.find('.editor-selector')).to.have.length(1);
  });

  it.skip('should go back to rendering the content if cancelled', () => {
    const wrapper = shallow(
      <Zone
        id='10'
        onSave={() => {}}
        content='Sample Content'
        column={1}
      />
    );
    expect(wrapper.find('.editor-selector')).to.have.length(0);
    wrapper.instance().toggleEditMode(mockEvent);
    expect(wrapper.find('.editor-selector')).to.have.length(1);
    wrapper.instance().cancel(mockEvent);
    expect(wrapper.find('.editor-selector')).to.have.length(0);
  });

  it.skip('should revert any content changes if cancelled', () => {
    const wrapper = shallow(
      <Zone
        id='10'
        onSave={() => {}}
        content='Sample Content'
        column={1}
      />
    );
    expect(wrapper.find('.editor-selector')).to.have.length(0);
    wrapper.instance().toggleEditMode(mockEvent);
    expect(wrapper.find('.editor-selector')).to.have.length(1);
    wrapper.instance().cancel(mockEvent);
    expect(wrapper.find('.editor-selector')).to.have.length(0);
  });

  it('should take an onSave callback that passes a full HTML render and zone array', () => {
    const wrapper = shallow(
      <Zone
        id='10'
        content='Sample Content'
        type='PlainText'
        column={1}
        onSave={(result) => {
          const trimmedHtml = result.html
            .replace(/ {2}/g, '')
            .replace(/(\r\n|\r|\n)/g, '');
          expect(trimmedHtml).to.equal('<div class="zone-container"><div class="zone"><div class="content">Sample Content</div></div></div>');
        }}
      />
    );

    wrapper.instance().saveDraft({
      content: 'Sample Content',
      html: 'Sample Content'
    });
    wrapper.instance().save(mockEvent);
  });

  it('should save draft state of the component', () => {
    const wrapper = shallow(
      <Zone
        id='10'
        content='Sample Content'
        column={1}
        onSave={(result) => {
          const trimmedHtml = result.html
            .replace(/ {2}/g, '')
            .replace(/(\r\n|\r|\n)/g, '');
          expect(trimmedHtml).to.equal('<div class="zone-container"><div class="zone"><div class="content">More Content</div></div></div>');
        }}
      />
    );

    wrapper.instance().saveDraft({
      content: 'More Content',
      html: 'More Content'
    });
    wrapper.instance().save(mockEvent);
  });

  describe('Rendering Editors', () => {

    it('should render a PlainText editor', () => {
      const wrapper = shallow(
        <Zone
          id='10'
          onSave={() => {}}
          content='Sample Content'
          column={1}
        />
      );
      wrapper.instance().setType(mockEvent, 'PlainText');
      setTimeout(() => {
        expect(wrapper.find('PlainText')).to.have.length(1);
      });
    });

    it('should render a Button editor', () => {
      const wrapper = shallow(
        <Zone
          id='10'
          onSave={() => {}}
          content='Sample Content'
          column={1}
        />
      );
      wrapper.instance().setType(mockEvent, 'Button');
      setTimeout(() => {
        expect(wrapper.find('Button')).to.have.length(1);
      });
    });

  });

});
