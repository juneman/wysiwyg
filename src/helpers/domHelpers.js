import { Map } from 'immutable';

export function convertBoundingBox(boundingBox) {
  if (!boundingBox || !boundingBox.height) {
    return Map();
  }
  let { bottom, height, left, right, top, width } = boundingBox;
  return Map({
    bottom: window.scrollY + bottom,
    left: window.scrollX + left,
    right: window.scrollX + right,
    top: window.scrollY + top,
    height,
    width
  });
}

export function flattenHTML(htmlString) {
  if (!htmlString || !htmlString.length) {
    return htmlString;
  }
  return htmlString.replace(/ {2}/g, '').replace(/(\r\n|\r|\n)/g, '');
}