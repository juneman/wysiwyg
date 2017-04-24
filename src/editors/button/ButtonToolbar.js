import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Toolbar from '../../components/Toolbar';
import AlignmentBlock from '../../editor-actions/AlignmentBlock';
import Bold from '../../editor-actions/Bold';
import Italic from '../../editor-actions/Italic';
import FontColor from '../../editor-actions/FontColor';
import BackgroundColor from '../../editor-actions/BackgroundColor';
import ButtonAction from '../../editor-actions/ButtonAction';
import HyperlinkBlock from '../../editor-actions/HyperlinkBlock';
import ButtonStyles from '../../editor-actions/ButtonStyles';

export default class ButtonToolbar extends React.Component {

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
          <div style={{gridColumn: 3, gridRow: 1}}><AlignmentBlock {...toolbarProps} /></div>
          <div style={{gridColumn: 4, gridRow: 1}}><FontColor {...toolbarProps} /></div>
          <div style={{gridColumn: 5, gridRow: 1}}><BackgroundColor {...toolbarProps} /></div>
          <div style={{gridColumn: 6, gridRow: 1}}><HyperlinkBlock {...toolbarProps} /></div>
          <div style={{gridColumn: 7, gridRow: 1}}><ButtonAction {...toolbarProps} /></div>
          <div style={{gridColumn: 8, gridRow: 1}}><ButtonStyles {...toolbarProps} /></div>
        </div>
      </Toolbar>
    );
  }

}

ButtonToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
