import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Toolbar from '../../components/Toolbar';
import ImageUpload from '../../editor-actions/ImageUpload';
import FontColor from '../../editor-actions/FontColor';

export default class HeroToolbar extends React.Component {
  
  render() {
    const { localState, persistedState, onChange, canvasPosition } = this.props;

    const toolbarProps = {
      localState,
      persistedState,
      onChange,
      canvasPosition
    };

    return (
      <Toolbar>
        <div style={{display: 'grid'}}>
          <div style={{gridColumn: 1, gridRow: 1}}><ImageUpload {...toolbarProps} /></div>
          <div style={{gridColumn: 2, gridRow: 1}}><FontColor {...toolbarProps} /></div>
        </div>
      </Toolbar>
    );
  }
}

HeroToolbar.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  canvasPosition: PropTypes.instanceOf(Map).isRequired
};
