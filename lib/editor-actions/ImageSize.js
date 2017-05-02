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

var _editor = require('../helpers/styles/editor');

var _Menu = require('../components/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _SelectSizeButton = require('../icons/SelectSizeButton');

var _SelectSizeButton2 = _interopRequireDefault(_SelectSizeButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageSize = function (_React$Component) {
  _inherits(ImageSize, _React$Component);

  function ImageSize(props) {
    _classCallCheck(this, ImageSize);

    var _this = _possibleConstructorReturn(this, (ImageSize.__proto__ || Object.getPrototypeOf(ImageSize)).call(this, props));

    var persistedState = props.persistedState;


    _this.state = {
      width: persistedState.get('width') || ''
    };
    return _this;
  }

  _createClass(ImageSize, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var width = this.state.width;
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
          'Set Image Width'
        ),
        _react2.default.createElement(
          'div',
          { style: { marginTop: 20 } },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'label',
              null,
              'Width:'
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement('input', { style: _editor.textInputStyle, type: 'number', step: '1', min: '10', max: '1000', value: width, onChange: function onChange(e) {
                return _this2.handleInputChange(e, 'width');
              } })
          ),
          _react2.default.createElement(
            'div',
            { style: { textAlign: 'right', marginTop: 20 } },
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
        null,
        _react2.default.createElement(
          'a',
          { href: '#', onClick: function onClick() {
              return _this2.toggleDropdown();
            } },
          _react2.default.createElement(_SelectSizeButton2.default, buttonProps)
        ),
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
    key: 'handleInputChange',
    value: function handleInputChange(e, name) {
      var val = e.currentTarget.value;
      var update = {};
      if (val && val.length) {
        update[name] = parseInt(val);
        this.setState(update);
      }
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
      var width = this.state.width;

      // Auto scale the height based on the width selected

      var _persistedState$toJS = persistedState.toJS(),
          imageWidth = _persistedState$toJS.width,
          imageHeight = _persistedState$toJS.height;

      if (!imageHeight) {
        return;
      }

      var scaleRatio = width / imageWidth;
      var height = imageHeight * scaleRatio;

      var newPersistedState = persistedState.set('height', height).set('width', width).delete('widthOverride').delete('heightOverride');

      onToggleActive(false);

      onChange({
        localState: localState,
        persistedState: newPersistedState
      });
    }
  }]);

  return ImageSize;
}(_react2.default.Component);

exports.default = ImageSize;


ImageSize.propTypes = {
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onToggleActive: _propTypes2.default.func.isRequired,
  isActive: _propTypes2.default.bool.isRequired
};