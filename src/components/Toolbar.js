import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';

import * as editorActions from '../actions/editorActions';
const MENU_HEIGHT_ALLOWANCE = 300;

/**
 * A React component renders a grid of toolbar actions
 * such as Bold, Italic, etc.
 * @class
 */
export class Toolbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hasRoomToRenderBelow: true
    };
  }

  componentDidMount() {
    this.setHasRoomToRenderBelow();
  }

  componentDidUpdate() {
    this.setHasRoomToRenderBelow();
  }

  setHasRoomToRenderBelow() {
    const hasRoomToRenderBelow = ((window.innerHeight - this.toolbar.getBoundingClientRect().top) > MENU_HEIGHT_ALLOWANCE);
    if (hasRoomToRenderBelow != this.state.hasRoomToRenderBelow){
      this.setState({ hasRoomToRenderBelow });
    } 
  }

  render() {
    const {
      localState,
      persistedState,
      onChange,
      actions,
      selectedAction,
      dispatch,
      cloudinary,
      userProperties,
      sanitizeHtmlConfig,
      aceEditorConfig
    } = this.props;

    const { hasRoomToRenderBelow } = this.state;

    const vertLine = {
      width: 1,
      height: 24,
      borderLeft: '1px solid #808080'
    };
    const lineContainer = {
      paddingTop: 6,
      paddingLeft: 3
    };

    return (
      <div ref={(el) => this.toolbar = el} name="Toolbar" style={{ display: 'grid' }}>
        { actions.map((editorAction, index) => {
          if (editorAction.separator) {
            return (
              <div key={`separator-${index}`} style={{gridColumn: index + 1, gridRow: 1, textAlign: 'center', width: 7}}>
                <div style={lineContainer}><div style={vertLine}></div></div>
              </div>
            );
          }
          const toolbarProps = {
            localState,
            persistedState,
            onChange,
            cloudinary,
            userProperties,
            sanitizeHtmlConfig,
            aceEditorConfig,
            hasRoomToRenderBelow,
            isActive: (selectedAction === editorAction.name),
            onToggleActive: (isActive) => {
              dispatch(editorActions.toggleEditorAction(editorAction.name, isActive));
            }
          };
          return (
            <div key={editorAction.name} style={{gridColumn: index + 1, gridRow: 1}}>
              <editorAction.Component {...editorAction.props} {...toolbarProps} />
            </div>
          );
        })}
      </div>
    );
  }
}
Toolbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  actions: PropTypes.array.isRequired,
  cloudinary: PropTypes.instanceOf(Map).isRequired,
  userProperties: PropTypes.instanceOf(List).isRequired,
  selectedAction: PropTypes.string,
  sanitizeHtmlConfig: PropTypes.instanceOf(Map).isRequired,
  aceEditorConfig: PropTypes.instanceOf(Map).isRequired
};

function mapStateToProps(state) {
  return {
    selectedAction: state.editor.get('activeEditorAction'),
    cloudinary: state.editor.get('cloudinary'),
    userProperties: state.editor.get('userProperties'),
    sanitizeHtmlConfig: state.editor.get('sanitizeHtmlConfig'),
    aceEditorConfig: state.editor.get('aceEditorConfig')
  };
};

export default connect(mapStateToProps)(Toolbar);
