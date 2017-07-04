import React from 'react';
import PropTypes from 'prop-types';
import AddButton from '../icons/AddButton';
import EditorSelector from './EditorSelector';
import { List } from 'immutable';

export default class AddButtonContainer extends React.Component {
  render() {
    const { shadow, className, style, onSelectEditorType, internalAllowedEditorTypes, showEditorSelector } = this.props;

    const editorSelectorNode = showEditorSelector ? (
      <EditorSelector
        allowedEditorTypes={internalAllowedEditorTypes}
        onSelect={ onSelectEditorType }
      />
    ) : null;

    return (
      <div>
        <AddButton color="#00b850" shadow={ shadow } {...this.props}/>
        <div style={{ position: 'relative' }}>
          { editorSelectorNode }
        </div>
      </div>
    );
  }
}

AddButtonContainer.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  shadow: PropTypes.bool,
  onSelectEditorType: PropTypes.func.isRequired,
  internalAllowedEditorTypes: PropTypes.instanceOf(List).isRequired,
  showEditorSelector: PropTypes.bool
};

AddButtonContainer.defaultProps = {
  shadow: true,
  style: {},
  showEditorSelector: false
};

