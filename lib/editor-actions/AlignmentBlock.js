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

var _Alignment = require('./Alignment');

var _Alignment2 = _interopRequireDefault(_Alignment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AlignmentBlock = function (_React$Component) {
  _inherits(AlignmentBlock, _React$Component);

  function AlignmentBlock() {
    _classCallCheck(this, AlignmentBlock);

    return _possibleConstructorReturn(this, (AlignmentBlock.__proto__ || Object.getPrototypeOf(AlignmentBlock)).apply(this, arguments));
  }

  _createClass(AlignmentBlock, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          onToggleActive = _props.onToggleActive,
          isActive = _props.isActive;

      return _react2.default.createElement(_Alignment2.default, {
        onChange: function onChange(type) {
          return _this2.handleAlignment(type);
        },
        onToggleActive: onToggleActive,
        isActive: isActive
      });
    }
  }, {
    key: 'handleAlignment',
    value: function handleAlignment(type) {
      var _props2 = this.props,
          localState = _props2.localState,
          persistedState = _props2.persistedState,
          onChange = _props2.onChange;


      var newPersistedState = persistedState.set('textAlign', type);

      onChange({
        localState: localState,
        persistedState: newPersistedState
      });
    }
  }]);

  return AlignmentBlock;
}(_react2.default.Component);

exports.default = AlignmentBlock;


AlignmentBlock.propTypes = {
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onToggleActive: _propTypes2.default.func.isRequired,
  isActive: _propTypes2.default.bool.isRequired
};