/* eslint react/display-name: 0 */  // Not exporting React components here
import React from 'react';
import { convertToHTML as draftConvertToHTML, convertFromHTML as draftConvertFromHTML } from 'draft-convert';
import { LinkDecorator, linkToEntity, entityToLink } from '../../helpers/draft/LinkDecorator';
import { EditorState, ContentState, CompositeDecorator } from 'draft-js';

export const CUSTOM_STYLE_PREFIX_COLOR = 'COLOR_';

export const decorator = new CompositeDecorator([
  LinkDecorator
]);


export function convertFromHTML(htmlContent) {
  return draftConvertFromHTML({
    htmlToStyle: (nodeName, node, currentStyle) => {
      if (nodeName === 'span' && node.style && node.style.color) {
        return currentStyle.add(`${CUSTOM_STYLE_PREFIX_COLOR}${node.style.color}`);
      }
      return currentStyle;
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

      if (node.style && node.style.textAlign) {
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

export function convertFromPastedHTML(htmlContent) {
  return draftConvertFromHTML({
    htmlToStyle: (nodeName, node, currentStyle) => {
      if (nodeName === 'span' && node.style && node.style.color && node.style.color !== 'inherit') {
        return currentStyle.add(`${CUSTOM_STYLE_PREFIX_COLOR}${node.style.color}`);
      }
      return currentStyle;
    },
    htmlToEntity: (nodeName, node) => {
      const entity = linkToEntity(nodeName, node);
      return entity;
    },
    htmlToBlock: (nodeName, node) => {
      const textContent = node.innerText;
      const isBlank = /^\s+$/.test(textContent);
      if (node.children.length < 1  && isBlank) return;

      // Don't convert table elements
      if (nodeName === 'table' || nodeName === 'tr' || nodeName === 'td' || nodeName === 'tbody') return;

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
        case 'br':
          return;
      }

      const isNotNestedBlock = nodeName !== 'ul' && nodeName !== 'ol' && nodeName !== 'blockquote';

      if (node.style && node.style.textAlign && isNotNestedBlock) {
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
      originalText = entityToLink(entity, originalText);
      return originalText;
    }
  })(editorState.getCurrentContent());
}

export function customStyleFn(style) {
  const styleNames = style.toJS();
  return styleNames.reduce((styles, styleName) => {
    if (styleName === 'CODE') {
      styles.color = '#c7254e';
      styles.padding = '2px 4px';
      styles.fontSize = '90%';
      styles.backgroundColor = 'rgba(249,242,244,0.7)';
      styles.borderRadius = '4px';
    }
    if (styleName === 'CODE' || styleName === 'PRE') {
      styles.fontFamily = 'Menlo,Monaco,Consolas,"Courier New",monospace';
    }
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

export function getResetSelection(editorState) {

  const firstBlock = editorState.getCurrentContent().getFirstBlock();
  const firstBlockKey = firstBlock.getKey();

  const currentSelection = editorState.getSelection();
  const newSelection = currentSelection
    .set('anchorKey', firstBlockKey)
    .set('focusKey', firstBlockKey)
    .set('anchorOffset', 0)
    .set('focusOffset', 0)
    .set('isBackward', false)

    return newSelection
}

export function trimContentWhitespace(editorState) {
  const currentContentState = editorState.getCurrentContent();
  const currentContentBlocks = currentContentState.getBlocksAsArray();
  const currentContentBlocksArray = currentContentBlocks.map( (block) => block.getKey());

  // const currentSelection = editorState.getSelection()
  // const key = currentSelection && currentSelection.getHasFocus() && currentSelection.getStartKey();
  // const currentBlock = currentContentState.getBlockForKey(key);

  // const newText = currentBlock && currentBlock.getText().trim();
  // const newBlock = currentBlock && currentBlock.set('text', newText);

  const newBlocks = currentContentBlocksArray.map((blockKey, i) => {
      const currentBlock = currentContentState.getBlockForKey(blockKey);
      console.log('LOGG current block', currentBlock)
      const newText = currentBlock && currentBlock.getText().trim();
      const newBlock = currentBlock && currentBlock.set('text', newText);
      return newBlock;

  });

  if (currentContentBlocks !== newBlocks) {
    const newContentState = ContentState.createFromBlockArray(newBlocks)

    return EditorState.createWithContent(newContentState, decorator)
  }
  
} 
// const newBlocks = currentContentBlocksArray.map((blockKey, i) => {
//       if (blockKey === key) {
//         return newBlock;
//       } else {
//         return currentContentBlocks[i];
//       }
//   });