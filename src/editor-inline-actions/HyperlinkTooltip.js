import React from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";

import HyperlinkInline from "../editor-actions/HyperlinkInline";
import { removeLinkEntityFromEditorState } from "../helpers/draft/entities";

export default class HyperlinkTooltip extends React.Component {
  constructor(props) {
    super(props);

    this.onClickOut = this.onClickOut.bind(this);
    this.onClickUnlink = this.onClickUnlink.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.onClickOut, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.onClickOut, true);
  }

  onClickOut(e) {
    const { onToggleActive, node } = this.props;

    // Ignore clicks that occur on the link or tooltip.
    // Shadow DOM changes the target of the event. Find the real target with
    // event.composedPath() or event.path.
    const tooltipEl = findDOMNode(this.tooltipEl);
    const linkEl = findDOMNode(node);
    const target =
      (e.composedPath && e.composedPath()[0]) || (e.path && e.path[0]) || null;
    if (
      (tooltipEl && tooltipEl.contains(target)) ||
      (linkEl && linkEl.contains(target))
    ) {
      return;
    }

    onToggleActive(false);
  }

  onClickUnlink() {
    const {
      onToggleEditorAction,
      onToggleActive,
      entityKey,
      localState,
      persistedState,
      onChange
    } = this.props;

    // Update the editor state with content state with the link entity removed.
    const newEditorState = removeLinkEntityFromEditorState(
      entityKey,
      localState.get("editorState")
    );
    onChange({
      localState: localState.set("editorState", newEditorState),
      persistedState
    });

    // Remove tooltip and toolbar link box if it's there.
    onToggleEditorAction(HyperlinkInline.actionName, false);
    onToggleActive(false);
  }

  onClickEdit() {
    const { onToggleEditorAction, onToggleActive } = this.props;

    // Show the toolbar's edit link box.
    onToggleEditorAction(HyperlinkInline.actionName, true);
    onToggleActive(false);
  }

  render() {
    const { top, left, href } = this.props;

    const containerStyle = {
      position: "fixed",
      top: `calc(${top}px + 1.8em)`,
      left: left,
      backgroundColor: "#333",
      color: "#ddd",
      whiteSpace: "nowrap",
      padding: "3px 10px",
      borderRadius: "3px",
      userSelect: "none",
      cursor: "default",
      fontSize: "0.9em",
      display: "flex",
      zIndex: 101
    };
    const arrowStyle = {
      ...containerStyle,
      position: "absolute",
      top: "-3px",
      left: "5px",
      width: "10px",
      height: "10px",
      transform: "rotate(45deg)",
      borderRadius: "2px",
      padding: 0
    };
    const separatorStyle = {
      opacity: 0.5,
      padding: "0 6px"
    };

    return (
      <div ref={el => (this.tooltipEl = el)} style={containerStyle}>
        <div style={arrowStyle} />
        <span
          style={{
            maxWidth: "150px",
            textOverflow: "ellipsis",
            display: "inline-block",
            overflow: "hidden"
          }}
        >
          {href}
        </span>
        <span style={separatorStyle}>|</span>
        <span style={{ cursor: "pointer" }} onClick={this.onClickEdit}>
          Edit
        </span>
        <span style={separatorStyle}>|</span>
        <span style={{ cursor: "pointer" }} onClick={this.onClickUnlink}>
          Unlink
        </span>
      </div>
    );
  }
}

HyperlinkTooltip.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  onToggleEditorAction: PropTypes.func.isRequired,
  node: PropTypes.node.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  entityKey: PropTypes.string.isRequired,
  href: PropTypes.string
};

HyperlinkTooltip.actionName = "inline-hyperlink-tooltip";
