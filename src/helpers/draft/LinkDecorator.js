import React from 'react';
import PropTypes from 'prop-types';
import { Entity } from 'draft-js';

function findLinkEntities(contentBlock, callback, contentState) {
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

const Link = (props) => {
  const { contentState, entityKey, children } = props;

  const { href, isNewWindow } = contentState.getEntity(entityKey).getData();
  
  return (
    <a href={href} target={(isNewWindow) ? '_blank' : '_self'} style={{textDecoration: 'underline', color: 'blue'}}>
      {children}
    </a>
  );
};

Link.propTypes = {
  contentState: PropTypes.object.isRequired,
  entityKey: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ]).isRequired
};

export const LinkDecorator = {
  strategy: findLinkEntities,
  component: Link
};

export function linkToEntity(nodeName, node) {
  if (nodeName === 'a') {
    return Entity.create(
      'LINK',
      'MUTABLE',
      {
        href: node.href,
        isNewWindow: (node.target === '_blank') ? true : false
      }
    );
  }
}

export function entityToLink(entity, originalText) {
  if (entity.type === 'LINK') {
    return <a href={entity.data.href} target={(entity.data.isNewWindow) ? '_blank' : '_self'}>{originalText}</a>;
  }
  return originalText;
}