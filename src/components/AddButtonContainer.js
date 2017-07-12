import React from 'react';
import PropTypes from 'prop-types';
import AddButton from '../icons/AddButton';
import EditorSelector from './EditorSelector';
import { List } from 'immutable';

export default class AddButtonContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditorSelectorVisibile: props.showEditorSelector,
      editorSelectorAnimationTimer: null
    };
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.showEditorSelector) {
      this.setState({
        isEditorSelectorVisibile: true,
        editorSelectorAnimationTimer: null
      });
      window.clearTimeout(this.state.editorSelectorAnimationTimer);

    } else if (nextProps.showEditorSelector === false) {
      this.setState({
        editorSelectorAnimationTimer: setTimeout(() => {
          this.setState({
            isEditorSelectorVisibile: false
          });
        }, 400)
      });
    }
  }
  render() {
    const { shadow, onSelectEditorType, internalAllowedEditorTypes, showEditorSelector } = this.props;
    const { isEditorSelectorVisibile } = this.state;

    const editorSelectorNode = isEditorSelectorVisibile ? (
      <EditorSelector
        allowedEditorTypes={internalAllowedEditorTypes}
        onSelect={ onSelectEditorType }
        showEditorSelector={ showEditorSelector }
      />
    ) : null;

    return (
      <div>
        <AddButton shadow={ shadow } {...this.props}/>
        <div style={{ position: 'relative' }}>
          { editorSelectorNode }
        </div>
      </div>
    );
  }
}

AddButtonContainer.propTypes = {
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

