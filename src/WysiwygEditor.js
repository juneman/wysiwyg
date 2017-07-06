import React from 'react';
import PropTypes from 'prop-types';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import * as editorActions from './actions/editorActions';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Iterable } from 'immutable';

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

function transformImmutableStateToJS (state) {
  let midState = {};
  let newState = {};

  for (var i of Object.keys(state)) {
    if (Iterable.isIterable(state[i])) {
      midState[i] = state[i].toJS();
    } else {
      midState[i] = state[i];
    }


    if ((typeof midState[i] === "object") && (midState[i] !== null)) {
      newState[i] = {};
      for (var j of Object.keys(midState[i])) {
        if (Iterable.isIterable(midState[i][j])) {
          newState[i][j] = midState[i][j].toJS();
        } else {
          newState[i][j] = midState[i][j];
        }
      }
    } else {
      newState[i] = midState[i];
    }
  }

  return newState;
}

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: false,
  actionTransformer: transformImmutableStateToJS,
  stateTransformer: transformImmutableStateToJS
});

const middleware = [thunkMiddleware];

if (process.env.NODE_ENV == 'development') { middleware.push(loggerMiddleware); }

const finalCreateStore = compose(
  applyMiddleware(
    ...middleware
  )
)(createStore);

export class WysiwygEditor extends React.Component {
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
  height: PropTypes.string,
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
  maxRows: PropTypes.number
};

export default DragDropContext(HTML5Backend)(WysiwygEditor);
