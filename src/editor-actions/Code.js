import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import sanitizeHtml from 'sanitize-html';

import AceEditor from 'react-ace';
import 'brace/mode/html';
import 'brace/theme/github';

import { getButtonProps, secondaryMenuTitleStyle, buttonStyle } from '../helpers/styles/editor';
import Menu from '../components/Menu';

import CodeButton from '../icons/CodeButton';

export default class Code extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      content: ''
    };
  }

  componentDidMount() {
    const content = this.props.persistedState.get('content') || '';
    this.setState({
      content
    });
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.persistedState !== nextProps.persistedState || (this.props.isActive !== nextProps.isActive)) {
      return true;
    }
    return false;
  }

  render() {
    const { persistedState, title, isActive, aceEditorConfig } = this.props;
    const content = persistedState.get('content');

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      padding: 10
    };

    const titleStyles = secondaryMenuTitleStyle;

    const aceEditorProps = Object.assign({}, {
      name: 'code-editor',
      editorProps: { $blockScrolling: true },
      showGutter: false,
      showPrintMargin: false,
      width: '400px',
      height: '150px'
    },
      aceEditorConfig.toJS(), // Let the user override items above
    {
      mode: 'html',
      theme: 'github',
      onChange: (content) => this.setState({content}),
      focus: true,
      defaultValue: content
    });

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles} className="html-menu">
        <div style={titleStyles}>{title}</div>
        <AceEditor
          { ...aceEditorProps }
        />

        <div style={{textAlign: 'right', marginTop: 10}}>
          <button style={buttonStyle} onClick={(e) => this.handleSave(e)}>Save</button>
        </div>
      </Menu>
    ) : null;

    return (
      <div>
        <CodeButton onClick={() => this.toggleDropdown()} {...buttonProps} />
        { dropdownNodes }
      </div>
    );
  }

  toggleDropdown() {
    const { onToggleActive, isActive } = this.props;
    onToggleActive(!isActive);
  }

  handleSave(e) {
    if (e) {
      e.preventDefault();
    }
    const { localState, persistedState, onChange, onToggleActive, sanitizeHtmlConfig } = this.props;
    const { content } = this.state;

    const cleanHtml = sanitizeHtml(content, sanitizeHtmlConfig.toJS());
    const newPersistedState = persistedState.set('content', cleanHtml);
    
    onToggleActive(false);

    onChange({
      localState,
      persistedState: newPersistedState
    });
  }

}

Code.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  sanitizeHtmlConfig: PropTypes.instanceOf(Map),
  aceEditorConfig: PropTypes.instanceOf(Map).isRequired
};
