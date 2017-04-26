import React from 'react';
import PropTypes from 'prop-types';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

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

const finalCreateStore = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware,
  )
)(createStore);

const store = finalCreateStore(reducer);

export default class WysiwygEditor extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Canvas {...this.props} />
      </Provider>
    );
  }
}
WysiwygEditor.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onSave: PropTypes.func,
  rows: PropTypes.array,
  cloudinary: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    uploadUrl: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired
  }),
  userProperties: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }))
};