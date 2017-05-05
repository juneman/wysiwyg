import React from 'react';
import PropTypes from 'prop-types';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import * as editorActions from './actions/editorActions';

import Canvas from './components/Canvas';

// Reducers
import rows from './reducers/rows';
import editorSelector from './reducers/editorSelector';
import editor from './reducers/editor';

const reducer = combineReducers({
  rows,
  editorSelector,
  editor
});

const finalCreateStore = compose(
  applyMiddleware(
    thunkMiddleware,
  )
)(createStore);

export default class WysiwygEditor extends React.Component {
  constructor(props) {
    super(props);

    // The store is created in the contructor so it's scoped to this instance of the WysiwygEditor
    this.store = finalCreateStore(reducer);
    this.store.dispatch(editorActions.screenResize(window.innerWidth, window.innerHeight));
    window.addEventListener('resize', () => {
      this.store.dispatch(editorActions.screenResize(window.innerWidth, window.innerHeight));
    });
  }
  render() {
    return (
      <Provider store={this.store}>
        <Canvas {...this.props} />
      </Provider>
    );
  }
  closeAll() {
    this.store.dispatch(editorActions.setCloseAll());
  }
}
WysiwygEditor.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  onSave: PropTypes.func,
  rows: PropTypes.array,
  cloudinary: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    uploadUrl: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired
  }),
  aceEditorConfig: PropTypes.object,
  userProperties: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })),
  startEditable: PropTypes.bool,
  closeAll: PropTypes.bool,
  disableAddButton: PropTypes.bool,
  allowedEditorTypes: PropTypes.array,
};