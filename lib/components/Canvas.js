'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Canvas = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _reactRedux = require('react-redux');

var _RowContainer = require('./RowContainer');

var _RowContainer2 = _interopRequireDefault(_RowContainer);

var _htmlParseStringify = require('html-parse-stringify2');

var _htmlParseStringify2 = _interopRequireDefault(_htmlParseStringify);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _immutable = require('immutable');

var _domHelpers = require('../helpers/domHelpers');

var _EditorSelector = require('./EditorSelector');

var _EditorSelector2 = _interopRequireDefault(_EditorSelector);

var _FullAddElement = require('./FullAddElement');

var _FullAddElement2 = _interopRequireDefault(_FullAddElement);

var _AddButtonHorizRule = require('./AddButtonHorizRule');

var _AddButtonHorizRule2 = _interopRequireDefault(_AddButtonHorizRule);

var _rowActions = require('../actions/rowActions');

var rowActions = _interopRequireWildcard(_rowActions);

var _editorSelectorActions = require('../actions/editorSelectorActions');

var editorSelectorActions = _interopRequireWildcard(_editorSelectorActions);

var _editorActions = require('../actions/editorActions');

var editorActions = _interopRequireWildcard(_editorActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A React component that acts as the main
 * wrapper around the other components of the WYSIWYG editor
 * @class
 */
var Canvas = exports.Canvas = function (_React$Component) {
  _inherits(Canvas, _React$Component);

  function Canvas() {
    _classCallCheck(this, Canvas);

    return _possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).apply(this, arguments));
  }

  _createClass(Canvas, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          dispatch = _props.dispatch,
          cloudinary = _props.cloudinary,
          rows = _props.rows,
          startEditable = _props.startEditable,
          userProperties = _props.userProperties,
          allowedEditorTypes = _props.allowedEditorTypes,
          sanitizeHtml = _props.sanitizeHtml,
          disableAddButton = _props.disableAddButton;


      this.setBoundingBox();
      if (rows && !rows.isEmpty()) {
        var activeZoneId = startEditable ? rows.get(0).get('zones').get(0) : null;
        dispatch(rowActions.replaceRows(rows, activeZoneId));
      }
      if (cloudinary) {
        dispatch(editorActions.setCloudinarySettings(cloudinary));
      }
      if (userProperties && !userProperties.isEmpty()) {
        this.props.dispatch(editorActions.setUserProperties(userProperties));
      }
      if (allowedEditorTypes && !allowedEditorTypes.isEmpty()) {
        dispatch(editorActions.setAllowedEditorTypes(allowedEditorTypes));
      }
      if (disableAddButton !== undefined) {
        dispatch(editorActions.setDisableAddButton(disableAddButton));
      }
      if (sanitizeHtml && !sanitizeHtml.isEmpty()) {
        dispatch(editorActions.setSanitizeHtmlConfig(sanitizeHtml));
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.setBoundingBox();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var dispatch = this.props.dispatch;

      if (nextProps.internalRows !== this.props.internalRows) {
        this.save(nextProps.internalRows);
      }
      if (!(0, _immutable.is)(nextProps.rows, this.props.rows)) {
        var activeZoneId = nextProps.startEditable ? nextProps.rows.get(0).get('zones').get(0) : null;
        dispatch(rowActions.replaceRows(nextProps.rows, activeZoneId));
      }
      if (!(0, _immutable.is)(nextProps.cloudinary, this.props.cloudinary)) {
        dispatch(editorActions.setCloudinarySettings(nextProps.cloudinary));
      }
      if (!(0, _immutable.is)(nextProps.userProperties, this.props.userProperties)) {
        dispatch(editorActions.setUserProperties(nextProps.userProperties));
      }
      if (!(0, _immutable.is)(nextProps.allowedEditorTypes, this.props.allowedEditorTypes)) {
        dispatch(editorActions.setAllowedEditorTypes(nextProps.allowedEditorTypes));
      }
      if (nextProps.disableAddButton !== this.props.disableAddButton) {
        dispatch(editorActions.setDisableAddButton(nextProps.disableAddButton));
      }
      if (!nextProps.sanitizeHtml.isEmpty() && !(0, _immutable.is)(nextProps.sanitizeHtml, this.props.sanitizeHtml)) {
        dispatch(editorActions.setSanitizeHtmlConfig(nextProps.sanitizeHtml));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          internalRows = _props2.internalRows,
          showAddButton = _props2.showAddButton,
          showEditorSelector = _props2.showEditorSelector,
          addButtonPosition = _props2.addButtonPosition,
          screenSize = _props2.screenSize,
          canvasPosition = _props2.canvasPosition,
          style = _props2.style,
          internalAllowedEditorTypes = _props2.internalAllowedEditorTypes;


      var canvasStyles = Object.assign({}, {
        position: 'relative',
        padding: internalRows.size ? '3px 0' : null,
        fontFamily: 'Sans-Serif'
      }, style);

      var _canvasPosition$toJS = canvasPosition.toJS(),
          canvasHeight = _canvasPosition$toJS.height;

      var rowNodes = internalRows.size ? internalRows.map(function (row, i) {
        return row.get('zones') && row.get('zones').size ? _react2.default.createElement(_RowContainer2.default, {
          key: row.get('id'),
          row: row,
          rowIndex: i,
          onDrop: function onDrop(sourceRowIndex, targetRowIndex) {
            return _this2.moveRows(sourceRowIndex, targetRowIndex);
          }
        }) : _react2.default.createElement(_FullAddElement2.default, {
          key: row.get('id'),
          onClickAdd: function onClickAdd(addButtonPosition) {
            return _this2.showEditorSelector(addButtonPosition);
          },
          onUpload: function onUpload(imageDetails) {
            return _this2.handleAddImage(imageDetails);
          }
        });
      }) : null;

      var fullScreenAddNode = !internalRows.size ? _react2.default.createElement(_FullAddElement2.default, {
        height: canvasHeight,
        onClickAdd: function onClickAdd(addButtonPosition) {
          return _this2.showEditorSelector(addButtonPosition);
        },
        onUpload: function onUpload(imageDetails) {
          return _this2.handleAddImage(imageDetails);
        }
      }) : null;

      var editorSelectorNode = showEditorSelector ? _react2.default.createElement(_EditorSelector2.default, {
        canvasPosition: canvasPosition,
        addButtonPosition: addButtonPosition,
        screenSize: screenSize,
        allowedEditorTypes: internalAllowedEditorTypes,
        onSelect: function onSelect(type, rowsToAdd, defaultAction) {
          return _this2.addRow(type, rowsToAdd, defaultAction);
        }
      }) : null;

      var addButtonNode = showAddButton ? _react2.default.createElement(_AddButtonHorizRule2.default, {
        onClick: function onClick(addButtonPosition) {
          return _this2.showEditorSelector(addButtonPosition);
        }
      }) : null;

      return _react2.default.createElement(
        'div',
        { className: 'canvas', style: canvasStyles, ref: function ref(el) {
            return _this2.wrapper = el;
          } },
        rowNodes,
        fullScreenAddNode,
        addButtonNode,
        editorSelectorNode
      );
    }
  }, {
    key: 'setBoundingBox',
    value: function setBoundingBox() {
      var _props3 = this.props,
          dispatch = _props3.dispatch,
          canvasPosition = _props3.canvasPosition;

      if (this.wrapper) {
        var position = (0, _domHelpers.convertBoundingBox)(this.wrapper.getBoundingClientRect());
        if (!position.equals(canvasPosition)) {
          dispatch(editorActions.setCanvasPosition(position));
        }
      }
    }
  }, {
    key: 'handleAddNew',
    value: function handleAddNew(e) {
      if (e) e.preventDefault();
      var _props4 = this.props,
          dispatch = _props4.dispatch,
          canvasPosition = _props4.canvasPosition;

      dispatch(editorSelectorActions.show(canvasPosition));
    }
  }, {
    key: 'handleAddImage',
    value: function handleAddImage(imageDetails) {
      // Trim what we save from Cloudinary down to just these fields
      var url = imageDetails.url,
          height = imageDetails.height,
          width = imageDetails.width;
      var canvasPosition = this.props.canvasPosition;

      // Make sure the uploaded image does not have a larger size than the canvas

      var heightOverride = height > canvasPosition.get('height') ? canvasPosition.get('height') : undefined;
      var widthOverride = width > canvasPosition.get('width') ? canvasPosition.get('width') : undefined;

      var rowsToAdd = (0, _immutable.fromJS)([{
        id: (0, _v2.default)(),
        zones: [{
          id: (0, _v2.default)(),
          type: 'Image',
          persistedState: {
            url: url,
            width: width,
            height: height,
            heightOverride: heightOverride,
            widthOverride: widthOverride
          }
        }]
      }]);

      this.addRow('Image', rowsToAdd);
    }
  }, {
    key: 'addRow',
    value: function addRow(type, rowsToAdd, defaultAction) {
      var dispatch = this.props.dispatch;


      rowsToAdd = rowsToAdd || (0, _immutable.fromJS)([{
        id: (0, _v2.default)(),
        zones: [{
          id: (0, _v2.default)(),
          type: type,
          persistedState: {}
        }]
      }]);

      dispatch(rowActions.addRows(rowsToAdd));

      // If only one element is added, let's start editing immediately
      if (rowsToAdd.size === 1 && rowsToAdd.get(0).get('zones').size === 1) {
        var activeZone = rowsToAdd.get(0).get('zones').get(0);
        dispatch(editorActions.startEditing(activeZone));
        if (defaultAction) {
          dispatch(editorActions.toggleEditorAction(defaultAction, true));
        }
      }
    }
  }, {
    key: 'removeRow',
    value: function removeRow(id) {
      this.props.dispatch(rowActions.removeRow(id));
    }
  }, {
    key: 'showEditorSelector',
    value: function showEditorSelector(addButtonPosition) {
      this.props.dispatch(editorSelectorActions.show(addButtonPosition));
    }
  }, {
    key: 'moveRows',
    value: function moveRows(sourceIndex, targetIndex) {
      if (sourceIndex === targetIndex) {
        return;
      }
      this.props.dispatch(editorActions.moveRows(sourceIndex, targetIndex));
    }
  }, {
    key: 'buildHtml',
    value: function buildHtml(rows) {
      var html = '';
      rows.forEach(function (row) {
        var zones = row.get('zones');
        var zoneBlocks = [];
        if (zones && zones.size) {
          zoneBlocks = zones.map(function (zone) {
            return zone.get('html');
          });
        }
        html += '\n        <div class="row-container">\n          <div class="row">\n            ' + zoneBlocks.join('\n') + '\n          </div>\n        </div>\n      ';
      });
      return html;
    }
  }, {
    key: 'save',
    value: function save(internalRows) {
      var _props5 = this.props,
          onSave = _props5.onSave,
          style = _props5.style;


      if (onSave) {
        // Build the final HTML
        var rowsHtml = this.buildHtml(internalRows);

        // Rendering here with ReactDOMServer to convert the optional style object to CSS
        var html = (0, _domHelpers.flattenHTML)(_server2.default.renderToStaticMarkup(_react2.default.createElement(
          'div',
          { className: 'canvas', style: style },
          '|ROWS|'
        )).replace('|ROWS|', rowsHtml));

        var ast = _htmlParseStringify2.default.parse(html);

        // Flatten the Immutable object before pushing it up to the public API
        var rowsWithoutHtml = internalRows.toJS().map(function (row) {
          // HTML shouldn't be persisted
          delete row.html;
          if (row.zones && row.zones.length) {
            row.zones = row.zones.map(function (zone) {
              delete zone.html;
              return zone;
            });
          }
          return row;
        });

        onSave({
          rows: rowsWithoutHtml,
          ast: ast,
          html: _htmlParseStringify2.default.stringify(ast)
        });
      }
    }
  }]);

  return Canvas;
}(_react2.default.Component);

Canvas.propTypes = {
  style: _propTypes2.default.object,
  onSave: _propTypes2.default.func,
  dispatch: _propTypes2.default.func.isRequired,
  rows: _propTypes2.default.instanceOf(_immutable.List),
  internalRows: _propTypes2.default.instanceOf(_immutable.List).isRequired,
  cloudinary: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  internalCloudinary: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  userProperties: _propTypes2.default.instanceOf(_immutable.List).isRequired,
  internalUserProperties: _propTypes2.default.instanceOf(_immutable.List).isRequired,
  sanitizeHtml: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  internalSanitizeHtml: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  allowedEditorTypes: _propTypes2.default.instanceOf(_immutable.List).isRequired,
  internalAllowedEditorTypes: _propTypes2.default.instanceOf(_immutable.List).isRequired,
  showEditorSelector: _propTypes2.default.bool.isRequired,
  addButtonPosition: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  canvasPosition: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  screenSize: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  showAddButton: _propTypes2.default.bool.isRequired,
  startEditable: _propTypes2.default.bool,
  disableAddButton: _propTypes2.default.bool
};

function mapStateToProps(state, ownProps) {
  return {
    // Convert these to immutable if they're passed in from the public API
    rows: ownProps.rows ? (0, _immutable.fromJS)(ownProps.rows) : (0, _immutable.List)(),
    cloudinary: ownProps.cloudinary ? (0, _immutable.fromJS)(ownProps.cloudinary) : (0, _immutable.Map)(),
    userProperties: ownProps.userProperties && ownProps.userProperties.length ? (0, _immutable.fromJS)(ownProps.userProperties) : (0, _immutable.List)(),
    sanitizeHtml: ownProps.sanitizeHtml ? (0, _immutable.fromJS)(ownProps.sanitizeHtml) : (0, _immutable.Map)(),
    allowedEditorTypes: ownProps.allowedEditorTypes ? (0, _immutable.fromJS)(ownProps.allowedEditorTypes) : (0, _immutable.List)(),

    // Internal mappings of the above properties
    internalCloudinary: state.editor.get('cloudinary'),
    internalUserProperties: state.editor.get('userProperties'),
    internalRows: state.rows,
    internalSanitizeHtml: state.editor.get('sanitizeHtmlConfig'),
    internalAllowedEditorTypes: state.editor.get('allowedEditorTypes'),

    showEditorSelector: state.editorSelector.get('isOpen'),
    canvasPosition: state.editor.get('canvasPosition'),
    screenSize: state.editor.get('screenSize'),
    addButtonPosition: state.editorSelector.get('addButtonPosition'),

    showAddButton: !state.editor.get('disableAddButton') && !state.editor.get('isCanvasInEditMode') && state.rows.size && state.rows.every(function (row) {
      return row.get('zones') && row.get('zones').size;
    }) ? true : false
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(Canvas));