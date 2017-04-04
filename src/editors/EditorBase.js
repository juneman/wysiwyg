import React from 'react';

export default class EditorBase extends React.Component {
  componentDidMount() {
    this.setState({
      content: this.props.content || (this.state && this.state.content)
    });
  }
}

EditorBase.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  content: React.PropTypes.string.isRequired
};

