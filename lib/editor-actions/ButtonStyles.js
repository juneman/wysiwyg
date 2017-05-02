'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _editor = require('../helpers/styles/editor');

var _Menu = require('../components/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _AdvancedStylingButton = require('../icons/AdvancedStylingButton');

var _AdvancedStylingButton2 = _interopRequireDefault(_AdvancedStylingButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonStyles = function (_React$Component) {
  _inherits(ButtonStyles, _React$Component);

  function ButtonStyles(props) {
    _classCallCheck(this, ButtonStyles);

    var _this = _possibleConstructorReturn(this, (ButtonStyles.__proto__ || Object.getPrototypeOf(ButtonStyles)).call(this, props));

    _this.state = {
      borderRadius: props.persistedState.get('borderRadius') || '',
      padding: props.persistedState.get('padding') || '',
      fontSize: props.persistedState.get('fontSize') || '',
      width: props.persistedState.get('width') || '',
      className: props.persistedState.get('className') || ''
    };
    return _this;
  }

  _createClass(ButtonStyles, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          borderRadius = _state.borderRadius,
          padding = _state.padding,
          fontSize = _state.fontSize,
          width = _state.width,
          className = _state.className;
      var isActive = this.props.isActive;


      var buttonProps = (0, _editor.getButtonProps)(isActive);

      var dropdownStyles = {
        position: 'absolute',
        top: 45,
        left: 0,
        padding: 10,
        width: 300
      };

      var titleStyles = _editor.secondaryMenuTitleStyle;

      var dropdownNodes = isActive ? _react2.default.createElement(
        _Menu2.default,
        { style: dropdownStyles },
        _react2.default.createElement(
          'div',
          { style: titleStyles },
          'Advanced Button Options'
        ),
        _react2.default.createElement(
          'div',
          { style: { display: 'grid', gridGap: 10 } },
          _react2.default.createElement(
            'div',
            { style: { gridColumn: 1, gridRow: 1 } },
            _react2.default.createElement(
              'label',
              null,
              'Border Radius'
            ),
            _react2.default.createElement('input', { type: 'text', value: borderRadius, className: 'form-control', onChange: function onChange(e) {
                return _this2.handleChange(e, 'borderRadius');
              } })
          ),
          _react2.default.createElement(
            'div',
            { style: { gridColumn: 2, gridRow: 1 } },
            _react2.default.createElement(
              'label',
              null,
              'Padding'
            ),
            _react2.default.createElement('input', { type: 'text', value: padding, className: 'form-control', onChange: function onChange(e) {
                return _this2.handleChange(e, 'padding');
              } })
          ),
          _react2.default.createElement(
            'div',
            { style: { gridColumn: 1, gridRow: 2 } },
            _react2.default.createElement(
              'label',
              null,
              'Font Size'
            ),
            _react2.default.createElement('input', { type: 'text', value: fontSize, className: 'form-control', onChange: function onChange(e) {
                return _this2.handleChange(e, 'fontSize');
              } })
          ),
          _react2.default.createElement(
            'div',
            { style: { gridColumn: 2, gridRow: 2 } },
            _react2.default.createElement(
              'label',
              null,
              'Width'
            ),
            _react2.default.createElement('input', { type: 'text', value: width, className: 'form-control', onChange: function onChange(e) {
                return _this2.handleChange(e, 'width');
              } })
          ),
          _react2.default.createElement(
            'div',
            { style: { gridColumn: '1 / 3', gridRow: 3 } },
            _react2.default.createElement(
              'label',
              null,
              'Class Names (sparate by space)'
            ),
            _react2.default.createElement('input', { type: 'text', value: className, className: 'form-control', onChange: function onChange(e) {
                return _this2.handleChange(e, 'className');
              } })
          ),
          _react2.default.createElement(
            'div',
            { style: { gridColumn: '1 / 3', gridRow: 4, textAlign: 'right' } },
            _react2.default.createElement(
              'button',
              { className: 'btn', onClick: function onClick(e) {
                  return _this2.handleSave(e);
                } },
              'Save'
            )
          )
        )
      ) : null;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_AdvancedStylingButton2.default, _extends({ onClick: function onClick() {
            return _this2.toggleDropdown();
          } }, buttonProps)),
        dropdownNodes
      );
    }
  }, {
    key: 'toggleDropdown',
    value: function toggleDropdown() {
      var _props = this.props,
          onToggleActive = _props.onToggleActive,
          isActive = _props.isActive;

      onToggleActive(!isActive);
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e, field) {
      var value = e.target.value;
      var update = {};
      update[field] = value;
      this.setState(update);
    }
  }, {
    key: 'handleSave',
    value: function handleSave(e) {
      var _this3 = this;

      if (e) {
        e.preventDefault();
      }
      var _props2 = this.props,
          localState = _props2.localState,
          persistedState = _props2.persistedState,
          onChange = _props2.onChange,
          onToggleActive = _props2.onToggleActive;


      var newPersistedState = persistedState;

      Object.keys(this.state).forEach(function (key) {
        var val = _this3.state[key];
        if (val && val.length) {
          newPersistedState = newPersistedState.set(key, val);
        } else {
          newPersistedState = newPersistedState.delete(key);
        }
      });

      onToggleActive(false);

      onChange({
        localState: localState,
        persistedState: newPersistedState
      });
    }
  }]);

  return ButtonStyles;
}(_react2.default.Component);

exports.default = ButtonStyles;


ButtonStyles.propTypes = {
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onToggleActive: _propTypes2.default.func.isRequired,
  isActive: _propTypes2.default.bool.isRequired
};