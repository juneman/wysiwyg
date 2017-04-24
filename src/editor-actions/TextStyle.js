import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { RichUtils } from 'draft-js';

import Toolbar from '../components/Toolbar';

import TextButton from '../icons/TextButton';

export default class TextStyle extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false
    };
  }

  render() {
    const { showDropdown } = this.state;

    const buttonProps = {
      hideBackground: true,
      color: '#303030',
      clickColor: '#333',
      activeColor: '#C0C0C0'
    };

    const dropdownStyles = {
      position: 'absolute',
      top: 45,
      left: 0,
      padding: 10,
      width: 300
    };

    const titleStyles = {
      textTransform: 'uppercase',
      fontSize: 'smaller',
      color: '#808080',
      marginBottom: 20
    };

    const styleOptions = ([
      {
        name: 'Header 1',
        value: 'h1'
      },
      {
        name: 'Header 2',
        value: 'h2'
      },
      {
        name: 'Header 3',
        value: 'h3'
      },
      {
        name: 'Header 4',
        value: 'h4'
      },
      {
        name: 'paragraph',
        value: 'p'
      }
    ]).map((textStyle) => {
      return textStyle;
    });

    const dropdownNodes = showDropdown ? (
      <Toolbar style={dropdownStyles}>
        <div style={titleStyles}>Text Style</div>
        <select className="form-control" onChange={(e) => this.handleSave(e)}>
          { styleOptions.map((styleOption) => {
            return (
              <option key={styleOption.value} value={styleOption.value}>{styleOption.name}</option>
            );
          })}
        </select>
      </Toolbar>
    ) : null;

    return (
      <div>
        <TextButton onClick={() => this.toggleDropdown()} {...buttonProps} />
        { dropdownNodes }
      </div>
    );
  }

  toggleDropdown() {
    const { showDropdown } = this.state;
    this.setState({
      showDropdown: !showDropdown
    });
  }

  handleSave(e) {
    e.preventDefault();
    const { localState, persistedState, onChange } = this.props;

    // TODO: This sets italic. Should set the font style
    const newLocalState = localState.set('editorState', RichUtils.toggleInlineStyle(localState.get('editorState'), 'ITALIC'));

    this.setState({
      showDropdown: false
    });

    onChange({
      localState: newLocalState,
      persistedState
    });
  }

}

TextStyle.propTypes = {
  localState: PropTypes.instanceOf(Map).isRequired,
  persistedState: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired
};
