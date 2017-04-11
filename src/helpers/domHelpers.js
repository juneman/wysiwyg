export function convertBoundingBox(boundingBox) {
  if (!boundingBox || !boundingBox.height) {
    return {};
  }
  let { bottom, height, left, right, top, width } = boundingBox;
  return {
    bottom,
    height,
    left,
    right,
    top,
    width
  };
}