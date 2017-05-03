'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertBoundingBox = convertBoundingBox;
exports.flattenHTML = flattenHTML;

var _immutable = require('immutable');

function convertBoundingBox(boundingBox) {
  if (!boundingBox || !boundingBox.height) {
    return (0, _immutable.Map)();
  }
  var bottom = boundingBox.bottom,
      height = boundingBox.height,
      left = boundingBox.left,
      right = boundingBox.right,
      top = boundingBox.top,
      width = boundingBox.width;

  return (0, _immutable.Map)({
    bottom: window.scrollY + bottom,
    left: window.scrollX + left,
    right: window.scrollX + right,
    top: window.scrollY + top,
    height: height,
    width: width
  });
}

function flattenHTML(htmlString) {
  if (!htmlString || !htmlString.length) {
    return htmlString;
  }
  return htmlString.replace(/ {2}/g, '').replace(/(\r\n|\r|\n)/g, '');
}