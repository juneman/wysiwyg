import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

export default class Toolbar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedAction: null
    };
  }

  render() {
    const { localState, persistedState, onChange, editorActions } = this.props;
    const { selectedAction } = this.state;

    return (
      <div style={{display: 'grid'}}>
        { editorActions.map((editorAction, index) => {
          const toolbarProps = {
            localState,
            persistedState,
            onChange,
            isActive: (selectedAction === editorAction.name),
            onToggleActive: (isActive) => {
              this.setState({
                selectedAction: (isActive) ? editorAction.name : null
              });
            }
          };
          return (<div key={editorAction.name} style={{gridColumn: index + 1, gridRow: 1}}><editorAction.Component {...editorAction.props} {...toolbarProps} /></div>);
        })}
      </div>
    );
  }

}

Toolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  editorActions: PropTypes.array.isRequired
};
