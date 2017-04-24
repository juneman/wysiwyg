import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Toolbar from '../../components/Toolbar';
import Bold from '../../editor-actions/Bold';
import Italic from '../../editor-actions/Italic';
import FontColor from '../../editor-actions/FontColor';
import SelectionFieldOptions from '../../editor-actions/SelectionFieldOptions';

export default class TextInputToolbar extends React.Component {

  render() {
    const { localState, persistedState, onChange } = this.props;

    const toolbarProps = {
      localState,
      persistedState,
      onChange
    };

    return (
      <Toolbar>
        <div style={{display: 'grid'}}>
          <div style={{gridColumn: 1, gridRow: 1}}><Bold {...toolbarProps} /></div>
          <div style={{gridColumn: 2, gridRow: 1}}><Italic {...toolbarProps} /></div>
          <div style={{gridColumn: 3, gridRow: 1}}><FontColor {...toolbarProps} /></div>
          <div style={{gridColumn: 4, gridRow: 1}}><SelectionFieldOptions {...toolbarProps} /></div>
        </div>
      </Toolbar>
    );
  }
}

TextInputToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
