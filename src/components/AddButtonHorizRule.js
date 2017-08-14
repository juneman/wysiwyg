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
      isHoveringOverAddButton: false
    };

    this.handleAddNew = this.handleAddNew.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.setBoundingBox();
  }

  componentDidUpdate(prevProps, prevState) {
    const { showEditorSelector } = this.state;

    const editor = document.getElementById('appcues-host').shadowRoot.firstChild;

    const isEditorSelectorClosed = prevState.showEditorSelector && !showEditorSelector;
    const isEditorSelectorOpen = !prevState.showEditorSelector && showEditorSelector;

    if (isEditorSelectorOpen) {
      editor.addEventListener('click', this.onClick, true);
    } else if (isEditorSelectorClosed) {
      editor.removeEventListener('click', this.onClick, true);
    }

  }

  componentWillUnmount() {
    const editor = document.getElementById('appcues-host').shadowRoot.firstChild;
    editor.removeEventListener('click', this.onClick);
  }

  render() {
    const { onSelectEditorType, internalAllowedEditorTypes, isHoveringOverContainer } = this.props;
    const { showEditorSelector, isHoveringOverAddButton } = this.state;

    const hrStyle = {
      height: 1,
      border: 0,
      position: 'relative',
      top: -20,
      width: '100%',
      zIndex: 2,
      padding: 0,
      margin: 0,
      pointerEvents: 'none',
      background: '#00b850',
      transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
      opacity: `${(isHoveringOverAddButton) ? .3 : .25}`,
      transform: `scale(1, ${(isHoveringOverAddButton) ? 3 : 1})`
    };

    const containerStyle = {
      position: 'absolute',
      pointerEvents: 'none',
      left: 0,
      right: 0,
      opacity: (isHoveringOverContainer || showEditorSelector) ? 1 : 0,
      transition: 'opacity 0.15s ease-out',
      zIndex: 100
    };

    return (
      <div className="add-row" style={containerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', zIndex: 10 }} ref={(el) => this.wrapper = el}>
          <div
            style={{ cursor: 'pointer', zIndex: 10, transform: `scale(${ (isHoveringOverAddButton || showEditorSelector) ? 1 : 0.8 })`, transition: 'all 0.15s ease-out' }}
            onMouseEnter={() => this.setState({ isHoveringOverAddButton: true })}
            onMouseLeave={() => this.setState({ isHoveringOverAddButton: false })}
            ref={(el) => this.addButton = el}
          >
            <AddButtonContainer
              onSelectEditorType={ onSelectEditorType }
              onClick={ this.handleAddNew }
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

  onClick(e) {
    e.preventDefault();
    const { showEditorSelector, isHoveringOverAddButton } = this.state;
    const editor = document.getElementById('appcues-host').shadowRoot.firstChild;
    
    if (ReactDOM.findDOMNode(editor).contains(e.path[0]) && showEditorSelector && !isHoveringOverAddButton) {

      this.setState({showEditorSelector: false});
    }
  }

  handleAddNew() {
    const { showEditorSelector } = this.state;

    this.setState({ showEditorSelector: !showEditorSelector });
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
  isHoveringOverContainer: PropTypes.bool
};
