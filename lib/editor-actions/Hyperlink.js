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

var _editor = require('../helpers/styles/editor');

var _Menu = require('../components/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _LinkButton = require('../icons/LinkButton');

var _LinkButton2 = _interopRequireDefault(_LinkButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hyperlink = function (_React$Component) {
  _inherits(Hyperlink, _React$Component);

  function Hyperlink(props) {
    _classCallCheck(this, Hyperlink);

    var _this = _possibleConstructorReturn(this, (Hyperlink.__proto__ || Object.getPrototypeOf(Hyperlink)).call(this, props));

    _this.state = {
      href: props.href || '',
      isNewWindow: props.isNewWindow || false
    };
    return _this;
  }

  _createClass(Hyperlink, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var update = {};
      if (nextProps.href !== this.props.href) {
        update.href = nextProps.href;
      }
      if (nextProps.isNewWindow !== this.props.isNewWindow) {
        update.isNewWindow = nextProps.isNewWindow;
      }
      if (Object.keys(update).length) {
        this.setState(update);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var isActive = this.props.isActive;
      var _state = this.state,
          href = _state.href,
          isNewWindow = _state.isNewWindow;


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
          'Create a Link'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { style: row },
            _react2.default.createElement(
              'label',
              null,
              'URL'
            ),
            _react2.default.createElement('input', { type: 'text', style: _editor.textInputStyle, value: href, onChange: function onChange(e) {
                return _this2.handleHref(e);
              } })
          ),
          _react2.default.createElement(
            'div',
            { style: row },
            _react2.default.createElement('input', { type: 'checkbox', style: _editor.checkboxStyle, checked: isNewWindow, onChange: function onChange(e) {
                return _this2.handleIsNewWindow(e);
              } }),
            _react2.default.createElement(
              'label',
              null,
              'Open In New Window'
            )
          ),
          _react2.default.createElement(
            'div',
            { style: _extends({ textAlign: 'right' }, row) },
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
        _react2.default.createElement(_LinkButton2.default, _extends({ onClick: function onClick() {
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
    key: 'handleIsNewWindow',
    value: function handleIsNewWindow(e) {
      var isNewWindow = e.target.checked;
      this.setState({
        isNewWindow: isNewWindow
      });
    }
  }, {
    key: 'handleHref',
    value: function handleHref(e) {
      var href = e.target.value;
      this.setState({
        href: href
      });
    }
  }, {
    key: 'handleSave',
    value: function handleSave(e) {
      if (e) {
        e.preventDefault();
      }
      var _props2 = this.props,
          onChange = _props2.onChange,
          onToggleActive = _props2.onToggleActive;
      var _state2 = this.state,
          isNewWindow = _state2.isNewWindow,
          href = _state2.href;


      onToggleActive(false);

      onChange(href, isNewWindow);
    }
  }]);

  return Hyperlink;
}(_react2.default.Component);

exports.default = Hyperlink;


Hyperlink.propTypes = {
  href: _propTypes2.default.string,
  isNewWindow: _propTypes2.default.bool,
  onChange: _propTypes2.default.func.isRequired,
  onToggleActive: _propTypes2.default.func.isRequired,
  isActive: _propTypes2.default.bool.isRequired
};