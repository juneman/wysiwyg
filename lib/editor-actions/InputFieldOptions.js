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

var _SettingsButton = require('../icons/SettingsButton');

var _SettingsButton2 = _interopRequireDefault(_SettingsButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputFieldOptions = function (_React$Component) {
  _inherits(InputFieldOptions, _React$Component);

  function InputFieldOptions(props) {
    _classCallCheck(this, InputFieldOptions);

    var _this = _possibleConstructorReturn(this, (InputFieldOptions.__proto__ || Object.getPrototypeOf(InputFieldOptions)).call(this, props));

    _this.state = {
      isRequired: props.persistedState.get('isRequired') || false,
      maxLength: props.persistedState.get('maxLength') || ''
    };
    return _this;
  }

  _createClass(InputFieldOptions, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          isRequired = _state.isRequired,
          maxLength = _state.maxLength;
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

      var row = {
        marginTop: 20
      };

      var dropdownNodes = isActive ? _react2.default.createElement(
        _Menu2.default,
        { style: dropdownStyles },
        _react2.default.createElement(
          'div',
          { style: titleStyles },
          'Text Field Options'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { style: row },
            _react2.default.createElement('input', { style: _editor.checkboxStyle, type: 'checkbox', checked: isRequired, onChange: function onChange(e) {
                return _this2.handleIsRequired(e);
              } }),
            _react2.default.createElement(
              'label',
              null,
              'Required Field'
            )
          ),
          _react2.default.createElement(
            'div',
            { style: row },
            _react2.default.createElement(
              'label',
              null,
              'Maximum Length'
            ),
            _react2.default.createElement('input', { style: _editor.textInputStyle, type: 'number', min: '0', max: '1000', step: '1', value: maxLength, className: 'form-control', placeholder: 'None (Unlimited)', onChange: function onChange(e) {
                return _this2.handleMaxLength(e);
              }, onClick: function onClick(e) {
                return _this2.handleClick(e);
              } })
          ),
          _react2.default.createElement(
            'div',
            { style: _extends({ textAlign: 'right' }, row) },
            _react2.default.createElement(
              'button',
              { style: _editor.buttonStyle, onClick: function onClick(e) {
                  return _this2.handleSave(e);
                } },
              'Save'
            )
          )
        )
      ) : null;

      return _react2.default.createElement(
        'div',
        { style: { marginRight: 10 } },
        _react2.default.createElement(_SettingsButton2.default, _extends({
          onClick: function onClick() {
            return _this2.toggleDropdown();
          },
          text: 'Field Options'
        }, buttonProps)),
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
    key: 'handleIsRequired',
    value: function handleIsRequired(e) {
      var isRequired = e.target.checked;
      this.setState({
        isRequired: isRequired
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      e.target.focus();
    }
  }, {
    key: 'handleMaxLength',
    value: function handleMaxLength(e) {
      var maxLength = +e.target.value;
      this.setState({
        maxLength: maxLength
      });
    }
  }, {
    key: 'handleSave',
    value: function handleSave(e) {
      if (e) {
        e.preventDefault();
      }
      var _props2 = this.props,
          localState = _props2.localState,
          persistedState = _props2.persistedState,
          onChange = _props2.onChange,
          onToggleActive = _props2.onToggleActive;
      var _state2 = this.state,
          isRequired = _state2.isRequired,
          maxLength = _state2.maxLength;


      var newPersistedState = persistedState.set('isRequired', isRequired).set('maxLength', maxLength);

      onToggleActive(false);

      onChange({
        localState: localState,
        persistedState: newPersistedState
      });
    }
  }]);

  return InputFieldOptions;
}(_react2.default.Component);

exports.default = InputFieldOptions;


InputFieldOptions.propTypes = {
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onToggleActive: _propTypes2.default.func.isRequired,
  isActive: _propTypes2.default.bool.isRequired
};