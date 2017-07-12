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
      showEditorSelector: false,
      hoveringAddButton: false
    };

    this.handleAddNew = this.handleAddNew.bind(this);
  }

  componentDidMount() {
    this.setBoundingBox();
  }

  render() {
    const { onSelectEditorType, internalAllowedEditorTypes, isHovering } = this.props;
    const { showEditorSelector, hoveringAddButton } = this.state;

    const hrStyle = {
      height: 1,
      border: 0,
      position: 'relative',
      top: -20,
      width: '100%',
      zIndex: 2,
      padding: 0,
      margin: 0,
      background: '#00b850',
      transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
      opacity: `${(hoveringAddButton) ? .3 : .25}`,
      transform: `scale(1, ${(hoveringAddButton) ? 3 : 1})`
    };

    const containerStyle = {
      position: 'absolute',
      left: 0,
      right: 0,
      opacity: (isHovering || showEditorSelector) ? 1 : 0,
      transition: 'opacity 0.15s ease-out'
    };

    return (
      <div className="add-row" style={containerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', zIndex: 10 }} ref={(el) => this.wrapper = el}>
          <div
            id="addBtn"
            style={{ cursor: 'pointer', zIndex: 10, transform: `scale(${(hoveringAddButton || showEditorSelector) ? 1 : 0.8})`, transition: 'all 0.15s ease-out' }}
            onMouseEnter={() => this.setState({hoveringAddButton: true})}
            onMouseLeave={() => this.setState({hoveringAddButton: false})}
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
  isHovering: PropTypes.bool
};
