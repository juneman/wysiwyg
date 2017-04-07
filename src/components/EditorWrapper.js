import React from 'react';
import isEqual from 'lodash.isequal';

import OkButton from '../icons/OkButton';
import EditButton from '../icons/EditButton';
import CancelButton from '../icons/CancelButton';
import DeleteButton from '../icons/DeleteButton';
import MoveVertButton from '../icons/MoveVertButton';

export default class EditorWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: {}
    };
  }

  componentDidMount() {
    this.setBoundingBox();
  }

  componentDidUpdate() {
    this.setBoundingBox();
  }

  render() {
    const { isEditing, isHover, children } = this.props;

    const hoverButtonStyles = {
      textAlign: 'center',
      position: 'absolute',
      width: this.state.position.width || 100,
      top: this.state.position.top - 10
    };

    const editingButtonStyles = {
      position: 'absolute',
      left: this.state.position.left + this.state.position.width - 130,
      top: this.state.position.top + 40
    };

    let buttons;
    
    if (isEditing) {
      buttons = (
        <div>
          {children}
          <div style={editingButtonStyles}>
            <a href="#" onClick={(e) => this.handleSave(e)}><OkButton shadow={true} color="#0bdc66" /></a>
            <a href="#" onClick={(e) => this.handleCancel(e)}><CancelButton shadow={true} color="#C0C0C0" /></a>
            <a href="#" onClick={(e) => this.handleRemove(e)}><DeleteButton shadow={true} color="#FF0000" /></a>
          </div>
        </div>
      );
    } else if (isHover) {
      buttons = (
        <div className="edit">
          <div style={hoverButtonStyles}>
            <a href="#"><MoveVertButton shadow={true} color="#cebea5" /></a>
            <a href="#"><EditButton shadow={true} color="#f4ad42" /></a>
          </div>
          {children}
        </div>
      );
    }

    return (
      <div ref={(el) => this.wrapper = el}>
        {(buttons) ? buttons : children}
      </div>
    );
  }

  setBoundingBox() {
    if (!this.wrapper) {
      return;
    }
    const box = this.wrapper.getBoundingClientRect();

    let { bottom, height, left, right, top, width } = box;
    const position = {
      bottom,
      height,
      left,
      right,
      top,
      width
    };
    if (!isEqual(position, this.state.position)) {
      this.setState({position});
    }
  }

  handleSave(e) {
    e.preventDefault();
    this.props.onSave();
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.onCancel();
  }

  handleRemove(e) {
    e.preventDefault();
    this.props.onRemove();
  }

}

EditorWrapper.propTypes = {
  isEditing: React.PropTypes.bool.isRequired,
  isHover: React.PropTypes.bool.isRequired,
  children: React.PropTypes.element.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired
};