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

var _ImageUploader = require('../components/ImageUploader');

var _ImageUploader2 = _interopRequireDefault(_ImageUploader);

var _FileUploadButton = require('../icons/FileUploadButton');

var _FileUploadButton2 = _interopRequireDefault(_FileUploadButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageUpload = function (_React$Component) {
  _inherits(ImageUpload, _React$Component);

  function ImageUpload() {
    _classCallCheck(this, ImageUpload);

    return _possibleConstructorReturn(this, (ImageUpload.__proto__ || Object.getPrototypeOf(ImageUpload)).apply(this, arguments));
  }

  _createClass(ImageUpload, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var buttonProps = (0, _editor.getButtonProps)(false);

      return _react2.default.createElement(
        _ImageUploader2.default,
        {
          onUpload: function onUpload(imageDetails) {
            return _this2.handleUpload(imageDetails);
          }
        },
        _react2.default.createElement(_FileUploadButton2.default, _extends({ onClick: function onClick() {} }, buttonProps))
      );
    }
  }, {
    key: 'handleUpload',
    value: function handleUpload(imageDetails) {
      var url = imageDetails.url,
          height = imageDetails.height,
          width = imageDetails.width;
      var _props = this.props,
          localState = _props.localState,
          persistedState = _props.persistedState,
          onChange = _props.onChange,
          maxWidth = _props.maxWidth,
          maxHeight = _props.maxHeight;


      var newPersistedState = persistedState.set('url', url).set('height', height).set('width', width);

      // Make sure the uploaded image does not have a larger size than available
      if (maxHeight && height > maxHeight) {
        newPersistedState = newPersistedState.set('heightOverride', maxHeight);
      }
      if (maxWidth && width > maxWidth) {
        newPersistedState = newPersistedState.set('widthOverride', maxWidth);
      }

      onChange({
        localState: localState,
        persistedState: newPersistedState
      });
    }
  }]);

  return ImageUpload;
}(_react2.default.Component);

exports.default = ImageUpload;


ImageUpload.propTypes = {
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  onChange: _propTypes2.default.func.isRequired,
  maxWidth: _propTypes2.default.number,
  maxHeight: _propTypes2.default.number
};