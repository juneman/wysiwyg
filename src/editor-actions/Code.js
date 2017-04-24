import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import AceEditor from 'react-ace';
import 'brace/mode/html';
import 'brace/theme/github';

import Toolbar from '../components/Toolbar';

import CodeButton from '../icons/CodeButton';

export default class Code extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
      content: ''
    };
  }

  componentDidMount() {
    const content = this.props.persistedState.get('content') || '';
    this.setState({
      content
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.persistedState !== nextProps.persistedState || (this.state.showDropdown !== nextState.showDropdown)) {
      return true;
    }
    return false;
  }

  render() {
    const { showDropdown } = this.state;
    const { persistedState, title } = this.props;
    const content = persistedState.get('content');

    const buttonProps = {
      hideBackground: true,
      color: '#303030',
      clickColor: '#333',
      activeColor: '#C0C0C0'
    };

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      width: 600,
      height: 410,
      padding: 10
    };

    const titleStyles = {
      textTransform: 'uppercase',
      fontSize: 'smaller',
      color: '#808080',
      marginBottom: 20
    };

    const dropdownNodes = showDropdown ? (
      <Toolbar style={dropdownStyles}>
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
          <button className="btn" onClick={(e) => this.handleSave(e)}>Save</button>
        </div>
      </Toolbar>
    ) : null;

    return (
      <div>
        <CodeButton onClick={() => this.toggleDropdown()} {...buttonProps} />
        { dropdownNodes }
      </div>
    );
  }

  toggleDropdown() {
    const { showDropdown } = this.state;
    this.setState({
      showDropdown: !showDropdown
    });
  }

  handleSave(e) {
    e.preventDefault();
    const { localState, persistedState, onChange } = this.props;
    const { content } = this.state;
    
    const newPersistedState = persistedState.set('content', content);
    
    this.setState({
      showDropdown: false
    });

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
  title: PropTypes.string.isRequired
};
