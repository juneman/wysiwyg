import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import DropDownButton from './DropDownButton';
import DownButton from '../icons/DownButton';
import RightButton from '../icons/RightButton';

const MAX_MENU_HEIGHT = 250;

export default class DropDownMenu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedValue: props.selectedValue,
      isMenuOpen: false,
      searchTerm: '',
      unsearchable: false,
      isHoveringOverOptionByIndex: {},
      hasRoomToRenderBelow: true
    };
  }

  componentDidMount() {
    this.setHasRoomToRenderBelow();
  }

  componentWillReceiveProps(nextProps) {
    const selectedValueChanged = nextProps.selectedValue != this.state.selectedValue;
    if (selectedValueChanged) {
      this.setState({ selectedValue: nextProps.selectedValue });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const isMenuNowOpen = this.state.isMenuOpen && !prevState.isMenuOpen;

    if (isMenuNowOpen && this._search) {
      this._search.focus();
    }
    this.setHasRoomToRenderBelow();
  }

  toggleDropDownMenu() {
    const { onClick } = this.props;
    const { isMenuOpen } = this.state;

    this.setState({ isMenuOpen: !isMenuOpen });

    if (onClick) {
      onClick();
    }
  }

  render() {
    const { title, label, options, renderOptionSubtextNode, actionable, defaultValue, unsearchable, searchPlaceholder, smallDropDown, overflowDropdown } = this.props;
    const { selectedValue, isMenuOpen, searchTerm, isHoveringOverOptionByIndex, hasRoomToRenderBelow } = this.state;

    const selectedOption = selectedValue !== undefined ? options.find((option) => option.value == selectedValue) : null;

    if (!selectedOption && !defaultValue && !actionable) return <div></div>;

    const styles = {
      dropDownMenuContainer: {
        flexGrow: 1
      },
      dropDownMenu: {
        display: 'flex',
        position: 'absolute',
        top: '100%',
        left: 0,
        backgroundColor: '#eee',
        maxHeight: MAX_MENU_HEIGHT,
        width: 270,
        overflowY: 'auto',
        overflowX: 'hidden',
        borderRadius: 5,
        marginTop: -5,
        flexDirection: 'column',
        opacity: 0,
        transition: 'opacity 0.15s ease-out, margin-top 0.2s ease-out',
        pointerEvents: 'none',
        color: '#666',
        zIndex: 150
      },
      dropDownMenuOption: {
        cursor: 'pointer',
        width: 'inherit',
        display: 'flex',
        flexShrink: 0,
        alignItems: 'flex-start',
        textAlign: 'left',
        padding: '10px 15px'
      },
      optionTextColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        width: '100%'
      },
      optionLabel: {
        fontSize: '14px',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
      },
      searchBar: {
        display: 'flex',
        alignItems: 'center',
        minHeight: 36,
        backgroundColor: '#aaa'
      },
      searchBarInput: {
        display: 'flex',
        flexGrow: 1,
        height: 30,
        paddingLeft: 15,

        background: 'none',
        border: 'none',
        opacity: 0.8,
        outline: 'none',

        cursor: 'text',
        fontSize: '14px',
        color: '#666'
      },
      label: {
        textAlign: 'left',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      dropDownButton: {}
    };


    if(smallDropDown) {
      styles.dropDownButton = {
        padding: '4px 8px',
        fontSize: '12px',
        height: 32
      };
    }
    if (!hasRoomToRenderBelow && !overflowDropdown) {
      styles.dropDownMenu.marginBottom = styles.dropDownMenu.marginTop;
      styles.dropDownMenu.bottom = styles.dropDownMenu.top;
      delete styles.dropDownMenu.marginTop;
      delete styles.dropDownMenu.top;
    }

    if (isMenuOpen) {
      styles.dropDownMenu = {
        ...styles.dropDownMenu,
        marginTop: 5,
        opacity: 1,
        pointerEvents: 'all'
      };

      if (!hasRoomToRenderBelow && !overflowDropdown) {
        styles.dropDownMenu.marginBottom = styles.dropDownMenu.marginTop;
        delete styles.dropDownMenu.marginTop;
      }

    }

    const getDropDownMenuOptionStyle = (index) => {
      const style = { ...styles.dropDownMenuOption };
      if (isHoveringOverOptionByIndex[index]) {
        style.backgroundColor = 'rgba(0,0,0,0.15)';
      }
      return style;
    };

    return (
      <DropDownButton
        title={ title }
        forceHover={ isMenuOpen }
        style={ styles.dropDownButton }
        onClick={ () => this.toggleDropDownMenu() }>
          <div style={ styles.dropDownMenuContainer }>
            <div style={ styles.dropDownMenu } ref={ (el) => this.wrapper = el }>
              { options.length > 5 && !unsearchable &&
                <div onMouseUpCapture={ (e) => this.onSearchBarMouseUp(e) } style={ styles.searchBar }>
                  <input
                    ref={ (c) => this._search = c }
                    type="text"
                    style={ styles.searchBarInput }
                    onChange={ (e) => this.onSearchBarChange(e) }
                    placeholder={ searchPlaceholder || 'Search'}
                    value={ searchTerm }>
                  </input>
                </div>
              }
              { options
                .map((option, i) => ({ ...option, __originalIndex: i }))
                .filter((option) => !searchTerm || option.label.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((option) =>
                  <div key={ `dropdownmenu-option-${ label }-${ option.__originalIndex }` }
                    style={ getDropDownMenuOptionStyle(option.__originalIndex) }
                    onMouseOver={ () => this.setState({ isHoveringOverOptionByIndex: { ...isHoveringOverOptionByIndex, [option.__originalIndex] : true } }) }
                    onMouseOut={ () => this.setState({ isHoveringOverOptionByIndex: { ...isHoveringOverOptionByIndex, [option.__originalIndex] : false } }) }
                    onClick={ () => this.selectOptionByIndex(option.__originalIndex) }>
                      <div style={ styles.optionTextColumn }>
                        <div style={ styles.optionLabel }>
                          <span>{ option.label }</span>
                          { option.optionDisabled &&
                            renderOptionSubtextNode(option)
                          }
                        </div>
                        { option.description &&
                          <div className={ styles.optionDescription }>
                            { option.description }
                          </div>
                        }
                      </div>
                  </div>
                )
              }
            </div>
            <div style={ styles.label }>
              <span>{ label && `${ label }: ` }
                <span>{ selectedOption ? selectedOption.label : defaultValue }</span>
              </span>
              <span style={{
                  display: 'inline-flex',
                  width: 16,
                  cursor: 'pointer',
                  transform: 'scale(0.8)'
                }}>
                  <DownButton iconStyle={{color: 'grey'}} smallButton/>
                </span>

            </div>
          </div>
      </DropDownButton>
    );
  }

  setHasRoomToRenderBelow() {
    const hasRoomToRenderBelow = ((window.innerHeight - this.wrapper.parentElement.getBoundingClientRect().bottom) > MAX_MENU_HEIGHT + 5);
    if (hasRoomToRenderBelow != this.state.hasRoomToRenderBelow){
      this.setState({
        hasRoomToRenderBelow
      });
    }
  }

  selectOptionByIndex(index) {
    const { options, onSelect } = this.props;

    if( options[index].optionDisabled ) {
      this.setState({ isMenuOpen: false });
      return false;
    }

    this.setState({
      selectedValue: options[index].value,
      isMenuOpen: false
    });

    onSelect(options[index].value);
  }

  onSearchBarMouseUp(event) {
    event.nativeEvent.stopImmediatePropagation();
    event.stopPropagation();
    this._search.focus();
  }

  onSearchBarChange(event) {
    const { value } = event.target;

    this.setState({
      searchTerm: value
    });
  }

}

DropDownMenu.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  onSelect: PropTypes.func,
  onClick: PropTypes.func,
  options: PropTypes.array.isRequired,
  renderOptionSubtextNode: PropTypes.func,
  selectedValue: PropTypes.any,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  left: PropTypes.bool,
  actionable: PropTypes.bool,
  unsearchable: PropTypes.bool,
  smallDropDown: PropTypes.bool,
  overflowDropdown: PropTypes.bool,
  searchPlaceholder: PropTypes.string
};

