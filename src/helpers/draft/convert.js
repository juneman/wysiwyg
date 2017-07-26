/* eslint react/display-name: 0 */  // Not exporting React components here
import React from 'react';
import { convertToHTML as draftConvertToHTML, convertFromHTML as draftConvertFromHTML } from 'draft-convert';
import { LinkDecorator, linkToEntity, entityToLink } from '../../helpers/draft/LinkDecorator';
import { CompositeDecorator } from 'draft-js';

export const CUSTOM_STYLE_PREFIX_COLOR = 'COLOR_';

export const decorator = new CompositeDecorator([
  LinkDecorator
]);

export function convertFromHTML(htmlContent) {
  return draftConvertFromHTML({
    htmlToStyle: (nodeName, node, currentStyle) => {
      if (nodeName === 'span' && node.style.color) {
        return currentStyle.add(`${CUSTOM_STYLE_PREFIX_COLOR}${node.style.color}`);
      } else {
        return currentStyle;
      }
    },
    htmlToEntity: (nodeName, node) => {
      const entity = linkToEntity(nodeName, node);
      return entity;
    },
    textToEntity: () => {
      return [];
    },
    htmlToBlock: (nodeName, node) => {
      let nodeType = 'unstyled';
      switch(nodeName) {
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

export function convertToHTML(editorState) {
  return draftConvertToHTML({
    styleToHTML: (style) => {
      if (style.indexOf(CUSTOM_STYLE_PREFIX_COLOR) === 0) {
        return <span style={{color: style.substr(CUSTOM_STYLE_PREFIX_COLOR.length)}} />;
      }
    },
    blockToHTML: (block) => {
      if (block.data && Object.keys(block.data).length) {
        const styleProps = {
          style: block.data
        };

        switch(block.type) {
          case 'header-one':
            return <h1 {...styleProps} />;
          case 'header-two':
            return <h2 {...styleProps} />;
          case 'header-three':
            return <h3 {...styleProps} />;
          case 'header-four':
            return <h4 {...styleProps} />;
          case 'header-five':
            return <h5 {...styleProps} />;
          default:
            return <p {...styleProps} />;
        }
      }
    },
    entityToHTML: (entity, originalText) => {
      originalText = entityToLink(entity, htmlDecode(originalText));
      return originalText;
    }
  })(editorState.getCurrentContent());
}

function htmlDecode(input) {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

export function customStyleFn(style) {
  const styleNames = style.toJS();
  return styleNames.reduce((styles, styleName) => {
    if(styleName.startsWith(CUSTOM_STYLE_PREFIX_COLOR)) {
      styles.color = styleName.split(CUSTOM_STYLE_PREFIX_COLOR)[1];
    }
    return styles;
  }, {});
}

export function blockStyleFn(contentBlock) {
  const { textAlign } = contentBlock.getData().toJS();
  if (textAlign) {
    return `align-${textAlign}`;
  }
}
