'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkDecorator = undefined;
exports.linkToEntity = linkToEntity;
exports.entityToLink = entityToLink;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
}

var Link = function Link(props) {
  var contentState = props.contentState,
      entityKey = props.entityKey,
      children = props.children;

  var _contentState$getEnti = contentState.getEntity(entityKey).getData(),
      href = _contentState$getEnti.href,
      isNewWindow = _contentState$getEnti.isNewWindow;

  return _react2.default.createElement(
    'a',
    { href: href, target: isNewWindow ? '_blank' : '_self', style: { textDecoration: 'underline', color: 'blue' } },
    children
  );
};

Link.propTypes = {
  contentState: _propTypes2.default.object.isRequired,
  entityKey: _propTypes2.default.string.isRequired,
  children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.element]).isRequired
};

var LinkDecorator = exports.LinkDecorator = {
  strategy: findLinkEntities,
  component: Link
};

function linkToEntity(nodeName, node) {
  if (nodeName === 'a') {
    return _draftJs.Entity.create('LINK', 'MUTABLE', {
      href: node.href,
      isNewWindow: node.target === '_blank' ? true : false
    });
  }
}

function entityToLink(entity, originalText) {
  if (entity.type === 'LINK') {
    return _react2.default.createElement(
      'a',
      { href: entity.data.href, target: entity.data.isNewWindow ? '_blank' : '_self' },
      originalText
    );
  }
  return originalText;
}