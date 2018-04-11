import React from 'react';
import PropTypes from 'prop-types';
import { Map, is } from 'immutable';
import sanitizeHtml from 'sanitize-html';

import { secondaryMenuTitleStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';

const MENU_HEIGHT_ALLOWANCE = 400;
const MENU_WIDTH_ALLOWANCE = 250;

export default class Code extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hasRoomToRenderBelow: true,
      hasRoomToRenderRight: true,
      hasCheckedPosition: false,
      leftOffset: 0,
      content: '',
      isSaved: true
    };
  }

  componentDidMount() {
    const content = this.props.persistedState.get('content') || '';

    if (this._menuTitle) {
      this.setAceEditorPosition();
    }

    this.setState({
      content
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.hasCheckedPosition && this._html) { return true; }
    if (this.state.hasRoomToRenderBelow !== nextState.hasRoomToRenderBelow) { return true; }
    if (this.state.hasRoomToRenderRight !== nextState.hasRoomToRenderRight) { return true; }

    if (!is(this.props.persistedState, nextProps.persistedState)) { return true; }
    if (!is(this.props.localState, nextProps.localState)) { return true; }
    if (this.state.isSaved !== nextState.isSaved) { return true; }
    if (this.state.content !== nextState.content) { return true; }

    return false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.hasCheckedPosition && this._html) {
      this.setAceEditorPosition();
    }
  }

  render() {
    const { persistedState, title, localState } = this.props;
    const { isSaved, hasRoomToRenderBelow, hasRoomToRenderRight, leftOffset } = this.state;
    const content = localState.get('content') || persistedState.get('content');
    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      padding: 10,
      ['-webkit-font-smoothing']: 'antialiased'
    };

    if (!hasRoomToRenderBelow) {
      dropdownStyles.bottom = dropdownStyles.top;
      delete dropdownStyles.top;
    }

    if (!hasRoomToRenderRight) {
      dropdownStyles.left = leftOffset - 40;
    }

    const titleStyles = secondaryMenuTitleStyle;

    return (
      <div>
        <Menu style={{ ...dropdownStyles, backgroundColor: '#272822' }} className="html-menu">
          <div ref={(el) => this._menuTitle = el} style={titleStyles}>{title}</div>
          <textarea
              style={{ background: 'transparent', padding: '12px', border: '2px solid rgba(255,255,255,0.3)',
                       borderRadius: '4px', color: 'white', width: '700px',
                       height: '200px', outline: 'none', fontSize: '14px', fontFamily: 'Courier, monospace' }}
              value={ this.state.content }
              onChange={ (e) => { this.setState( { content: e.target.value }, this.handleSave ) }} />
          <div style={{textAlign: 'right', marginTop: 10}}>
            <span style={{ color:'rgba(255, 255, 255, 0.4)', fontSize: '10px', fontStyle: 'italic', marginRight: 7 }}>
              { isSaved ?
                <span>Saved</span>
                :
                <span style={{ color: 'rgba(255, 69, 0, 0.8)' }}>Warning — HTML is probably invalid</span>
              }
            </span>
          </div>
        </Menu>
      </div>
    );
  }

  setAceEditorPosition() {
    const { hasCheckedPosition } = this.state;

    const updates = { hasCheckedPosition: true };
    const hasRoomToRenderBelow = ((window.innerHeight - this._menuTitle.parentElement.getBoundingClientRect().top) > MENU_HEIGHT_ALLOWANCE);
    updates.hasRoomToRenderBelow = hasRoomToRenderBelow;

    const hasRoomToRenderRight = ((window.innerWidth - this._menuTitle.parentElement.getBoundingClientRect().right) > MENU_WIDTH_ALLOWANCE);
    updates.hasRoomToRenderRight = hasRoomToRenderRight;

    if (!hasRoomToRenderRight) {
      const leftOffset = window.innerWidth - this._menuTitle.parentElement.getBoundingClientRect().right;
      updates.leftOffset = leftOffset;
    }

    this.setState({ ...updates });
  }

  handleSave() {
    const { localState, persistedState, onChange, shouldDisableXSS, sanitizeHtmlConfig, overrideSanitizeHtmlConfig } = this.props;
    const { content, isSaved } = this.state;

    let mergedSanitizeHtmlConfig = { ...(overrideSanitizeHtmlConfig || sanitizeHtmlConfig.toJS()) };

    if (shouldDisableXSS) {
      mergedSanitizeHtmlConfig.exclusiveFilter =
        (node) => {
          const isNodeAScript = node.tag.toLowerCase() === 'script';
          const doesNodeHaveEventHandlers = Object.keys(node.attribs || {}).some((key) => key.startsWith("on"));
          const doesNodeHaveJavascriptContent = Object.keys(node.attribs || {}).some((key) => node.attribs[key].startsWith("javascript:"));
          return isNodeAScript || doesNodeHaveEventHandlers || doesNodeHaveJavascriptContent;
        };
    }

    const cleanHtml =
      sanitizeHtml(
        content, mergedSanitizeHtmlConfig
      ).replace(/[\t ]+\/\>/g, "/>");

    const trimmedContent = content.replace(/[\t ]+\/\>/g, "/>");
    let newLocalState;

    if (cleanHtml != trimmedContent) {
      if (isSaved) {
        this.setState({ isSaved: false });
      }

      newLocalState = localState.set('content', content);
    } else if (!isSaved) {
      this.setState({ isSaved: true });
    }

    const newPersistedState = persistedState.set('content', cleanHtml);
    newLocalState = newLocalState || localState.set('content', cleanHtml);
    onChange({
      localState: newLocalState,
      persistedState: newPersistedState
    });
  }

}

Code.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  sanitizeHtmlConfig: PropTypes.instanceOf(Map),
  shouldDisableXSS: PropTypes.bool.isRequired,
  overrideSanitizeHtmlConfig: PropTypes.object,
  hasRoomToRenderBelow: PropTypes.bool
};
