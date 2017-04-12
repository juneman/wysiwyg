import { Map } from 'immutable';

export function convertBoundingBox(boundingBox) {
  if (!boundingBox || !boundingBox.height) {
    return Map();
  }
  let { bottom, height, left, right, top, width } = boundingBox;
  return Map({
    bottom,
    height,
    left: window.scrollX + left,
    right,
    top: window.scrollY + top,
    width
  });
}

export function flattenHTML(htmlString) {
  if (!htmlString || !htmlString.length) {
    return htmlString;
  }
  return htmlString.replace(/ {2}/g, '').replace(/(\r\n|\r|\n)/g, '');
}