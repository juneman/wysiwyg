import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { List, fromJS } from 'immutable';
import { expect } from 'chai';
import { mount } from 'enzyme';

import Canvas from '../../src/components/Canvas';

describe('<Canvas />', () => {
  let mockStore;
  let initialState = {
    editor: fromJS({
      screenSize: {},
      canvasPosition: {},
      activeZoneId: null,
      hoverZoneId: null,
      movableRowId: null,
      hoverRowId: null,
      activeEditorAction: null,
      isCanvasInEditMode: false,
      disableAddButton: false,
      draftHtml: '',
      draftPersistedState: {},
      localState: {},
      cloudinary: {},
      userProperties: [],
      allowedEditorTypes: [],
      aceEditorConfig: {},
      sanitizeHtmlConfig: {
        allowedTags: false,
        allowedAttributes: false
      }
    }),
    editorSelector: fromJS({
      isOpen: false,
      menuPosition: {},
      addButtonPosition: {}
    }),
    rows: List()
  };

  beforeEach(() => {
    mockStore = configureStore([thunk]);
  });

  it('should apply any passed in styling to the container', () => {
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Canvas
          style={{
            width: 300,
            height: 100
          }}
        />
      </Provider>
    );
    expect(wrapper.find('.canvas')).to.have.style('height', '100px');
    expect(wrapper.find('.canvas')).to.have.style('width', '300px');
  });

  it('should render a FullAddElement if no rows exist', () => {
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
      <Canvas
      />
      </Provider>
    );
    expect(wrapper.find('.full-add')).to.have.length(1);
    expect(wrapper.find('.add-row')).to.have.length(0);
  });

  it('should render an AddButton if rows do exist', () => {
    const rows = fromJS([{
      id: '20',
      zones: [
        {
          id: '10',
          type: 'RichText',
          persistedState: {}
        }
      ]
    }]);
    initialState.rows = rows;
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
      <Canvas

      />
      </Provider>
    );
    expect(wrapper.find('.full-add')).to.have.length(0);
    expect(wrapper.find('.add-row')).to.have.length(1);
  });

});
