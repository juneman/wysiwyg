import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import AddButtonContainer from './AddButtonContainer';

/**
 * A React component renders an Add button to
 * add a new row to the Canvas
 * @class
 */
export default class AddButtonHorizRule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditorSelector: false
    };

    this.handleAddNew = this.handleAddNew.bind(this);
  }

  componentDidMount() {
    this.setBoundingBox();
  }

  render() {
    const { onSelectEditorType, internalAllowedEditorTypes } = this.props;
    const { showEditorSelector } = this.state;

    const hrStyle = {
      height: 1,
      border: 0,
      position: 'relative',
      top: -20,
      width: 'calc(100% + 40px)',
      zIndex: 2,
      padding: 0,
      margin: 0,
      backgroundImage: 'linear-gradient(to right, transparent 0%, #00b850 50%, transparent)'
    };

    return (
      <div className="add-row" style={{ position: 'absolute', left: 0, right: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', zIndex: 10 }} ref={(el) => this.wrapper = el}>
          <div
            id="addBtn"
            style={{ cursor: 'pointer' }}
            ref={(el) => this.addButton = el}
          >
            <AddButtonContainer
              onSelectEditorType={ onSelectEditorType }
              onClick={this.handleAddNew}
              showEditorSelector={ showEditorSelector }
              internalAllowedEditorTypes={ internalAllowedEditorTypes }
              shadow={false}
            />

          </div>
          <hr style={hrStyle} />
        </div>
      </div>
    );
  }

  handleAddNew() {
    this.setState({ showEditorSelector: !this.state.showEditorSelector });
  }

  setBoundingBox() {
    if (!this.addButton) {
      return;
    }
  }
}

AddButtonHorizRule.propTypes = {
  onSelectEditorType: PropTypes.func.isRequired,
  internalAllowedEditorTypes: PropTypes.instanceOf(List).isRequired,
  // isHover: PropTypes.any
};
