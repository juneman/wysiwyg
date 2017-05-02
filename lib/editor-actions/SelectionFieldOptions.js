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

var SelectFieldOptions = function (_React$Component) {
  _inherits(SelectFieldOptions, _React$Component);

  function SelectFieldOptions(props) {
    _classCallCheck(this, SelectFieldOptions);

    var _this = _possibleConstructorReturn(this, (SelectFieldOptions.__proto__ || Object.getPrototypeOf(SelectFieldOptions)).call(this, props));

    var _props$persistedState = props.persistedState.toJS(),
        isRequired = _props$persistedState.isRequired,
        fieldType = _props$persistedState.fieldType;

    _this.state = {
      isRequired: isRequired || false,
      fieldType: fieldType || 'radio'
    };
    return _this;
  }

  _createClass(SelectFieldOptions, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var update = {};

      var _props$persistedState2 = this.props.persistedState.toJS(),
          isRequired = _props$persistedState2.isRequired,
          fieldType = _props$persistedState2.fieldType;

      var _nextProps$persistedS = nextProps.persistedState.toJS(),
          isRequiredNew = _nextProps$persistedS.isRequired,
          fieldTypeNew = _nextProps$persistedS.fieldType;

      if (isRequired !== isRequiredNew) {
        update.isRequired = isRequiredNew;
      }
      if (fieldType !== fieldTypeNew) {
        update.fieldType = fieldTypeNew;
      }
      if (Object.keys(update).length) {
        this.setState(update);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          isRequired = _state.isRequired,
          fieldType = _state.fieldType;
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
          'Select Field Options'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { style: row },
            _react2.default.createElement('input', { type: 'checkbox', style: _editor.checkboxStyle, checked: isRequired, onChange: function onChange(e) {
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
              'Allow Multiple Selections'
            ),
            _react2.default.createElement(
              'select',
              { style: _editor.dropdownStyle, value: fieldType, onChange: function onChange(e) {
                  return _this2.handleChangeFieldType(e);
                } },
              _react2.default.createElement(
                'option',
                { value: 'radio' },
                'Radio Buttons'
              ),
              _react2.default.createElement(
                'option',
                { value: 'checkbox' },
                'Checkboxes'
              ),
              _react2.default.createElement(
                'option',
                { value: 'dropdown' },
                'Dropdown List'
              )
            )
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
    key: 'handleChangeFieldType',
    value: function handleChangeFieldType(e) {
      var fieldType = e.target.value;
      this.setState({
        fieldType: fieldType
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
          fieldType = _state2.fieldType;


      var newPersistedState = persistedState.set('isRequired', isRequired).set('fieldType', fieldType);

      onToggleActive(false);

      onChange({
        localState: localState,
        persistedState: newPersistedState
      });
    }
  }]);

  return SelectFieldOptions;
}(_react2.default.Component);

exports.default = SelectFieldOptions;


SelectFieldOptions.propTypes = {
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onToggleActive: _propTypes2.default.func.isRequired,
  isActive: _propTypes2.default.bool.isRequired
};