export const saturation = {
  calculateChange: (e, skip, props, container, fixed) => {
    e.preventDefault();
    const win = getWindow();
    const {
      width: containerWidth,
      height: containerHeight
    } = container.getBoundingClientRect();
    const x = typeof e.pageX === "number" ? e.pageX : e.touches[0].pageX;
    const y = typeof e.pageY === "number" ? e.pageY : e.touches[0].pageY;
    const scrollXOffset = fixed ? 0 : win.pageXOffset;
    const scrollYOffset = fixed ? 0 : win.pageYOffset;
    let left = x - (container.getBoundingClientRect().left + scrollXOffset);
    let top = y - (container.getBoundingClientRect().top + scrollYOffset);

    if (left < 0) {
      left = 0;
    } else if (left > containerWidth) {
      left = containerWidth;
    } else if (top < 0) {
      top = 0;
    } else if (top > containerHeight) {
      top = containerHeight;
    }

    const saturation = left * 100 / containerWidth;
    const bright = -(top * 100 / containerHeight) + 100;

    return {
      h: props.hsl.h,
      s: saturation,
      v: bright,
      a: props.hsl.a,
      source: "rgb"
    };
  }
};

export const hue = {
  calculateChange: (e, skip, props, container, fixed) => {
    e.preventDefault();
    const win = getWindow();
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const x = typeof e.pageX === "number" ? e.pageX : e.touches[0].pageX;
    const y = typeof e.pageY === "number" ? e.pageY : e.touches[0].pageY;
    const scrollXOffset = fixed ? 0 : win.pageXOffset;
    const scrollYOffset = fixed ? 0 : win.pageYOffset;
    const left = x - (container.getBoundingClientRect().left + scrollXOffset);
    const top = y - (container.getBoundingClientRect().top + scrollYOffset);

    if (props.direction === "vertical") {
      let h;
      if (top < 0) {
        h = 359;
      } else if (top > containerHeight) {
        h = 0;
      } else {
        const percent = -(top * 100 / containerHeight) + 100;
        h = 360 * percent / 100;
      }

      if (props.hsl.h !== h) {
        return {
          h,
          s: props.hsl.s,
          l: props.hsl.l,
          a: props.hsl.a,
          source: "rgb"
        };
      }
    } else {
      let h;
      if (left < 0) {
        h = 0;
      } else if (left > containerWidth) {
        h = 359;
      } else {
        const percent = left * 100 / containerWidth;
        h = 360 * percent / 100;
      }

      if (props.hsl.h !== h) {
        return {
          h,
          s: props.hsl.s,
          l: props.hsl.l,
          a: props.hsl.a,
          source: "rgb"
        };
      }
    }
    return null;
  }
};

function getWindow(el) {
  if (el && el.ownerDocument) {
    return el.ownerDocument.defaultView;
  }
  return window;
}
