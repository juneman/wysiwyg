'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _domHelpers = require('../helpers/domHelpers');

var _ImageUploader = require('./ImageUploader');

var _ImageUploader2 = _interopRequireDefault(_ImageUploader);

var _AddButtonHorizRule = require('./AddButtonHorizRule');

var _AddButtonHorizRule2 = _interopRequireDefault(_AddButtonHorizRule);

var _AddButton = require('../icons/AddButton');

var _AddButton2 = _interopRequireDefault(_AddButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A React component with an image drop or a click
 * to show the Editor selector. This is the main component
 * that renders when the Canvas is empty
 * @class
 */
var FullAddElement = function (_React$Component) {
  _inherits(FullAddElement, _React$Component);

  function FullAddElement(props) {
    _classCallCheck(this, FullAddElement);

    var _this = _possibleConstructorReturn(this, (FullAddElement.__proto__ || Object.getPrototypeOf(FullAddElement)).call(this, props));

    _this.state = {
      addButtonPositon: (0, _immutable.Map)()
    };
    return _this;
  }

  _createClass(FullAddElement, [{
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
          height = _props.height,
          allowedEditorTypes = _props.allowedEditorTypes;


      var fullScreenStyles = {
        backgroundColor: '#dafeea',
        color: '#0bdc66',
        textAlign: 'center',
        border: '2px dotted #0bdc66',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: height ? height - 4 : null,
        position: 'relative'
      };

      var centeredContainer = {
        height: height,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      };

      return _react2.default.createElement(
        'div',
        null,
        allowedEditorTypes.isEmpty() || allowedEditorTypes.includes("Image") ? _react2.default.createElement(
          'div',
          { className: 'full-add', style: centeredContainer },
          _react2.default.createElement(
            _ImageUploader2.default,
            {
              disableClick: true,
              onUpload: function onUpload(imageDetails) {
                return _this2.props.onUpload(imageDetails);
              }
            },
            _react2.default.createElement(
              'a',
              { href: '#', style: { textDecoration: 'none' }, id: 'addBtn', onClick: function onClick(e) {
                  return _this2.handleAddNew(e);
                } },
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'div',
                  { style: fullScreenStyles },
                  _react2.default.createElement(
                    'div',
                    { style: { textAlign: 'center' } },
                    _react2.default.createElement(
                      'span',
                      { style: { width: 30 }, ref: function ref(addButton) {
                          return _this2.addButton = addButton;
                        } },
                      _react2.default.createElement(_AddButton2.default, { shadow: true })
                    ),
                    _react2.default.createElement(
                      'div',
                      { style: { color: '#00b84f' } },
                      _react2.default.createElement(
                        'div',
                        { style: { fontSize: 'larger', marginTop: 10 } },
                        'Click here to add some content'
                      ),
                      _react2.default.createElement(
                        'div',
                        { style: { fontSize: 'smaller', marginTop: 10 } },
                        'or drag and drop an image'
                      )
                    )
                  )
                )
              )
            )
          )
        ) : _react2.default.createElement(_AddButtonHorizRule2.default, {
          onClick: function onClick(addButtonPosition) {
            return _this2.props.onClickAdd(addButtonPosition);
          }
        })
      );
    }
  }, {
    key: 'handleAddNew',
    value: function handleAddNew(e) {
      e.preventDefault();
      this.props.onClickAdd(this.state.addButtonPositon);
    }
  }, {
    key: 'setBoundingBox',
    value: function setBoundingBox() {
      if (!this.addButton) {
        return;
      }
      var addButtonPositon = (0, _domHelpers.convertBoundingBox)(this.addButton.getBoundingClientRect());
      if (!addButtonPositon.equals(this.state.addButtonPositon)) {
        this.setState({ addButtonPositon: addButtonPositon });
      }
    }
  }]);

  return FullAddElement;
}(_react2.default.Component);

exports.default = FullAddElement;


FullAddElement.propTypes = {
  onClickAdd: _propTypes2.default.func.isRequired,
  onUpload: _propTypes2.default.func.isRequired,
  height: _propTypes2.default.number,
  allowedEditorTypes: _propTypes2.default.instanceOf(_immutable.List).isRequired
};