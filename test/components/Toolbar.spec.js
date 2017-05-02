import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { fromJS, List, Map } from 'immutable';

import Toolbar from '../../src/components/Toolbar';
import Bold from '../../src/editor-actions/Bold';

describe('<Toolbar />', () => {
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

  it('should put a light wrapper and render the passed in editor actions', () => {
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Toolbar
          localState={Map()}
          persistedState={Map()}
          onChange={() => {}}
          actions={[
            {
              Component: Bold,
              name: 'bold' 
            }
          ]}
        />
      </Provider>
    );

    expect(wrapper.find('svg')).to.have.length(1);
  });

});