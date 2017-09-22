import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import sanitizeHtml from 'sanitize-html';

import AceEditor from 'react-ace';
import 'brace/mode/html';
import 'brace/theme/monokai';

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
      leftOffset: 0,
      content: '',
      isSaved: true
    };
  }

  componentDidMount() {
    const content = this.props.persistedState.get('content') || '';
    
    if (this.html) {
      this.setAceEditorPosition();
    }

    this.setState({
      content
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.hasRoomToRenderBelow !== nextState.hasRoomToRenderBelow) {
      return true;
    }
    if (this.state.hasRoomToRenderRight !== nextState.hasRoomToRenderRight) {
      return true;
    }
    if (this.props.persistedState !== nextProps.persistedState) {
      return true;
    }
    if (this.props.localState !== nextProps.localState) { return true; }
    if (this.state.isSaved !== nextState.isSaved) { return true; }
    return false;
  }

  render() {
    const { persistedState, title, aceEditorConfig, localState } = this.props;
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

    const aceEditorProps = Object.assign({}, {
      name: 'code-editor',
      editorProps: { $blockScrolling: false },
      showGutter: false,
      key: "helloEditor",
      wrapEnabled: true,
      showPrintMargin: false,
      width: '700px',
      height: '200px'
    },
      aceEditorConfig.toJS(), // Let the user override items above
    {
      mode: 'html',
      theme: 'monokai',
      onChange: (content) => {this.setState({content}, this.handleSave);},
      focus: true,
      value: content
    });

    return (
      <div>
        <Menu style={{ ...dropdownStyles, backgroundColor: '#272822' }} className="html-menu">
          <div ref={(el) => this.html = el} style={titleStyles}>{title}</div>
          <AceEditor
            { ...aceEditorProps }
          />
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
    const updates = {};
    const hasRoomToRenderBelow = ((window.innerHeight - this.html.parentElement.getBoundingClientRect().top) > MENU_HEIGHT_ALLOWANCE);
    updates.hasRoomToRenderBelow = hasRoomToRenderBelow;

    const hasRoomToRenderRight = ((window.innerWidth - this.html.parentElement.getBoundingClientRect().right) > MENU_WIDTH_ALLOWANCE);
    updates.hasRoomToRenderRight = hasRoomToRenderRight;

    if (!hasRoomToRenderRight) {
      const leftOffset = window.innerWidth - this.html.parentElement.getBoundingClientRect().right;
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
  aceEditorConfig: PropTypes.instanceOf(Map).isRequired,
  hasRoomToRenderBelow: PropTypes.bool
};
