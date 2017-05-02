'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Row = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _reactDnd = require('react-dnd');

var _reactRedux = require('react-redux');

var _MoveVertButton = require('../icons/MoveVertButton');

var _MoveVertButton2 = _interopRequireDefault(_MoveVertButton);

var _domHelpers = require('../helpers/domHelpers');

var _constants = require('../helpers/constants');

var _Zone = require('./Zone');

var _Zone2 = _interopRequireDefault(_Zone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A React component for each row of the editor
 * @class
 */
var Row = exports.Row = function (_React$Component) {
  _inherits(Row, _React$Component);

  function Row(props) {
    _classCallCheck(this, Row);

    var _this = _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).call(this, props));

    _this.state = {
      position: (0, _immutable.Map)()
    };
    return _this;
  }

  _createClass(Row, [{
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

      var _props = this.props,
          row = _props.row,
          connectDragSource = _props.connectDragSource,
          isMovable = _props.isMovable,
          showMoveButton = _props.showMoveButton;
      var position = this.state.position;


      var zoneNodes = row.get('zones').map(function (zone, i) {
        return _react2.default.createElement(_Zone2.default, {
          key: zone.get('id'),
          zone: zone,
          row: row,
          rowPosition: position,
          columnIndex: i
        });
      });

      var moveButtonStyle = {
        position: 'absolute',
        left: -30,
        top: 0
      };

      var moveButton = showMoveButton ? _react2.default.createElement(
        'div',
        { style: moveButtonStyle },
        _react2.default.createElement(_MoveVertButton2.default, {
          shadow: true,
          color: '#cebea5',
          cursor: 'ns-resize'
        })
      ) : null;

      var gridStyle = {
        position: 'relative',
        gridTemplateColumns: 'repeat(' + zoneNodes.length + ', 1fr)'
      };

      return isMovable ? connectDragSource(_react2.default.createElement(
        'div',
        { className: 'row', style: gridStyle, ref: function ref(el) {
            return _this2.wrapper = el;
          } },
        moveButton,
        zoneNodes
      )) : _react2.default.createElement(
        'div',
        {
          className: 'row',
          style: gridStyle,
          ref: function ref(el) {
            return _this2.wrapper = el;
          }
        },
        moveButton,
        zoneNodes
      );
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

  return Row;
}(_react2.default.Component);

Row.propTypes = {
  row: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  connectDragSource: _propTypes2.default.func,
  isDragging: _propTypes2.default.bool,
  isMovable: _propTypes2.default.bool.isRequired,
  showMoveButton: _propTypes2.default.bool.isRequired
};

var rowSource = {
  beginDrag: function beginDrag(props) {
    return {
      row: props.row,
      rowIndex: props.rowIndex
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function mapStateToProps(state, ownProps) {
  var showMoveButton = !state.editor.get('isCanvasInEditMode') && state.editor.get('hoverRowId') === ownProps.row.get('id') && state.rows.size > 1 ? true : false;

  return {
    showMoveButton: showMoveButton,
    isMovable: !state.editor.get('isCanvasInEditMode') && state.rows.size > 1 ? true : false
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactDnd.DragSource)(_constants.DRAGABLE_ITEMS.ROW, rowSource, collect)(Row));