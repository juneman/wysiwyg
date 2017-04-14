import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import HtmlEditorCodeToolbar from './HtmlEditorCodeToolbar';
import CodeButton from '../../icons/CodeButton';

export default class HtmlEditorToolbar extends React.Component {

  render() {
    const { localState } = this.props;

    const buttonProps = {
      hideBackground: true,
      color: '#808080',
      clickColor: '#333',
      activeColor: '#5e9bff'
    };

    const selectedToolbar = localState.get('selectedToolbar');

    return (
      <div>
        <CodeButton onClick={() => this.handleShowEditor()} isActive={(selectedToolbar === 'codeEditor')} {...buttonProps} />
      </div>
    );
  }

  handleShowEditor() {
    const { onShowSecondaryToolbar, onChange, localState, persistedState, CodeToolbarElement } = this.props;
    const newLocalState = localState.set('selectedToolbar', 'codeEditor');
    onChange({
      localState: newLocalState,
      persistedState
    });

    // If we have an override, just send that up
    if (CodeToolbarElement) {
      return onShowSecondaryToolbar(CodeToolbarElement);
    }
    
    onShowSecondaryToolbar(
      <HtmlEditorCodeToolbar
        title="Paste in your HTML code below"
      />
    );
  }

}

HtmlEditorToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  onShowSecondaryToolbar: PropTypes.func.isRequired,
  CodeToolbarElement: PropTypes.element
};
