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

var _sanitizeHtml = require('sanitize-html');

var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

var _reactAce = require('react-ace');

var _reactAce2 = _interopRequireDefault(_reactAce);

require('brace/mode/html');

require('brace/theme/github');

var _editor = require('../helpers/styles/editor');

var _Menu = require('../components/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _CodeButton = require('../icons/CodeButton');

var _CodeButton2 = _interopRequireDefault(_CodeButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Code = function (_React$Component) {
  _inherits(Code, _React$Component);

  function Code(props) {
    _classCallCheck(this, Code);

    var _this = _possibleConstructorReturn(this, (Code.__proto__ || Object.getPrototypeOf(Code)).call(this, props));

    _this.state = {
      content: ''
    };
    return _this;
  }

  _createClass(Code, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var content = this.props.persistedState.get('content') || '';
      this.setState({
        content: content
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (this.props.persistedState !== nextProps.persistedState || this.props.isActive !== nextProps.isActive) {
        return true;
      }
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          persistedState = _props.persistedState,
          title = _props.title,
          isActive = _props.isActive,
          aceEditorConfig = _props.aceEditorConfig;

      var content = persistedState.get('content');

      var buttonProps = (0, _editor.getButtonProps)(isActive);

      var dropdownStyles = {
        position: 'absolute',
        top: 45,
        left: 0,
        padding: 10
      };

      var titleStyles = _editor.secondaryMenuTitleStyle;

      var aceEditorProps = Object.assign({}, {
        name: 'code-editor',
        editorProps: { $blockScrolling: true },
        showGutter: false,
        showPrintMargin: false,
        width: '400px',
        height: '150px'
      }, aceEditorConfig.toJS(), // Let the user override items above
      {
        mode: 'html',
        theme: 'github',
        onChange: function onChange(content) {
          return _this2.setState({ content: content });
        },
        focus: true,
        defaultValue: content
      });

      var dropdownNodes = isActive ? _react2.default.createElement(
        _Menu2.default,
        { style: dropdownStyles, className: 'html-menu' },
        _react2.default.createElement(
          'div',
          { style: titleStyles },
          title
        ),
        _react2.default.createElement(_reactAce2.default, aceEditorProps),
        _react2.default.createElement(
          'div',
          { style: { textAlign: 'right', marginTop: 10 } },
          _react2.default.createElement(
            'button',
            { style: _editor.buttonStyle, onClick: function onClick(e) {
                return _this2.handleSave(e);
              } },
            'Save'
          )
        )
      ) : null;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_CodeButton2.default, _extends({ onClick: function onClick() {
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
      if (e) {
        e.preventDefault();
      }
      var _props3 = this.props,
          localState = _props3.localState,
          persistedState = _props3.persistedState,
          onChange = _props3.onChange,
          onToggleActive = _props3.onToggleActive,
          sanitizeHtmlConfig = _props3.sanitizeHtmlConfig;
      var content = this.state.content;


      var cleanHtml = (0, _sanitizeHtml2.default)(content, sanitizeHtmlConfig.toJS());
      var newPersistedState = persistedState.set('content', cleanHtml);

      onToggleActive(false);

      onChange({
        localState: localState,
        persistedState: newPersistedState
      });
    }
  }]);

  return Code;
}(_react2.default.Component);

exports.default = Code;


Code.propTypes = {
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  onChange: _propTypes2.default.func.isRequired,
  title: _propTypes2.default.string.isRequired,
  onToggleActive: _propTypes2.default.func.isRequired,
  isActive: _propTypes2.default.bool.isRequired,
  sanitizeHtmlConfig: _propTypes2.default.instanceOf(_immutable.Map),
  aceEditorConfig: _propTypes2.default.instanceOf(_immutable.Map).isRequired
};