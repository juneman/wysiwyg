// This component was mostly scooped from the react-color library with the added
// getWindow function to be compatible with iframes
import React, { Component, PureComponent } from "react";
import reactCSS from "reactcss";
import { hue } from "../../helpers/color";

export class Hue extends (PureComponent || Component) {
  componentWillUnmount() {
    this.unbindEventListeners();
  }

  handleChange = (e, skip) => {
    const change = hue.calculateChange(e, skip, this.props, this.container, true);
    change && this.props.onChange && this.props.onChange(change, e);
  };

  handleMouseDown = e => {
    this.handleChange(e, true);
    const win = this.getWindow();
    if (win) {
      win.addEventListener("mousemove", this.handleChange);
      win.addEventListener("mouseup", this.handleMouseUp);
    }
  };

  handleMouseUp = () => {
    this.unbindEventListeners();
  };

  unbindEventListeners() {
    const win = this.getWindow();
    if (win) {
      win.removeEventListener("mousemove", this.handleChange);
      win.removeEventListener("mouseup", this.handleMouseUp);
    }
  }

  getWindow() {
    if (this.container && this.container.ownerDocument) {
      return this.container.ownerDocument.defaultView;
    }
    return null;
  }

  render() {
    const { direction = "horizontal" } = this.props;

    const styles = reactCSS(
      {
        default: {
          hue: {
            absolute: "0px 0px 0px 0px",
            borderRadius: this.props.radius,
            boxShadow: this.props.shadow
          },
          container: {
            padding: "0 2px",
            position: "relative",
            height: "100%"
          },
          pointer: {
            position: "absolute",
            left: `${this.props.hsl.h * 100 / 360}%`
          },
          slider: {
            marginTop: "1px",
            width: "4px",
            borderRadius: "1px",
            height: "8px",
            boxShadow: "0 0 2px rgba(0, 0, 0, .6)",
            background: "#fff",
            transform: "translateX(-2px)"
          }
        },
        vertical: {
          pointer: {
            left: "0px",
            top: `${-(this.props.hsl.h * 100 / 360) + 100}%`
          }
        }
      },
      { vertical: direction === "vertical" }
    );

    return (
      <div style={styles.hue}>
        <div
          className={`hue-${direction}`}
          style={styles.container}
          ref={container => (this.container = container)}
          onMouseDown={this.handleMouseDown}
          onTouchMove={this.handleChange}
          onTouchStart={this.handleChange}
        >
          <style>{`
            .hue-horizontal {
              background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0
                33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
              background: -webkit-linear-gradient(to right, #f00 0%, #ff0
                17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
            }

            .hue-vertical {
              background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%,
                #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
              background: -webkit-linear-gradient(to top, #f00 0%, #ff0 17%,
                #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
            }
          `}</style>
          <div style={styles.pointer}>
            {this.props.pointer ? (
              <this.props.pointer {...this.props} />
            ) : (
              <div style={styles.slider} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Hue;
