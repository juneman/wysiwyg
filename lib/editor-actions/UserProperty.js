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

var _draftJs = require('draft-js');

var _editor = require('../helpers/styles/editor');

var _Menu = require('../components/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _UserPropertyButton = require('../icons/UserPropertyButton');

var _UserPropertyButton2 = _interopRequireDefault(_UserPropertyButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserProperty = function (_React$Component) {
  _inherits(UserProperty, _React$Component);

  function UserProperty() {
    _classCallCheck(this, UserProperty);

    return _possibleConstructorReturn(this, (UserProperty.__proto__ || Object.getPrototypeOf(UserProperty)).apply(this, arguments));
  }

  _createClass(UserProperty, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          isActive = _props.isActive,
          userProperties = _props.userProperties;


      var buttonProps = (0, _editor.getButtonProps)(isActive);

      var dropdownStyles = {
        position: 'absolute',
        top: 45,
        left: 0,
        padding: 10,
        width: 300
      };

      var titleStyles = _editor.secondaryMenuTitleStyle;

      // Leave blank if nothing
      if (!userProperties || !userProperties.size) {
        return _react2.default.createElement('div', null);
      }

      var userPropertiesDropdown = userProperties.map(function (userProperty) {
        return userProperty.toJS();
      });

      var dropdownNodes = isActive ? _react2.default.createElement(
        _Menu2.default,
        { style: dropdownStyles },
        _react2.default.createElement(
          'div',
          { style: titleStyles },
          'Insert a User Property'
        ),
        _react2.default.createElement(
          'select',
          { className: 'form-control', onChange: function onChange(e) {
              return _this2.handleSave(e);
            } },
          _react2.default.createElement(
            'option',
            { value: '' },
            'Select Property...'
          ),
          userPropertiesDropdown.map(function (userProperty) {
            return _react2.default.createElement(
              'option',
              { key: userProperty.value, value: userProperty.value },
              userProperty.name
            );
          })
        )
      ) : null;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_UserPropertyButton2.default, _extends({ onClick: function onClick() {
            return _this2.toggleDropdown();
          } }, buttonProps)),
        dropdownNodes
      );
    }
  }, {
    key: 'toggleDropdown',
    value: function toggleDropdown() {
      var _props2 = this.props,
          onToggleActive = _props2.onToggleActive,
          isActive = _props2.isActive;

      onToggleActive(!isActive);
    }
  }, {
    key: 'handleSave',
    value: function handleSave(e) {
      e.preventDefault();
      var value = e.target.value;
      this.handleSetValue(value);
    }
  }, {
    key: 'handleSetValue',
    value: function handleSetValue(value) {
      var _props3 = this.props,
          localState = _props3.localState,
          persistedState = _props3.persistedState,
          onChange = _props3.onChange,
          onToggleActive = _props3.onToggleActive;


      var editorState = localState.get('editorState');
      var selectionState = editorState.getSelection();
      var contentState = editorState.getCurrentContent();

      var newContentState = selectionState.isCollapsed() ? _draftJs.Modifier.insertText(contentState, selectionState, value) : _draftJs.Modifier.replaceText(contentState, selectionState, value);

      var newLocalState = localState.set('editorState', _draftJs.EditorState.push(editorState, newContentState, 'insert-characters'));

      onToggleActive(false);

      onChange({
        localState: newLocalState,
        persistedState: persistedState
      });
    }
  }]);

  return UserProperty;
}(_react2.default.Component);

exports.default = UserProperty;


UserProperty.propTypes = {
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onToggleActive: _propTypes2.default.func.isRequired,
  isActive: _propTypes2.default.bool.isRequired,
  userProperties: _propTypes2.default.instanceOf(_immutable.List).isRequired
};