'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Zone = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _reactRedux = require('react-redux');

var _domHelpers = require('../helpers/domHelpers');

var _rowActions = require('../actions/rowActions');

var rowActions = _interopRequireWildcard(_rowActions);

var _editorActions = require('../actions/editorActions');

var editorActions = _interopRequireWildcard(_editorActions);

var _RichTextEditor = require('../editors/richtext/RichTextEditor');

var _RichTextEditor2 = _interopRequireDefault(_RichTextEditor);

var _RichTextToolbar = require('../editors/richtext/RichTextToolbar');

var _RichTextToolbar2 = _interopRequireDefault(_RichTextToolbar);

var _ImageEditor = require('../editors/image/ImageEditor');

var _ImageEditor2 = _interopRequireDefault(_ImageEditor);

var _ImageToolbar = require('../editors/image/ImageToolbar');

var _ImageToolbar2 = _interopRequireDefault(_ImageToolbar);

var _ButtonEditor = require('../editors/button/ButtonEditor');

var _ButtonEditor2 = _interopRequireDefault(_ButtonEditor);

var _ButtonToolbar = require('../editors/button/ButtonToolbar');

var _ButtonToolbar2 = _interopRequireDefault(_ButtonToolbar);

var _HtmlEditor = require('../editors/html/HtmlEditor');

var _HtmlEditor2 = _interopRequireDefault(_HtmlEditor);

var _HtmlEditorToolbar = require('../editors/html/HtmlEditorToolbar');

var _HtmlEditorToolbar2 = _interopRequireDefault(_HtmlEditorToolbar);

var _VideoEditor = require('../editors/video/VideoEditor');

var _VideoEditor2 = _interopRequireDefault(_VideoEditor);

var _VideoEditorToolbar = require('../editors/video/VideoEditorToolbar');

var _VideoEditorToolbar2 = _interopRequireDefault(_VideoEditorToolbar);

var _HeroEditor = require('../editors/hero/HeroEditor');

var _HeroEditor2 = _interopRequireDefault(_HeroEditor);

var _HeroToolbar = require('../editors/hero/HeroToolbar');

var _HeroToolbar2 = _interopRequireDefault(_HeroToolbar);

var _TextInputEditor = require('../editors/form-text/TextInputEditor');

var _TextInputEditor2 = _interopRequireDefault(_TextInputEditor);

var _TextInputToolbar = require('../editors/form-text/TextInputToolbar');

var _TextInputToolbar2 = _interopRequireDefault(_TextInputToolbar);

var _TextAreaInputEditor = require('../editors/form-textarea/TextAreaInputEditor');

var _TextAreaInputEditor2 = _interopRequireDefault(_TextAreaInputEditor);

var _TextAreaInputToolbar = require('../editors/form-textarea/TextAreaInputToolbar');

var _TextAreaInputToolbar2 = _interopRequireDefault(_TextAreaInputToolbar);

var _SelectionEditor = require('../editors/form-select/SelectionEditor');

var _SelectionEditor2 = _interopRequireDefault(_SelectionEditor);

var _SelectionToolbar = require('../editors/form-select/SelectionToolbar');

var _SelectionToolbar2 = _interopRequireDefault(_SelectionToolbar);

var _EditorWrapper = require('./EditorWrapper');

var _EditorWrapper2 = _interopRequireDefault(_EditorWrapper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A React component that holds the rendered content
 * or an editable area if the Zone is active
 * @class
 */
var Zone = exports.Zone = function (_React$Component) {
  _inherits(Zone, _React$Component);

  function Zone(props) {
    _classCallCheck(this, Zone);

    var _this = _possibleConstructorReturn(this, (Zone.__proto__ || Object.getPrototypeOf(Zone)).call(this, props));

    _this.state = {
      position: (0, _immutable.Map)()
    };

    _this.baseHoverStateStyle = {
      border: '2px dotted #f4ad42'
    };
    _this.baseActiveStateStyle = {
      border: '2px dotted #008800'
    };
    _this.containerStyle = {
      width: '99%',
      margin: '0 auto 3px auto'
    };
    _this.zoneStyle = {
      border: '2px solid #FFFFFF'
    };
    return _this;
  }

  _createClass(Zone, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Force the underlying editor component to resave/regenerate the HTML with the old data
      if (this.activeEditor) {
        this.save();
      }
      this.setBoundingBox();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.setBoundingBox();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var position = this.state.position;
      var _props = this.props,
          dispatch = _props.dispatch,
          columnIndex = _props.columnIndex,
          row = _props.row,
          zone = _props.zone,
          canvasPosition = _props.canvasPosition,
          rowPosition = _props.rowPosition,
          isEditing = _props.isEditing,
          localState = _props.localState,
          isHover = _props.isHover,
          disableAddButton = _props.disableAddButton,
          persistedState = _props.persistedState,
          cloudinary = _props.cloudinary,
          userProperties = _props.userProperties;


      var type = zone.get('type');

      var hoverStateStyle = isHover ? this.baseHoverStateStyle : null;
      var activeStateStyle = isEditing ? this.baseActiveStateStyle : null;
      var zoneStyle = Object.assign({}, this.zoneStyle, hoverStateStyle, activeStateStyle);

      // Common props across all editors    
      var editorProps = {
        persistedState: persistedState,
        localState: localState,
        canvasPosition: canvasPosition,
        zone: zone,
        zonePosition: position,
        isEditing: isEditing,
        cloudinary: cloudinary,
        userProperties: userProperties,
        onChange: function onChange(update) {
          if (!isEditing) {
            return;
          }
          dispatch(editorActions.updateDraft({
            localState: update.localState,
            draftPersistedState: update.persistedState,
            html: update.html
          }));
        },
        ref: function ref(editor) {
          _this2.activeEditor = editor;
        }
      };

      // Common props across all toolbars
      var toolbarProps = {
        persistedState: persistedState,
        localState: localState,
        canvasPosition: canvasPosition,
        zone: zone,
        zonePosition: position,
        cloudinary: cloudinary,
        userProperties: userProperties,
        onChange: function onChange(update) {
          if (!isEditing) {
            return;
          }
          var html = _this2.activeEditor.generateHTML(update.persistedState);
          dispatch(editorActions.updateDraft({
            localState: update.localState,
            draftPersistedState: update.persistedState,
            html: html
          }));
        }
      };

      var editorNode = void 0;
      var toolbarNode = void 0;

      switch (type) {
        case 'RichText':
          editorNode = _react2.default.createElement(_RichTextEditor2.default, editorProps);
          toolbarNode = _react2.default.createElement(_RichTextToolbar2.default, toolbarProps);
          break;
        case 'Image':
          editorNode = _react2.default.createElement(_ImageEditor2.default, editorProps);
          toolbarNode = _react2.default.createElement(_ImageToolbar2.default, toolbarProps);
          break;
        case 'Button':
          editorNode = _react2.default.createElement(_ButtonEditor2.default, editorProps);
          toolbarNode = _react2.default.createElement(_ButtonToolbar2.default, toolbarProps);
          break;
        case 'HTML':
          editorNode = _react2.default.createElement(_HtmlEditor2.default, editorProps);
          toolbarNode = _react2.default.createElement(_HtmlEditorToolbar2.default, toolbarProps);
          break;
        case 'Video':
          editorNode = _react2.default.createElement(_VideoEditor2.default, editorProps);
          toolbarNode = _react2.default.createElement(_VideoEditorToolbar2.default, toolbarProps);
          break;
        case 'Hero':
          editorNode = _react2.default.createElement(_HeroEditor2.default, editorProps);
          toolbarNode = _react2.default.createElement(_HeroToolbar2.default, toolbarProps);
          break;
        case 'TextInput':
          editorNode = _react2.default.createElement(_TextInputEditor2.default, editorProps);
          toolbarNode = _react2.default.createElement(_TextInputToolbar2.default, toolbarProps);
          break;
        case 'TextAreaInput':
          editorNode = _react2.default.createElement(_TextAreaInputEditor2.default, editorProps);
          toolbarNode = _react2.default.createElement(_TextAreaInputToolbar2.default, toolbarProps);
          break;
        case 'SelectionField':
          editorNode = _react2.default.createElement(_SelectionEditor2.default, editorProps);
          toolbarNode = _react2.default.createElement(_SelectionToolbar2.default, toolbarProps);
          break;
      }

      return _react2.default.createElement(
        'div',
        {
          className: 'zone-container zone-' + columnIndex,
          style: this.containerStyle,
          onMouseOver: function onMouseOver() {
            return _this2.toggleHover(true);
          },
          onMouseLeave: function onMouseLeave() {
            return _this2.toggleHover(false);
          },
          ref: function ref(el) {
            return _this2.wrapper = el;
          }
        },
        _react2.default.createElement(
          'div',
          { className: 'zone', style: zoneStyle },
          _react2.default.createElement(
            _EditorWrapper2.default,
            {
              rowPosition: rowPosition,
              zonePosition: position,
              isEditing: isEditing,
              isHover: isHover,
              disableDeleteButton: disableAddButton,
              onEdit: function onEdit() {
                return _this2.startEditing();
              },
              onSave: function onSave() {
                _this2.save();
                _this2.cancelEditing();
              },
              onCancel: function onCancel() {
                return _this2.cancelEditing();
              },
              onRemove: function onRemove() {
                return _this2.removeRow();
              },
              onMoveRowStart: function onMoveRowStart() {
                dispatch(editorActions.startMoving(row));
              },
              onMoveRowEnd: function onMoveRowEnd() {
                dispatch(editorActions.endMoving(row));
              },
              toolbarNode: toolbarNode
            },
            editorNode
          )
        )
      );
    }
  }, {
    key: 'toggleHover',
    value: function toggleHover(isOver) {
      var _props2 = this.props,
          dispatch = _props2.dispatch,
          zone = _props2.zone,
          row = _props2.row;

      dispatch(editorActions.toggleZoneHover(zone, isOver));
      dispatch(editorActions.toggleRowHover(row, isOver));
    }
  }, {
    key: 'save',
    value: function save() {
      var _props3 = this.props,
          dispatch = _props3.dispatch,
          zone = _props3.zone,
          persistedState = _props3.persistedState,
          row = _props3.row;
      var html = this.props.html;

      // Handles first mounting of a typed zone

      if (this.activeEditor && (!html || !html.length)) {
        html = this.activeEditor.generateHTML(persistedState);
      }

      var zoneHtml = '\n      <div class="zone-container">\n        <div class="zone">\n          <div class="content">\n            ' + (html || '') + '\n          </div>\n        </div>\n      </div>\n    ';

      var updatedZone = zone.set('persistedState', persistedState).set('html', zoneHtml);

      dispatch(editorActions.updateZone(row, updatedZone));
    }
  }, {
    key: 'startEditing',
    value: function startEditing() {
      var _props4 = this.props,
          dispatch = _props4.dispatch,
          zone = _props4.zone;

      dispatch(editorActions.startEditing(zone));
    }
  }, {
    key: 'cancelEditing',
    value: function cancelEditing() {
      var _props5 = this.props,
          dispatch = _props5.dispatch,
          zone = _props5.zone;

      dispatch(editorActions.cancelEditing(zone));
    }
  }, {
    key: 'removeRow',
    value: function removeRow() {
      var _props6 = this.props,
          row = _props6.row,
          dispatch = _props6.dispatch;

      dispatch(rowActions.removeRow(row.get('id')));
    }
  }, {
    key: 'setBoundingBox',
    value: function setBoundingBox() {
      if (!this.wrapper) {
        return;
      }
      var position = (0, _domHelpers.convertBoundingBox)(this.wrapper.getBoundingClientRect());
      if (!position.equals(this.state.position)) {
        this.setState({ position: position });
      }
    }
  }]);

  return Zone;
}(_react2.default.Component);

Zone.propTypes = {
  dispatch: _propTypes2.default.func.isRequired,
  zone: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  row: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  columnIndex: _propTypes2.default.number.isRequired,
  canvasPosition: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  rowPosition: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  html: _propTypes2.default.string.isRequired,
  isEditing: _propTypes2.default.bool.isRequired,
  isHover: _propTypes2.default.bool.isRequired,
  disableAddButton: _propTypes2.default.bool.isRequired,
  userProperties: _propTypes2.default.instanceOf(_immutable.List).isRequired,
  cloudinary: _propTypes2.default.instanceOf(_immutable.Map).isRequired
};

function mapStateToProps(state, ownProps) {

  // PersistedState is either a draft if we're actively editing
  // or the persistedState from the zone data if we're not in edit mode
  var isEditing = state.editor.get('isCanvasInEditMode') && state.editor.get('activeZoneId') === ownProps.zone.get('id') ? true : false;
  var persistedState = isEditing ? state.editor.get('draftPersistedState') : ownProps.zone.get('persistedState');
  var isHover = !state.editor.get('isCanvasInEditMode') && state.editor.get('hoverZoneId') === ownProps.zone.get('id') ? true : false;

  return {
    localState: state.editor.get('localState'),
    persistedState: persistedState,
    html: state.editor.get('draftHtml'),
    isEditing: isEditing,
    isHover: isHover,
    disableAddButton: state.editor.get('disableAddButton'),
    canvasPosition: state.editor.get('canvasPosition'),
    userProperties: state.editor.get('userProperties'),
    cloudinary: state.editor.get('cloudinary')
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Zone);