import React from 'react';
import PropTypes from 'prop-types';
import AddButton from '../icons/AddButton';
import EditorSelector from './EditorSelector';
import { List } from 'immutable';

export default class AddButtonContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditorSelectorVisible: props.showEditorSelector,
      editorSelectorAnimationTimer: null
    };
  }


  componentWillReceiveProps(nextProps) {
    const { showEditorSelector } = this.props;
    const willShowEditorSelector = !showEditorSelector && nextProps.showEditorSelector;
    const willNotShowEditorSelector = showEditorSelector && !nextProps.showEditorSelector;

    if (willShowEditorSelector) {
      this.setState({
        isEditorSelectorVisible: true,
        editorSelectorAnimationTimer: null
      });
      window.clearTimeout(this.state.editorSelectorAnimationTimer);
    } else if (willNotShowEditorSelector) {
      this.setState({
        editorSelectorAnimationTimer: setTimeout(() => {
          this.setState({
            isEditorSelectorVisible: false
          });
        }, 150)
      });
    }
  }

  render() {
    const { onSelectEditorType, shadow, onClick, internalAllowedEditorTypes, showEditorSelector } = this.props;
    const { isEditorSelectorVisible } = this.state;
    return (
      <div style={{ pointerEvents: 'all' }} onClick={onClick}>
        <AddButton shadow={ shadow } {...this.props}/>
        <div style={{ position: 'relative'}}>
          { isEditorSelectorVisible &&
            <EditorSelector
              allowedEditorTypes={ internalAllowedEditorTypes }
              onSelect={ onSelectEditorType }
              showEditorSelector={ showEditorSelector }
            />
          }
        </div>
      </div>
    );
  }
}

AddButtonContainer.propTypes = {
  shadow: PropTypes.bool,
  onSelectEditorType: PropTypes.func.isRequired,
  internalAllowedEditorTypes: PropTypes.instanceOf(List).isRequired,
  showEditorSelector: PropTypes.bool,
  onClick: PropTypes.onClick
};

AddButtonContainer.defaultProps = {
  shadow: true,
  style: {},
  showEditorSelector: false
};
