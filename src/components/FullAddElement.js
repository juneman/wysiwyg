import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';

import { convertBoundingBox } from '../helpers/domHelpers';
import ImageUploader from './ImageUploader';
import AddButtonHorizRule from './AddButtonHorizRule';
import AddButtonContainer from './AddButtonContainer';

/**
 * A React component with an image drop or a click
 * to show the Editor selector. This is the main component
 * that renders when the Canvas is empty
 * @class
 */
export default class FullAddElement extends React.Component {
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
    const { baseHeight, allowedEditorTypes, onSelectEditorType, internalAllowedEditorTypes, onUpload } = this.props;
    const { showEditorSelector } = this.state;

    const fullScreenStyles = {
      backgroundColor: 'rgba(9,248,113,0.15)',
      color: '#0bdc66',
      textAlign: 'center',
      border: '2px dashed #0bdc66',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: 'calc(100% - 4px)',
      position: 'relative',
      borderRadius: 4
    };

    const centeredContainer = {
      height: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: 120
    };

    return (
      <div style={{ height: baseHeight, minHeight: 120 }}>
        { (allowedEditorTypes.isEmpty() || allowedEditorTypes.includes("Image")) ? (
          <div className="full-add" style={centeredContainer}>
            <ImageUploader
              disableClick={true}
              onUpload={(imageDetails) => onUpload(imageDetails)}
            >
              <div style={{ cursor: 'pointer', height: '100%' }} id="addBtn" onClick={ this.handleAddNew }>
                <div style={fullScreenStyles}>
                  <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span ref={(addButton) => this.addButton = addButton}>
                      <AddButtonContainer
                        onSelectEditorType={ onSelectEditorType }
                        showEditorSelector={ showEditorSelector }
                        internalAllowedEditorTypes={ internalAllowedEditorTypes }
                        shadow={false}
                      />
                    </span>
                    <div style={{color: 'hsl(146, 90%, 43%)'}}>
                      <div style={{fontSize: 'larger', marginTop: 10}}>Click here to add some content</div>
                      <div style={{fontSize: 'smaller', marginTop: 10}}>or drag and drop an image</div>
                    </div>
                  </div>
                </div>
              </div>
            </ImageUploader>
          </div>
        ): (
          <AddButtonHorizRule
            onSelectEditorType={ onSelectEditorType }
            internalAllowedEditorTypes={ internalAllowedEditorTypes }
          />
        )}
      </div>
    );
  }

  handleAddNew(e) {
    e.preventDefault();
    this.setState({ showEditorSelector: !this.state.showEditorSelector });
  }

  setBoundingBox() {
    console.log("updated");
    if (!this.addButton) {
      return;
    }
  }
}

FullAddElement.propTypes = {
  onUpload: PropTypes.func.isRequired,
  baseHeight: PropTypes.number,
  allowedEditorTypes: PropTypes.instanceOf(List).isRequired,
  onSelectEditorType: PropTypes.func.isRequired,
  internalAllowedEditorTypes: PropTypes.instanceOf(List).isRequired
};
