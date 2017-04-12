import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { Map } from 'immutable';

import { flattenHTML } from '../../src/helpers/domHelpers';
import Zone from '../../src/components/Zone';

describe('<Zone />', () => {

  it('should render the underlying editor for the type specified', () => {
    const zone = Map({
      id: '10',
      type: 'RichText'
    });

    const wrapper = shallow(
      <Zone
        zone={zone}
        onSave={() => {}}
        onRemove={() => {}}
        onToggleEditMode={() => {}}
        columnIndex={1}
        isCanvasInEditMode={false}
      />
    );

    expect(wrapper.find('RichTextEditor')).to.have.length(1);
  });

  it('should immediately generate HTML from the underlying editor after mounting', (done) => {
    const zone = Map({
      id: '10',
      type: 'RichText',
      persistedState: Map({
        content: 'My Text'
      })
    });

    mount(
      <Zone
        zone={zone}
        onSave={(updatedZone) => {
          expect(updatedZone.get('html')).to.contain('My Text');
          done();
        }}
        onRemove={() => {}}
        onToggleEditMode={() => {}}
        columnIndex={1}
        isCanvasInEditMode={false}
      />
    );
  });

  it('should take an onSave callback that passes a full HTML render and zone array', (done) => {
    const zone = Map({
      id: '10',
      type: 'RichText'
    });

    const wrapper = shallow(
      <Zone
        zone={zone}
        onSave={(updatedZone) => {
          updatedZone = updatedZone.toJS();
          expect(flattenHTML(updatedZone.html)).to.equal(flattenHTML(`
            <div class="zone-container">
              <div class="zone">
                <div class="content">
                  <strong>test</strong>
                </div>
              </div>
            </div>
          `));
          done();
        }}
        onRemove={() => {}}
        onToggleEditMode={() => {}}
        columnIndex={1}
        isCanvasInEditMode={false}
      />
    );

    wrapper.setState({html: '<strong>test</strong>'});
    wrapper.instance().save();
  });

});
