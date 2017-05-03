'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.Toolbar = Toolbar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _immutable = require('immutable');

var _editorActions = require('../actions/editorActions');

var editorActions = _interopRequireWildcard(_editorActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A React component renders a grid of toolbar actions
 * such as Bold, Italic, etc.
 * @class
 */
function Toolbar(props) {
  var localState = props.localState,
      persistedState = props.persistedState,
      onChange = props.onChange,
      actions = props.actions,
      selectedAction = props.selectedAction,
      dispatch = props.dispatch,
      cloudinary = props.cloudinary,
      userProperties = props.userProperties,
      sanitizeHtmlConfig = props.sanitizeHtmlConfig;


  var vertLine = {
    width: 1,
    height: 24,
    borderLeft: '1px solid #808080'
  };
  var lineContainer = {
    paddingTop: 6,
    paddingLeft: 3
  };

  return _react2.default.createElement(
    'div',
    { style: { display: 'grid' } },
    actions.map(function (editorAction, index) {
      if (editorAction.separator) {
        return _react2.default.createElement(
          'div',
          { key: 'separator-' + index, style: { gridColumn: index + 1, gridRow: 1, textAlign: 'center', width: 7 } },
          _react2.default.createElement(
            'div',
            { style: lineContainer },
            _react2.default.createElement('div', { style: vertLine })
          )
        );
      }
      var toolbarProps = {
        localState: localState,
        persistedState: persistedState,
        onChange: onChange,
        cloudinary: cloudinary,
        userProperties: userProperties,
        sanitizeHtmlConfig: sanitizeHtmlConfig,
        isActive: selectedAction === editorAction.name,
        onToggleActive: function onToggleActive(isActive) {
          dispatch(editorActions.toggleEditorAction(editorAction.name, isActive));
        }
      };
      return _react2.default.createElement(
        'div',
        { key: editorAction.name, style: { gridColumn: index + 1, gridRow: 1 } },
        _react2.default.createElement(editorAction.Component, _extends({}, editorAction.props, toolbarProps))
      );
    })
  );
}
Toolbar.propTypes = {
  dispatch: _propTypes2.default.func.isRequired,
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  onChange: _propTypes2.default.func.isRequired,
  actions: _propTypes2.default.array.isRequired,
  cloudinary: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  userProperties: _propTypes2.default.instanceOf(_immutable.List).isRequired,
  selectedAction: _propTypes2.default.string,
  sanitizeHtmlConfig: _propTypes2.default.instanceOf(_immutable.Map).isRequired
};

function mapStateToProps(state) {
  return {
    selectedAction: state.editor.get('activeEditorAction'),
    cloudinary: state.editor.get('cloudinary'),
    userProperties: state.editor.get('userProperties'),
    sanitizeHtmlConfig: state.editor.get('sanitizeHtmlConfig')
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Toolbar);