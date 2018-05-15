import React from 'react';
import PropTypes from 'prop-types';
import { Entity } from 'draft-js';
import Link from '../../components/entities/Link';

export function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

export const LinkDecorator = {
  strategy: findLinkEntities,
  component: Link
};

export function linkToEntity(nodeName, node) {
  if (nodeName === 'a') {

    // We want to pull the literal href value provided by users.
    const href = node.getAttribute('href');

    return Entity.create(
      'LINK',
      'MUTABLE',
      {
        href: href,
        color: node.style.color || node.parentNode.style.color,
        isNewWindow: (node.target === '_blank') ? true : false
      }
    );
  }
}

export function entityToLink(entity, originalText) {
  if (entity.type === 'LINK') {
    return <a style={{ color: entity.data.color }} href={entity.data.href} target={(entity.data.isNewWindow) ? '_blank' : '_self'}/>;
  }
  return originalText;
}
