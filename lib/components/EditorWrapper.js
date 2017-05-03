'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _domHelpers = require('../helpers/domHelpers');

var _OkButton = require('../icons/OkButton');

var _OkButton2 = _interopRequireDefault(_OkButton);

var _EditButton = require('../icons/EditButton');

var _EditButton2 = _interopRequireDefault(_EditButton);

var _CancelButton = require('../icons/CancelButton');

var _CancelButton2 = _interopRequireDefault(_CancelButton);

var _DeleteButton = require('../icons/DeleteButton');

var _DeleteButton2 = _interopRequireDefault(_DeleteButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A React component that wraps a Zone component when
 * editing is active. It provides the toolbars for Save/Cancel/etc
 * @class
 */
var EditorWrapper = function (_React$Component) {
  _inherits(EditorWrapper, _React$Component);

  function EditorWrapper(props) {
    _classCallCheck(this, EditorWrapper);

    var _this = _possibleConstructorReturn(this, (EditorWrapper.__proto__ || Object.getPrototypeOf(EditorWrapper)).call(this, props));

    _this.state = {
      position: (0, _immutable.Map)(),
      toolbarPosition: (0, _immutable.Map)()
    };
    return _this;
  }

  _createClass(EditorWrapper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
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

      var _state = this.state,
          position = _state.position,
          toolbarPosition = _state.toolbarPosition;
      var _props = this.props,
          isEditing = _props.isEditing,
          isHover = _props.isHover,
          children = _props.children,
          rowPosition = _props.rowPosition,
          toolbarNode = _props.toolbarNode,
          onSave = _props.onSave,
          onCancel = _props.onCancel,
          onRemove = _props.onRemove,
          onEdit = _props.onEdit,
          disableDeleteButton = _props.disableDeleteButton;


      var hoverButtonStyles = {
        textAlign: 'center',
        position: 'absolute',
        width: position.get('width') || 100,
        top: position.get('top'),
        zIndex: 100
      };

      var editingButtonStyles = {
        position: 'absolute',
        left: rowPosition && rowPosition.get('right') ? rowPosition.get('right') - 150 : 0,
        top: rowPosition && rowPosition.get('bottom') ? rowPosition.get('bottom') : 0
      };

      // If the canvas is really small, make sure the buttons don't overlap the toolbar
      if (toolbarPosition.get('left') && editingButtonStyles.left < toolbarPosition.get('left') + toolbarPosition.get('width')) {
        editingButtonStyles.left = toolbarPosition.get('left') + toolbarPosition.get('width') + 20;
      }

      var toolbarStyles = {
        position: 'absolute',
        left: rowPosition && rowPosition.get('left') ? rowPosition.get('left') : 0,
        top: rowPosition && rowPosition.get('bottom') ? rowPosition.get('bottom') : 0
      };

      var buttons = void 0;

      if (isEditing) {
        buttons = _react2.default.createElement(
          'div',
          { className: 'editing' },
          children,
          _react2.default.createElement(
            'div',
            { style: editingButtonStyles },
            _react2.default.createElement(_OkButton2.default, { shadow: true, color: '#0bdc66', onClick: function onClick() {
                return onSave();
              } }),
            _react2.default.createElement(_CancelButton2.default, { shadow: true, color: '#C0C0C0', onClick: function onClick() {
                return onCancel();
              } }),
            disableDeleteButton ? null : _react2.default.createElement(_DeleteButton2.default, { shadow: true, color: '#FF0000', onClick: function onClick() {
                return onRemove();
              } })
          ),
          toolbarNode ? _react2.default.createElement(
            'div',
            { style: toolbarStyles, ref: function ref(el) {
                return _this2.toolbar = el;
              } },
            toolbarNode
          ) : null
        );
      } else if (isHover) {
        buttons = _react2.default.createElement(
          'div',
          { className: 'hover' },
          _react2.default.createElement(
            'div',
            { key: 'edit', style: hoverButtonStyles },
            _react2.default.createElement(_EditButton2.default, {
              shadow: true,
              color: '#f4ad42',
              onClick: function onClick() {
                return onEdit();
              }
            })
          ),
          children
        );
      }

      return _react2.default.createElement(
        'div',
        { className: 'content', ref: function ref(el) {
            return _this2.wrapper = el;
          } },
        buttons ? buttons : children
      );
    }
  }, {
    key: 'setBoundingBox',
    value: function setBoundingBox() {
      var update = {};
      if (this.wrapper) {
        var position = (0, _domHelpers.convertBoundingBox)(this.wrapper.getBoundingClientRect());
        if (!position.equals(this.state.position)) {
          update.position = position;
        }
      }
      if (this.toolbar) {
        var toolbarPosition = (0, _domHelpers.convertBoundingBox)(this.toolbar.getBoundingClientRect());
        if (!toolbarPosition.equals(this.state.toolbarPosition)) {
          update.toolbarPosition = toolbarPosition;
        }
      }
      if (Object.keys(update).length) {
        this.setState(update);
      }
    }
  }]);

  return EditorWrapper;
}(_react2.default.Component);

exports.default = EditorWrapper;


EditorWrapper.propTypes = {
  isEditing: _propTypes2.default.bool.isRequired,
  isHover: _propTypes2.default.bool.isRequired,
  children: _propTypes2.default.element.isRequired,
  onEdit: _propTypes2.default.func.isRequired,
  onSave: _propTypes2.default.func.isRequired,
  onCancel: _propTypes2.default.func.isRequired,
  onRemove: _propTypes2.default.func.isRequired,
  rowPosition: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  toolbarNode: _propTypes2.default.node,
  disableDeleteButton: _propTypes2.default.bool
};