'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageUploader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _reactRedux = require('react-redux');

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageUploader = exports.ImageUploader = function (_React$Component) {
  _inherits(ImageUploader, _React$Component);

  function ImageUploader() {
    _classCallCheck(this, ImageUploader);

    return _possibleConstructorReturn(this, (ImageUploader.__proto__ || Object.getPrototypeOf(ImageUploader)).apply(this, arguments));
  }

  _createClass(ImageUploader, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          disableClick = _props.disableClick,
          preventDropOnDocument = _props.preventDropOnDocument;


      var baseStyle = {
        border: 'none'
      };
      var style = Object.assign({}, baseStyle, this.props.style);

      return _react2.default.createElement(
        _reactDropzone2.default,
        {
          multiple: false,
          accept: 'image/*',
          style: style,
          onDrop: function onDrop(files) {
            return _this2.handleDrop(files);
          },
          disableClick: disableClick,
          preventDropOnDocument: preventDropOnDocument
        },
        children
      );
    }
  }, {
    key: 'handleDrop',
    value: function handleDrop(files) {
      this.uploadImageFile(files[0]);
    }
  }, {
    key: 'uploadImageFile',
    value: function uploadImageFile(file) {
      var onUpload = this.props.onUpload;

      var _props$cloudinary$toJ = this.props.cloudinary.toJS(),
          uploadUrl = _props$cloudinary$toJ.uploadUrl,
          apiKey = _props$cloudinary$toJ.apiKey,
          accountId = _props$cloudinary$toJ.accountId,
          userId = _props$cloudinary$toJ.userId;

      var data = new FormData();
      data.append('file', file);

      data.append('api_key', apiKey);
      data.append('timestamp', Date.now() / 1000 | 0);
      data.append('tags', ['account-' + accountId, 'user-' + userId].join(','));
      data.append('folder', accountId);

      // Transforming GIFs can have unintended consequences for Cloudinary,
      // like causing the GIF to become to large if it's scaled up, or dropping
      // frames if a transformation doesn't support the full resolution.
      var uploadPreset = file.type === 'image/gif' ? 'gif_preset' : 'sdruqnxi';
      data.append('upload_preset', uploadPreset);

      fetch(uploadUrl, {
        method: 'POST',
        body: data
      }).then(function (response) {
        return response.json();
      }).then(function (imageDetails) {
        onUpload(imageDetails);
      }).catch(function (err) {
        console.error('parsing failed', err);
      });
    }
  }]);

  return ImageUploader;
}(_react2.default.Component);

ImageUploader.propTypes = {
  children: _propTypes2.default.element.isRequired,
  onUpload: _propTypes2.default.func.isRequired,
  disableClick: _propTypes2.default.bool,
  preventDropOnDocument: _propTypes2.default.bool,
  style: _propTypes2.default.object,
  cloudinary: _propTypes2.default.instanceOf(_immutable.Map).isRequired
};

function mapStateToProps(state) {
  return {
    cloudinary: state.editor.get('cloudinary')
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(ImageUploader);