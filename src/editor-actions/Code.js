import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

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
    const { persistedState, title, isActive } = this.props;
    const content = persistedState.get('content');

    const buttonProps = getButtonProps(isActive);

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      width: 600,
      height: 410,
      padding: 10
    };

    const titleStyles = secondaryMenuTitleStyle;

    const dropdownNodes = isActive ? (
      <Menu style={dropdownStyles}>
        <div style={titleStyles}>{title}</div>
        <AceEditor
          mode="html"
          onChange={(content) => this.setState({content})}
          name="code-editor"
          theme="github"
          editorProps={{$blockScrolling: true}}
          width="595px"
          height="330px"
          showGutter={false}
          showPrintMargin={false}
          focus={true}
          defaultValue={content}
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
    e.preventDefault();
    const { localState, persistedState, onChange, onToggleActive } = this.props;
    const { content } = this.state;
    
    const newPersistedState = persistedState.set('content', content);
    
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
  isActive: PropTypes.bool.isRequired
};
