import React from "react";
import PropTypes from "prop-types";
import { Map } from "immutable";

import InlineActionsLayer from "../../components/InlineActionsLayer";
import HyperlinkTooltip from "../../editor-inline-actions/HyperlinkTooltip";

const actions = [
  {
    Component: HyperlinkTooltip,
    name: HyperlinkTooltip.actionName
  }
];

export default function RichTextInlineActions(props) {
  return <InlineActionsLayer actions={actions} {...props} />;
}

RichTextInlineActions.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
