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

var _draftJs = require('draft-js');

var _Alignment = require('./Alignment');

var _Alignment2 = _interopRequireDefault(_Alignment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AlignmentInline = function (_React$Component) {
  _inherits(AlignmentInline, _React$Component);

  function AlignmentInline() {
    _classCallCheck(this, AlignmentInline);

    return _possibleConstructorReturn(this, (AlignmentInline.__proto__ || Object.getPrototypeOf(AlignmentInline)).apply(this, arguments));
  }

  _createClass(AlignmentInline, [{
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


      var blockData = {
        textAlign: type
      };

      var editorState = localState.get('editorState');
      var selectionState = editorState.getSelection();
      var contentState = editorState.getCurrentContent();
      var newContentState = _draftJs.Modifier.setBlockData(contentState, selectionState, blockData);
      var newLocalState = localState.set('editorState', _draftJs.EditorState.push(editorState, newContentState, 'change-block-data'));

      onChange({
        localState: newLocalState,
        persistedState: persistedState
      });
    }
  }]);

  return AlignmentInline;
}(_react2.default.Component);

exports.default = AlignmentInline;


AlignmentInline.propTypes = {
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onToggleActive: _propTypes2.default.func.isRequired,
  isActive: _propTypes2.default.bool.isRequired
};