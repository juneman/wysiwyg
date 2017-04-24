import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Toolbar from '../../components/Toolbar';
import AlignmentInline from '../../editor-actions/AlignmentInline';
import Bold from '../../editor-actions/Bold';
import Italic from '../../editor-actions/Italic';
import FontColor from '../../editor-actions/FontColor';
import TextStyle from '../../editor-actions/TextStyle';
import HyperlinkInline from '../../editor-actions/HyperlinkInline';
import List from '../../editor-actions/List';
import UserProperty from '../../editor-actions/UserProperty';

export default class RichTextToolbar extends React.Component {

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
          <div style={{gridColumn: 3, gridRow: 1}}><AlignmentInline {...toolbarProps} /></div>
          <div style={{gridColumn: 4, gridRow: 1}}><FontColor {...toolbarProps} /></div>
          <div style={{gridColumn: 5, gridRow: 1}}><TextStyle {...toolbarProps} /></div>
          <div style={{gridColumn: 6, gridRow: 1}}><HyperlinkInline {...toolbarProps} /></div>
          <div style={{gridColumn: 7, gridRow: 1}}><List {...toolbarProps} /></div>
          <div style={{gridColumn: 8, gridRow: 1}}><UserProperty {...toolbarProps} /></div>
        </div>
      </Toolbar>
    );
  }

}

RichTextToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
