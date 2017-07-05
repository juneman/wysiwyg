import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import sanitizeHtml from 'sanitize-html';

import AceEditor from 'react-ace';
import 'brace/mode/html';
import 'brace/theme/monokai';

import { secondaryMenuTitleStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';

export default class Code extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      content: '',
      isSaved: false
    };
  }

  componentDidMount() {
    const content = this.props.persistedState.get('content') || '';
    this.setState({
      content
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.hasRoomToRenderBelow !== nextProps.hasRoomToRenderBelow) {
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
    const { persistedState, title, aceEditorConfig, localState, hasRoomToRenderBelow } = this.props;
    const { isSaved } = this.state;
    const content = localState.get('content') || persistedState.get('content');
    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      padding: 10
    };
    if (!hasRoomToRenderBelow) {
      dropdownStyles.bottom = dropdownStyles.top;
      delete dropdownStyles.top;
    } 

    const titleStyles = secondaryMenuTitleStyle;

    const aceEditorProps = Object.assign({}, {
      name: 'code-editor',
      editorProps: { $blockScrolling: true },
      showGutter: false,
      key: "helloEditor",
      showPrintMargin: false,
      width: '400px',
      height: '150px'
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
          <div style={titleStyles}>{title}</div>
          <AceEditor
            { ...aceEditorProps }
          />
          <div style={{textAlign: 'right', marginTop: 10}}>
            <span style={{color:'rgba(255,255,255,0.7)'}}>{ isSaved ? 'Saved' : 'Waiting to save'}</span>
          </div>
        </Menu>
      </div>
    );
  }

  handleSave() {
    const { localState, persistedState, onChange, sanitizeHtmlConfig } = this.props;
    const { content, isSaved } = this.state;

    const cleanHtml = sanitizeHtml(content, sanitizeHtmlConfig.toJS());
    if (cleanHtml != content) {
      if (isSaved) {
        const newLocalState = localState.set('content', content);

        onChange({
          localState: newLocalState,
          persistedState
        });

        this.setState({ isSaved: false });
      }
      return;
    }
    const newPersistedState = persistedState.set('content', cleanHtml);
    const newLocalState = localState.set('content', cleanHtml);
    onChange({
      localState: newLocalState,
      persistedState: newPersistedState
    });
    this.setState({ isSaved: true });
  }

}

Code.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  sanitizeHtmlConfig: PropTypes.instanceOf(Map),
  aceEditorConfig: PropTypes.instanceOf(Map).isRequired,
  hasRoomToRenderBelow: PropTypes.bool
};
