'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decorator = exports.CUSTOM_STYLE_PREFIX_COLOR = undefined;
exports.convertFromHTML = convertFromHTML;
exports.convertToHTML = convertToHTML;
exports.customStyleFn = customStyleFn;
exports.blockStyleFn = blockStyleFn;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftConvert = require('draft-convert');

var _LinkDecorator = require('../../helpers/draft/LinkDecorator');

var _UserPropertyDecorator = require('../../helpers/draft/UserPropertyDecorator');

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CUSTOM_STYLE_PREFIX_COLOR = exports.CUSTOM_STYLE_PREFIX_COLOR = 'COLOR_'; /* eslint react/display-name: 0 */ // Not exporting React components here
var decorator = exports.decorator = new _draftJs.CompositeDecorator([_LinkDecorator.LinkDecorator, _UserPropertyDecorator.UserPropertyDecorator]);

function convertFromHTML(htmlContent) {
  return (0, _draftConvert.convertFromHTML)({
    htmlToStyle: function htmlToStyle(nodeName, node, currentStyle) {
      if (nodeName === 'span' && node.style.color) {
        return currentStyle.add('' + CUSTOM_STYLE_PREFIX_COLOR + node.style.color);
      } else {
        return currentStyle;
      }
    },
    htmlToEntity: function htmlToEntity(nodeName, node) {
      var entity = (0, _LinkDecorator.linkToEntity)(nodeName, node);
      return entity;
    },
    textToEntity: function textToEntity() {
      return [];
    },
    htmlToBlock: function htmlToBlock(nodeName, node) {
      var nodeType = 'unstyled';
      switch (nodeName) {
        case 'h1':
          nodeType = 'header-one';
          break;
        case 'h2':
          nodeType = 'header-two';
          break;
        case 'h3':
          nodeType = 'header-three';
          break;
        case 'h4':
          nodeType = 'header-four';
          break;
        case 'h5':
          nodeType = 'header-five';
          break;
      }

      if (node.style.textAlign) {
        return {
          type: nodeType,
          data: {
            textAlign: node.style.textAlign
          }
        };
      }
    }
  })(htmlContent);
}

function convertToHTML(editorState) {
  return (0, _draftConvert.convertToHTML)({
    styleToHTML: function styleToHTML(style) {
      if (style.indexOf(CUSTOM_STYLE_PREFIX_COLOR) === 0) {
        return _react2.default.createElement('span', { style: { color: style.substr(CUSTOM_STYLE_PREFIX_COLOR.length) } });
      }
    },
    blockToHTML: function blockToHTML(block) {
      if (block.data && Object.keys(block.data).length) {
        var styleProps = {
          style: block.data
        };

        switch (block.type) {
          case 'header-one':
            return _react2.default.createElement('h1', styleProps);
          case 'header-two':
            return _react2.default.createElement('h2', styleProps);
          case 'header-three':
            return _react2.default.createElement('h3', styleProps);
          case 'header-four':
            return _react2.default.createElement('h4', styleProps);
          case 'header-five':
            return _react2.default.createElement('h5', styleProps);
          default:
            return _react2.default.createElement('div', styleProps);
        }
      }
    },
    entityToHTML: function entityToHTML(entity, originalText) {
      originalText = (0, _LinkDecorator.entityToLink)(entity, originalText);
      return originalText;
    }
  })(editorState.getCurrentContent());
}

function customStyleFn(style) {
  var styleNames = style.toJS();
  return styleNames.reduce(function (styles, styleName) {
    if (styleName.startsWith(CUSTOM_STYLE_PREFIX_COLOR)) {
      styles.color = styleName.split(CUSTOM_STYLE_PREFIX_COLOR)[1];
    }
    return styles;
  }, {});
}

function blockStyleFn(contentBlock) {
  var _contentBlock$getData = contentBlock.getData().toJS(),
      textAlign = _contentBlock$getData.textAlign;

  if (textAlign) {
    return 'align-' + textAlign;
  }
}