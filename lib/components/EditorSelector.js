'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _domHelpers = require('../helpers/domHelpers');

var _TextButton = require('../icons/TextButton');

var _TextButton2 = _interopRequireDefault(_TextButton);

var _ImageButton = require('../icons/ImageButton');

var _ImageButton2 = _interopRequireDefault(_ImageButton);

var _VideoButton = require('../icons/VideoButton');

var _VideoButton2 = _interopRequireDefault(_VideoButton);

var _CodeButton = require('../icons/CodeButton');

var _CodeButton2 = _interopRequireDefault(_CodeButton);

var _FormButton = require('../icons/FormButton');

var _FormButton2 = _interopRequireDefault(_FormButton);

var _HeroButton = require('../icons/HeroButton');

var _HeroButton2 = _interopRequireDefault(_HeroButton);

var _ButtonButton = require('../icons/ButtonButton');

var _ButtonButton2 = _interopRequireDefault(_ButtonButton);

var _FormCheckboxButton = require('../icons/FormCheckboxButton');

var _FormCheckboxButton2 = _interopRequireDefault(_FormCheckboxButton);

var _FormDropdownButton = require('../icons/FormDropdownButton');

var _FormDropdownButton2 = _interopRequireDefault(_FormDropdownButton);

var _FormRadioButton = require('../icons/FormRadioButton');

var _FormRadioButton2 = _interopRequireDefault(_FormRadioButton);

var _FormTextInputButton = require('../icons/FormTextInputButton');

var _FormTextInputButton2 = _interopRequireDefault(_FormTextInputButton);

var _FormRatingButton = require('../icons/FormRatingButton');

var _FormRatingButton2 = _interopRequireDefault(_FormRatingButton);

var _PrevNextButton = require('../icons/PrevNextButton');

var _PrevNextButton2 = _interopRequireDefault(_PrevNextButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var editors = [{
  Button: _TextButton2.default,
  text: 'Text',
  type: 'RichText'
}, {
  Button: _ImageButton2.default,
  text: 'Image',
  type: 'Image'
}, {
  Button: _VideoButton2.default,
  text: 'Video',
  type: 'Video',
  defaultAction: 'code'
}, {
  Button: _HeroButton2.default,
  text: 'Hero',
  type: 'Hero'
}, {
  Button: _CodeButton2.default,
  text: 'HTML',
  type: 'HTML',
  defaultAction: 'code'
}, {
  Button: _FormButton2.default,
  text: 'Form',
  type: 'Form'
}, {
  Button: _ButtonButton2.default,
  text: 'Button',
  type: 'Button'
}];

var formEditors = [{
  Button: _FormTextInputButton2.default,
  text: 'Text Field',
  type: 'TextInput'
}, {
  Button: _FormTextInputButton2.default,
  text: 'TextArea Field',
  type: 'TextAreaInput'
}, {
  Button: _FormRadioButton2.default,
  text: 'Radio Select',
  type: 'SelectionField',
  rows: (0, _immutable.fromJS)([{
    id: (0, _v2.default)(),
    zones: [{
      id: (0, _v2.default)(),
      type: 'SelectionField',
      persistedState: {
        fieldType: 'radio'
      }
    }]
  }])
}, {
  Button: _FormDropdownButton2.default,
  text: 'Dropdown',
  type: 'SelectionField',
  rows: (0, _immutable.fromJS)([{
    id: (0, _v2.default)(),
    zones: [{
      id: (0, _v2.default)(),
      type: 'SelectionField',
      persistedState: {
        fieldType: 'dropdown'
      }
    }]
  }])
}, {
  Button: _FormCheckboxButton2.default,
  text: 'Checkbox',
  type: 'SelectionField',
  rows: (0, _immutable.fromJS)([{
    id: (0, _v2.default)(),
    zones: [{
      id: (0, _v2.default)(),
      type: 'SelectionField',
      persistedState: {
        fieldType: 'checkbox'
      }
    }]
  }])
}, {
  Button: _FormRatingButton2.default,
  text: 'Rating',
  rows: (0, _immutable.fromJS)([{
    id: (0, _v2.default)(),
    zones: [{
      id: (0, _v2.default)(),
      type: 'RichText',
      persistedState: {
        content: 'Please Rate Us From 1 (not so great) to 5 (awesome!)'
      }
    }]
  }, {
    id: (0, _v2.default)(),
    zones: [{
      id: (0, _v2.default)(),
      type: 'Button',
      persistedState: {
        content: '<p>1</p>',
        textAlign: 'center'
      }
    }, {
      id: (0, _v2.default)(),
      type: 'Button',
      persistedState: {
        content: '<p>2</p>',
        textAlign: 'center'
      }
    }, {
      id: (0, _v2.default)(),
      type: 'Button',
      persistedState: {
        content: '<p>3</p>',
        textAlign: 'center'
      }
    }, {
      id: (0, _v2.default)(),
      type: 'Button',
      persistedState: {
        content: '<p>4</p>',
        textAlign: 'center'
      }
    }, {
      id: (0, _v2.default)(),
      type: 'Button',
      persistedState: {
        content: '<p>5</p>',
        textAlign: 'center'
      }
    }]
  }])
}, {
  Button: _PrevNextButton2.default,
  text: 'Prev/Next',
  rows: (0, _immutable.fromJS)([{
    id: (0, _v2.default)(),
    zones: [{
      id: (0, _v2.default)(),
      type: 'Button',
      persistedState: {
        content: '<p>Previous</p>',
        textAlign: 'left',
        buttonAction: 'prev'
      }
    }, {
      id: (0, _v2.default)(),
      type: 'Button',
      persistedState: {
        content: '<p>Next</p>',
        textAlign: 'right',
        buttonAction: 'next'
      }
    }]
  }])
}];

/**
 * A React component that displays the dropdown menu
 * for selecting which editor type to add to the Canvas
 * @class
 */

var EditorSelector = function (_React$Component) {
  _inherits(EditorSelector, _React$Component);

  function EditorSelector(props) {
    _classCallCheck(this, EditorSelector);

    var _this = _possibleConstructorReturn(this, (EditorSelector.__proto__ || Object.getPrototypeOf(EditorSelector)).call(this, props));

    _this.state = {
      position: (0, _immutable.Map)(),
      formPosition: (0, _immutable.Map)(),
      secondaryMenuPosition: (0, _immutable.Map)(),
      showForm: false,
      primaryHoverMenu: '',
      secondaryMenuHover: ''
    };
    return _this;
  }

  _createClass(EditorSelector, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setBoundingBox();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.setBoundingBox();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          addButtonPosition = _props.addButtonPosition,
          onSelect = _props.onSelect,
          screenSize = _props.screenSize,
          allowedEditorTypes = _props.allowedEditorTypes;
      var _state = this.state,
          position = _state.position,
          formPosition = _state.formPosition,
          secondaryMenuPosition = _state.secondaryMenuPosition,
          showForm = _state.showForm,
          primaryHoverMenu = _state.primaryHoverMenu,
          secondaryMenuHover = _state.secondaryMenuHover;


      var positionBelowAddBtn = {
        top: addButtonPosition.get('top') + 10,
        left: addButtonPosition.get('left') - 50
      };

      var positionAboveAddBtn = {
        top: addButtonPosition.get('top') - position.get('height'),
        left: addButtonPosition.get('left') - 50
      };

      var hasRoomToRenderBelow = addButtonPosition.get('top') + 300 < screenSize.get('height') ? true : false;

      var menuPosition = hasRoomToRenderBelow ? positionBelowAddBtn : positionAboveAddBtn;

      var menuStyle = position.get('height') ? {
        zIndex: 11,
        position: 'absolute',
        width: 160
      } : {};

      var secondaryMenuStyle = secondaryMenuPosition.get('height') ? {
        zIndex: 11,
        position: 'absolute',
        width: 180,
        top: formPosition.get('top') ? formPosition.get('top') - secondaryMenuPosition.get('height') + 20 : null,
        left: formPosition.get('right') ? formPosition.get('right') - 20 : null
      } : {};

      var trimmedEditors = allowedEditorTypes.isEmpty() ? editors : editors.filter(function (editor) {
        return allowedEditorTypes.includes(editor.text);
      });
      var trimmedFormEditors = allowedEditorTypes.isEmpty() ? formEditors : formEditors.filter(function (editor) {
        return allowedEditorTypes.includes(editor.text);
      });

      return _react2.default.createElement(
        'div',
        { style: _extends({ position: 'absolute' }, menuPosition) },
        _react2.default.createElement(
          'div',
          { ref: function ref(el) {
              return _this2.wrapper = el;
            }, style: menuStyle },
          _react2.default.createElement(
            _Menu2.default,
            null,
            trimmedEditors.map(function (editor) {
              var isHover = editor.text === primaryHoverMenu ? true : false;
              var style = {
                backgroundColor: isHover ? '#3498db' : null
              };
              return _react2.default.createElement(
                'div',
                {
                  style: style,
                  key: editor.text,
                  ref: function ref(wrapper) {
                    return _this2['wrapper' + editor.type] = wrapper;
                  },
                  onMouseEnter: editor.type === 'Form' ? function () {
                    return _this2.setState({ showForm: true });
                  } : function () {
                    return _this2.setState({ showForm: false });
                  },
                  onMouseOver: function onMouseOver() {
                    return _this2.setHover(editor.text, true);
                  },
                  onMouseOut: function onMouseOut() {
                    return _this2.setHover(editor.text, false);
                  }
                },
                _react2.default.createElement(editor.Button, {
                  hideBackground: true,
                  color: isHover ? '#fff' : '#C0C0C0',
                  textColor: isHover ? '#fff' : '#606060',
                  text: editor.text,
                  onClick: editor.type === 'Form' ? null : function () {
                    return onSelect(editor.type, editor.rows, editor.defaultAction);
                  }
                })
              );
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { ref: function ref(el) {
              return _this2.secondaryMenu = el;
            }, style: secondaryMenuStyle },
          showForm ? _react2.default.createElement(
            _Menu2.default,
            null,
            trimmedFormEditors.map(function (editor) {
              var isHover = editor.text === secondaryMenuHover ? true : false;
              var style = {
                backgroundColor: isHover ? '#3498db' : null
              };
              return _react2.default.createElement(
                'div',
                {
                  style: style,
                  key: editor.text,
                  onMouseOver: function onMouseOver() {
                    return _this2.setHover('Form', true, editor.text);
                  },
                  onMouseOut: function onMouseOut() {
                    return _this2.setHover('Form', false, editor.text);
                  }
                },
                _react2.default.createElement(editor.Button, {
                  hideBackground: true,
                  color: isHover ? '#fff' : '#C0C0C0',
                  textColor: isHover ? '#fff' : '#606060',
                  text: editor.text,
                  onClick: function onClick() {
                    return onSelect(editor.type, editor.rows, editor.defaultAction);
                  }
                })
              );
            })
          ) : null
        )
      );
    }
  }, {
    key: 'setHover',
    value: function setHover(primaryHoverMenu, isOver, secondaryMenuHover) {
      var update = {};
      if (primaryHoverMenu !== this.state.primaryHoverMenu) {
        update.primaryHoverMenu = isOver ? primaryHoverMenu : null;
      }
      if (secondaryMenuHover !== this.state.secondaryMenuHover) {
        update.secondaryMenuHover = isOver ? secondaryMenuHover : null;
      }
      if (Object.keys(update).length) {
        this.setState(update);
      }
    }
  }, {
    key: 'setBoundingBox',
    value: function setBoundingBox() {
      var update = {};
      if (this.wrapper) {
        var position = (0, _domHelpers.convertBoundingBox)(this.wrapper.getBoundingClientRect());
        if (!position.equals(this.state.position)) {
          update.position = position;
        }
      }
      if (this.secondaryMenu) {
        var secondaryMenuPosition = (0, _domHelpers.convertBoundingBox)(this.secondaryMenu.getBoundingClientRect());
        if (!secondaryMenuPosition.equals(this.state.secondaryMenuPosition)) {
          update.secondaryMenuPosition = secondaryMenuPosition;
        }
      }
      if (this.wrapperForm) {
        var formPosition = (0, _domHelpers.convertBoundingBox)(this.wrapperForm.getBoundingClientRect());
        if (!formPosition.equals(this.state.formPosition)) {
          update.formPosition = formPosition;
        }
      }
      if (Object.keys(update).length) {
        this.setState(update);
      }
    }
  }]);

  return EditorSelector;
}(_react2.default.Component);

exports.default = EditorSelector;

EditorSelector.propTypes = {
  onSelect: _propTypes2.default.func.isRequired,
  addButtonPosition: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  screenSize: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  allowedEditorTypes: _propTypes2.default.instanceOf(_immutable.List)
};