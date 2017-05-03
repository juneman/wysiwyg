'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDnd = require('react-dnd');

var _constants = require('../helpers/constants');

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A React component wrapper around the Row component to provide
 * a dropzone for resorting rows
 * @class
 */
var RowContainer = function (_React$Component) {
  _inherits(RowContainer, _React$Component);

  function RowContainer() {
    _classCallCheck(this, RowContainer);

    return _possibleConstructorReturn(this, (RowContainer.__proto__ || Object.getPrototypeOf(RowContainer)).apply(this, arguments));
  }

  _createClass(RowContainer, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          connectDropTarget = _props.connectDropTarget,
          isOver = _props.isOver;


      var style = {
        border: isOver ? '2px dashed #0bdc66' : null
      };

      return connectDropTarget(_react2.default.createElement(
        'div',
        { className: 'row-container', style: style },
        _react2.default.createElement(_Row2.default, this.props)
      ));
    }
  }]);

  return RowContainer;
}(_react2.default.Component);

RowContainer.propTypes = {
  connectDropTarget: _propTypes2.default.func.isRequired,
  isOver: _propTypes2.default.bool.isRequired,
  onDrop: _propTypes2.default.func.isRequired
};

var rowTarget = {
  drop: function drop(targetProps, monitor) {
    var sourceProps = monitor.getItem();
    targetProps.onDrop(sourceProps.rowIndex, targetProps.rowIndex);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

exports.default = (0, _reactDnd.DropTarget)(_constants.DRAGABLE_ITEMS.ROW, rowTarget, collect)(RowContainer);