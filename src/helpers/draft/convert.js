/* eslint react/display-name: 0 */  // Not exporting React components here
import React from 'react';
import { convertToHTML as draftConvertToHTML, convertFromHTML as draftConvertFromHTML } from 'draft-convert';
import { LinkDecorator, linkToEntity, entityToLink } from '../../helpers/draft/LinkDecorator';
import { CompositeDecorator, ContentState } from 'draft-js';

export const CUSTOM_STYLE_PREFIX_COLOR = 'COLOR_';
export const NBSP = "\xA0";
export const ZWSP = "\u200B";
export const ZWSP_RE = new RegExp(ZWSP, "g");

// https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
var boldValues = ['bold', 'bolder', '500', '600', '700', '800', '900'];
var notBoldValues = ['light', 'lighter', '100', '200', '300', '400'];

export const decorator = new CompositeDecorator([
  LinkDecorator
]);


export function convertFromHTML(htmlContent, convertOptions = {}) {
  // We add zero-width spaces (unicode 200B) to get the browser to render a line
  // break for a <br> and to give empty unstyled blocks (<p> tags) a size (see
  // convertToHTML() below). When editing, we don't really want those zero-width
  // spaces in there, so just remove them here.
  htmlContent = htmlContent.replace(ZWSP_RE, "");

  return draftConvertFromHTML({
    htmlToStyle: (nodeName, node, currentStyle) => {
      if (node instanceof HTMLElement && node.style) {
        currentStyle = currentStyle.withMutations(function(style) {
          const fontWeight = node.style.fontWeight;
          const fontStyle = node.style.fontStyle;
          const textDecoration = node.style.textDecoration;
          const fontColor = node.style.color;

          if (fontColor && fontColor !== 'inherit') {
            style.add(`${CUSTOM_STYLE_PREFIX_COLOR}${fontColor}`);
          }

          if (boldValues.indexOf(fontWeight) >= 0) {
            style.add('BOLD');
          }
          else if (notBoldValues.indexOf(fontWeight) >= 0) {
            style.remove('BOLD');
          }

          if (fontStyle === 'italic') {
            style.add('ITALIC');
          }
          else if (fontStyle === 'normal') {
            style.remove('ITALIC');
          }

          if (textDecoration === 'underline') {
            style.add('UNDERLINE');
          }

          if (textDecoration === 'line-through') {
            style.add('STRIKETHROUGH');
          }

          if (textDecoration === 'none') {
            style.remove('UNDERLINE');
            style.remove('STRIKETHROUGH');
          }

        }).toOrderedSet();
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
    },
    ...convertOptions
  })(htmlContent);
}

export function convertFromPastedHTML(htmlContent) {
  // Strip tabs from pasted content for now.
  htmlContent = htmlContent.replace(/\t/g, '');
  return convertFromHTML(htmlContent, {
    htmlToBlock: (nodeName, node) => {
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
          return false;
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
  });
}

export function convertToHTML(editorState) {
  const transformedContentState = ContentState.createFromBlockArray(
    editorState.getCurrentContent().getBlockMap().map(block =>
      block.update('text', text =>
        text
          // Replaces spaces following a newline with $nbsp;
          .replace(/\n /g, `\n${NBSP}`)
          // Replaces extra spaces with &nbsp; characters.
          .replace(/ {2,}/g, match => ` ${NBSP.repeat(match.length - 1)}`)
          // Replaces a leading space with &nbsp;
          .replace(/^ /, NBSP)
          // Replaces single trailing newlines with a newline and a zero-width
          // space, so that the <br> that the newline turns into actually
          // renders a line break in the browser. Normally a <br> followed by
          // nothing will collapse and not cause a line break to be rendered.
          // Adding the zero-width space (unicode 200B) after the <br> causes
          // the browser to render the line break. See this SO question for
          // more: https://stackoverflow.com/q/15008205
          .replace(/\n$/, `\n${ZWSP}`)
          // For empty paragraphs (created when the user hits Return but doesn't
          // add any actual text afterwards), the browser will render the <p>
          // tag with no height if there's no content inside. Add a zero-width
          // space inside so that it has content and has a size.
          .replace("", () => (block.getType() === 'unstyled' && block.getLength() === 0) ? ZWSP : "")
      )
    ).toArray()
  );
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
          case 'unordered-list-item':
            return {
              start: '<li>',
              end: '</li>',
              nestStart: '<ul>',
              nestEnd: '</ul>'
            };
          case 'ordered-list-item':
            return {
              start: '<li>',
              end: '</li>',
              nestStart: '<ol>',
              nestEnd: '</ol>'
            };
          default:
            return <p {...styleProps} />;
        }
      }
    },
    entityToHTML: (entity, originalText) => {
      originalText = entityToLink(entity, originalText);
      return originalText;
    }
  })(transformedContentState);
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
