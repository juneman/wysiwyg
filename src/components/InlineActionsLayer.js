import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as editorActions from "../actions/editorActions";

class InlineActionsLayer extends React.Component {
  render() {
    const {
      currentActionName,
      currentActionState,
      actions,
      onChange,
      localState,
      persistedState,
      dispatch
    } = this.props;

    const { Component: InlineActionComponent } =
      actions.find(action => {
        return action.name === currentActionName;
      }) || {};

    const inlineActionProps = {
      localState,
      persistedState,
      onChange,
      onToggleActive: isActive => {
        dispatch(
          editorActions.toggleEditorInlineAction(
            currentActionName,
            isActive,
            currentActionState
          )
        );
      },
      onToggleEditorAction: (name, isActive) => {
        if (isActive) {
          dispatch(editorActions.toggleEditorAction(name, true));
        } else {
          dispatch(editorActions.toggleEditorActionIfCurrent(name, false));
        }
      }
    };

    return InlineActionComponent ? (
      <InlineActionComponent {...inlineActionProps} {...currentActionState} />
    ) : (
      <div />
    );
  }
}

InlineActionsLayer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  currentActionName: PropTypes.string,
  currentActionState: PropTypes.object
};

function mapStateToProps(state) {
  return {
    currentActionName: state.editor.get("activeEditorInlineAction").get("name"),
    currentActionState: state.editor
      .get("activeEditorInlineAction")
      .get("state")
  };
}

export default connect(mapStateToProps)(InlineActionsLayer);
