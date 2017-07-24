import React from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';

import DropDownButton from './DropDownButton';

export default class DropDownMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedValue: props.selectedValue,
            isMenuOpen: false,
            searchTerm: '',
            unsearchable: false,
            isHoveringOverOptionByIndex: {}
        };
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
    }

    componentWillUnmount() {
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
        const { className, menuClassName, optionClassName, labelClassName, selectedClassName, title, label, style, options, renderOptionSubtextNode, disabled, actionable, hiddenCaret, create, success, left, imageHeight, defaultValue, unsearchable, searchPlaceholder } = this.props;
        const { selectedValue, isMenuOpen, searchTerm, isHoveringOverOptionByIndex } = this.state;

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
		        right: 0,
		        backgroundColor: '#eee',
		        maxHeight: 370,
		        overflowY: 'auto',
		        borderRadius: 5,
		        marginTop: -5,
		        flexDirection: 'column',
		        opacity: 0,
		        transition: 'opacity 0.15s ease-out, margin-top 0.2s ease-out',
		        pointerEvents: 'none',
		        color: '#666'
        	},
        	dropDownMenuOption: {
			    cursor: 'pointer',
			    width: 200,
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
        	}
        };

        if (isMenuOpen) {
        	styles.dropDownMenu = {
        		...styles.dropDownMenu,
	            marginTop: 15,
	            opacity: 1,
	            pointerEvents: 'all'
        	}
        }

        const getDropDownMenuOptionStyle = (index) => {
        	const style = { ...styles.dropDownMenuOption };
        	if (isHoveringOverOptionByIndex[index]) {
        		style.backgroundColor = 'rgba(0,0,0,0.15)';
        	}
        	return style;
        }

        return (
            <DropDownButton
                title={ title }
                forceHover={ isMenuOpen }
                onClick={ () => this.toggleDropDownMenu() }>
                <div style={ styles.dropDownMenuContainer }>
                    <div style={ styles.dropDownMenu }>
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
                                    onMouseDown={ () => this.selectOptionByIndex(option.__originalIndex) }>
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
                    <div className={ styles.label }>
                        <span>{ label && `${ label }: ` }<span>{ selectedOption ? selectedOption.label : defaultValue }</span><i className="fa fa-caret-down"></i></span>
                    </div>
                </div>
            </DropDownButton>
        );
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
    menuClassName: PropTypes.string,
    optionClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    selectedClassName: PropTypes.string,
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
    create: PropTypes.bool,
    success: PropTypes.bool,
    hiddenCaret: PropTypes.bool,
    actionable: PropTypes.bool,
    imageHeight: PropTypes.number,
    style: PropTypes.object,
    unsearchable: PropTypes.bool,
    searchPlaceholder: PropTypes.string
};
