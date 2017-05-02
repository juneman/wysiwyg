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

var _htmlParseStringify = require('html-parse-stringify2');

var _htmlParseStringify2 = _interopRequireDefault(_htmlParseStringify);

var _editor = require('../../helpers/styles/editor');

var _ImageUploader = require('../../components/ImageUploader');

var _ImageUploader2 = _interopRequireDefault(_ImageUploader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageEditor = function (_React$Component) {
  _inherits(ImageEditor, _React$Component);

  function ImageEditor() {
    _classCallCheck(this, ImageEditor);

    return _possibleConstructorReturn(this, (ImageEditor.__proto__ || Object.getPrototypeOf(ImageEditor)).apply(this, arguments));
  }

  _createClass(ImageEditor, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          persistedState = _props.persistedState,
          isEditing = _props.isEditing;

      var _persistedState$toJS = persistedState.toJS(),
          url = _persistedState$toJS.url,
          height = _persistedState$toJS.height,
          width = _persistedState$toJS.width,
          heightOverride = _persistedState$toJS.heightOverride,
          widthOverride = _persistedState$toJS.widthOverride,
          textAlign = _persistedState$toJS.textAlign;

      var dropzoneStyle = {
        height: 70,
        paddingTop: 30,
        width: '100%',
        backgroundColor: '#dafeea',
        color: '#0bdc66',
        textAlign: 'center'
      };

      var wrapperStyle = {};
      if (textAlign) {
        wrapperStyle.textAlign = textAlign;
      }

      var node = _react2.default.createElement(
        'div',
        { style: _extends({ height: 100 }, _editor.placeholderStyle) },
        'Click to add your Image'
      );
      if (url) {
        node = _react2.default.createElement('img', { src: url, height: heightOverride || height, width: widthOverride || width });
      } else if (isEditing) {
        node = _react2.default.createElement(
          _ImageUploader2.default,
          {
            onUpload: function onUpload(imageDetails) {
              return _this2.handleUpload(imageDetails);
            }
          },
          _react2.default.createElement(
            'div',
            { style: dropzoneStyle },
            _react2.default.createElement(
              'div',
              null,
              'Click here to select an image to upload'
            ),
            _react2.default.createElement(
              'div',
              null,
              'or drag and drop an image'
            )
          )
        );
      }

      return _react2.default.createElement(
        'div',
        { className: 'image', style: wrapperStyle },
        node
      );
    }
  }, {
    key: 'generateHTML',
    value: function generateHTML(persistedState) {
      var _persistedState$toJS2 = persistedState.toJS(),
          url = _persistedState$toJS2.url,
          height = _persistedState$toJS2.height,
          width = _persistedState$toJS2.width,
          heightOverride = _persistedState$toJS2.heightOverride,
          widthOverride = _persistedState$toJS2.widthOverride,
          href = _persistedState$toJS2.href,
          isNewWindow = _persistedState$toJS2.isNewWindow,
          textAlign = _persistedState$toJS2.textAlign;

      if (!url) {
        return '';
      }

      var wrapperAttrs = {
        class: 'image'
      };
      if (textAlign) {
        wrapperAttrs.style = 'text-align:' + textAlign + ';';
      }
      var imageAttrs = {};
      if (height || heightOverride) {
        imageAttrs.height = heightOverride || height;
      }
      if (width || widthOverride) {
        imageAttrs.width = widthOverride || width;
      }

      var imageAst = {
        type: 'tag',
        name: 'img',
        voidElement: true,
        attrs: _extends({
          src: url
        }, imageAttrs)
      };

      var linkAst = {
        type: 'tag',
        name: 'a',
        voidElement: false,
        attrs: {
          href: href,
          target: isNewWindow ? '_blank' : '_self'
        },
        children: [imageAst]
      };

      var ast = [{
        type: 'tag',
        name: 'div',
        attrs: wrapperAttrs,
        voidElement: false,
        children: [href ? linkAst : imageAst]
      }];

      return _htmlParseStringify2.default.stringify(ast);
    }

    // Instance Method

  }, {
    key: 'focus',
    value: function focus() {
      // Do nothing for this editor
    }
  }, {
    key: 'handleUpload',
    value: function handleUpload(imageDetails) {
      var url = imageDetails.url,
          height = imageDetails.height,
          width = imageDetails.width;
      var _props2 = this.props,
          localState = _props2.localState,
          persistedState = _props2.persistedState,
          onChange = _props2.onChange,
          canvasPosition = _props2.canvasPosition;


      var newPersistedState = persistedState.set('url', url).set('height', height).set('width', width);

      // Make sure the uploaded image does not have a larger size than the canvas
      if (height > canvasPosition.get('height')) {
        newPersistedState = newPersistedState.set('heightOverride', canvasPosition.get('height'));
      }
      if (width > canvasPosition.get('width')) {
        newPersistedState = newPersistedState.set('widthOverride', canvasPosition.get('width'));
      }

      onChange({
        localState: localState,
        persistedState: newPersistedState
      });
    }
  }]);

  return ImageEditor;
}(_react2.default.Component);

exports.default = ImageEditor;


ImageEditor.propTypes = {
  isEditing: _propTypes2.default.bool.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  persistedState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  localState: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  canvasPosition: _propTypes2.default.instanceOf(_immutable.Map).isRequired
};