'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WysiwygEditor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _editorActions = require('./actions/editorActions');

var editorActions = _interopRequireWildcard(_editorActions);

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _Canvas = require('./components/Canvas');

var _Canvas2 = _interopRequireDefault(_Canvas);

var _rows = require('./reducers/rows');

var _rows2 = _interopRequireDefault(_rows);

var _editorSelector = require('./reducers/editorSelector');

var _editorSelector2 = _interopRequireDefault(_editorSelector);

var _editor = require('./reducers/editor');

var _editor2 = _interopRequireDefault(_editor);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Reducers


var reducer = (0, _redux.combineReducers)({
  rows: _rows2.default,
  editorSelector: _editorSelector2.default,
  editor: _editor2.default
});

var finalCreateStore = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default))(_redux.createStore);

var WysiwygEditor = exports.WysiwygEditor = function (_React$Component) {
  _inherits(WysiwygEditor, _React$Component);

  function WysiwygEditor(props) {
    _classCallCheck(this, WysiwygEditor);

    // The store is created in the contructor so it's scoped to this instance of the WysiwygEditor
    var _this = _possibleConstructorReturn(this, (WysiwygEditor.__proto__ || Object.getPrototypeOf(WysiwygEditor)).call(this, props));

    _this.store = finalCreateStore(reducer);
    _this.store.dispatch(editorActions.screenResize(window.innerWidth, window.innerHeight));
    window.addEventListener('resize', function () {
      _this.store.dispatch(editorActions.screenResize(window.innerWidth, window.innerHeight));
    });
    return _this;
  }

  _createClass(WysiwygEditor, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: this.store },
        _react2.default.createElement(_Canvas2.default, this.props)
      );
    }
  }, {
    key: 'closeAll',
    value: function closeAll() {
      this.store.dispatch(editorActions.setCloseAll());
    }
  }]);

  return WysiwygEditor;
}(_react2.default.Component);

WysiwygEditor.propTypes = {
  height: _propTypes2.default.number,
  width: _propTypes2.default.number,
  onSave: _propTypes2.default.func,
  rows: _propTypes2.default.array,
  cloudinary: _propTypes2.default.shape({
    accountId: _propTypes2.default.string.isRequired,
    userId: _propTypes2.default.string.isRequired,
    uploadUrl: _propTypes2.default.string.isRequired,
    apiKey: _propTypes2.default.string.isRequired
  }),
  aceEditorConfig: _propTypes2.default.object,
  userProperties: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    name: _propTypes2.default.string.isRequired,
    value: _propTypes2.default.string.isRequired
  })),
  startEditable: _propTypes2.default.bool,
  closeAll: _propTypes2.default.bool,
  disableAddButton: _propTypes2.default.bool,
  allowedEditorTypes: _propTypes2.default.array,
  maxRows: _propTypes2.default.number
};

exports.default = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(WysiwygEditor);