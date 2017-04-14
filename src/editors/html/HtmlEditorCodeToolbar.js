import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import AceEditor from 'react-ace';
import 'brace/mode/html';
import 'brace/theme/github';

export default class HtmlEditorCodeToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ''
    };
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.persistedState !== nextProps.persistedState) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    const content = this.props.persistedState.get('content') || '';
    this.setState({
      content
    });
  }

  render() {
    const { persistedState, title } = this.props;
    const content = persistedState.get('content');

    const formStyles = {
      width: 600,
      height: 400,
      margin: 10
    };
    const titleStyles = {
      textTransform: 'uppercase',
      fontSize: 'smaller',
      color: '#808080',
      marginBottom: 10
    };

    return (
      <div style={formStyles}>
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

      </div>
    );
  }

  handleSave(e) {
    e.preventDefault();
    const { localState, persistedState, onSave } = this.props;
    const { content } = this.state;
    
    const newPersistedState = persistedState.set('content', content);
    const newLocalState = localState.delete('selectedToolbar');
      
    onSave({
      localState: newLocalState,
      persistedState: newPersistedState
    });
  }
}

HtmlEditorCodeToolbar.propTypes = {
  onSave: PropTypes.func,
  localState: PropTypes.instanceOf(Map),
  persistedState: PropTypes.instanceOf(Map),
  title: PropTypes.string.isRequired
};
