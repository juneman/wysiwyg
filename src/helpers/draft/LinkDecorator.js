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

  const { href, isNewWindow, color } = contentState.getEntity(entityKey).getData();
  return (
    <a style={{ color }} href={href} target={(isNewWindow) ? '_blank' : '_self'}>
      { children }
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

export function whitespaceToEntity(textNode) {
  const leadingPattern = /^[\s]*/g;
  const originalText = textNode.data;
  const leadingWhiteSpaceMatch = originalText.match(leadingPattern)
  console.log('LOGG4 checking pattern', leadingWhiteSpaceMatch)
  if (leadingWhiteSpaceMatch && leadingWhiteSpaceMatch.length && leadingWhiteSpaceMatch[0].length >= 1) {
    return Entity.create(
      'SPACE',
      'MUTABLE',
      {
        space: leadingWhiteSpaceMatch[0].length
      }
    );
  }

}

export function entityToWhitespace(entity, originalText) {
  if (entity.type === 'SPACE') {
    return (
      <span>
        <span style={{ display: 'inline-block', width: `${entity.data.space * 2}px` }} />
        {originalText}
      </span>
    );
  }
  return originalText;
}
