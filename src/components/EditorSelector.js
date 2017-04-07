import React from 'react';
import isEqual from 'lodash.isequal';

import AddButton from '../icons/AddButton';
import CancelButton from '../icons/CancelButton';
import TextButton from '../icons/TextButton';
import ImageButton from '../icons/ImageButton';

const MAX_COLUMNS = 3;

const editors = [
  {
    node: <TextButton text="Text" />,
    type: 'RichText'
  },
  {
    node: <ImageButton text="Image" />,
    type: 'Image'
  },
  {
    node: <TextButton text="Hero" />,
    type: 'Hero'
  },
  {
    node: <TextButton text="Form" />,
    type: 'Form'
  },
  {
    node: <TextButton text="Video" />,
    type: 'Video'
  },
  {
    node: <TextButton text="HTML" />,
    type: 'HTML'
  },
  {
    node: <TextButton text="Button" />,
    type: 'Button'
  }
];

export default class EditorSelector extends React.Component {
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
    const { position } = this.state;
    const { setPosition } = this.props;

    const wrapperStyle = {
      display: 'grid',
      gridTemplateColumns: `repeat(${MAX_COLUMNS}, 1fr)`,
      gridGap: 15,
      position: 'absolute',
      zIndex: 100,
      backgroundColor: '#F8F8F8',
      border: '2px dotted #0bdc66',
      padding: 10,
      top: setPosition.top,
      left: setPosition.left,
      width: 550
    };

    const addBtnStyle = {
      position: 'absolute',
      top: -50,
      left: 0,
      zIndex: 100
    };

    const closeBtnStyle = {
      position: 'absolute',
      left: (position.width || 0) - 48,
      top: (position.height || 0) + 7,
      zIndex: 100
    };

    let column = 1;
    let row = 1;

    return (
      <div className="editor-selector" style={wrapperStyle} ref={(el) => this.wrapper = el}>
        <div style={addBtnStyle}>
          <AddButton />
        </div>
        {
          (editors.map((editor) => {
            const node = (
              <div key={editor.type} style={{gridColumn: column, gridRow: row, marginLeft: 20}}>
                <a href="#" onClick={(e) => this.handleSelect(e, editor.type)}>
                  {editor.node}
                </a>
              </div>
            );

            column++;
            if (column > MAX_COLUMNS) {
              column = 1;
              row++;
            }

            return node;
          }))
        }
        <div style={closeBtnStyle}>
          <a href="#" onClick={(e) => this.handleCancel(e)}><CancelButton color="#C0C0C0" shadow={true} /></a>
        </div>
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

  handleSelect(e, type) {
    e.preventDefault();
    this.props.onSelect(type);
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.onCancel();
  }
}
EditorSelector.propTypes = {
  onSelect: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  setPosition: React.PropTypes.shape({
    top: React.PropTypes.number.isRequired,
    left: React.PropTypes.number.isRequired
  }).isRequired
};