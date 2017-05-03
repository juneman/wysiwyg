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

var _AddButton = require('../icons/AddButton');

var _AddButton2 = _interopRequireDefault(_AddButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A React component renders an Add button to
 * add a new row to the Canvas
 * @class
 */
var AddButtonHorizRule = function (_React$Component) {
  _inherits(AddButtonHorizRule, _React$Component);

  function AddButtonHorizRule(props) {
    _classCallCheck(this, AddButtonHorizRule);

    var _this = _possibleConstructorReturn(this, (AddButtonHorizRule.__proto__ || Object.getPrototypeOf(AddButtonHorizRule)).call(this, props));

    _this.state = {
      addButtonPosition: (0, _immutable.Map)(),
      position: (0, _immutable.Map)()
    };
    return _this;
  }

  _createClass(AddButtonHorizRule, [{
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

      var hrStyle = {
        width: '100%',
        height: 1,
        border: 0,
        position: 'relative',
        top: -20,
        left: 0,
        zIndex: 2,
        padding: 0,
        margin: 0,
        backgroundColor: '#7cf4b1',
        backgroundImage: 'linear-gradient(to right, #b8f9d5, #7cf4b1, #b8f9d5)'
      };

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: { textAlign: 'center', zIndex: 10 }, ref: function ref(el) {
              return _this2.wrapper = el;
            } },
          _react2.default.createElement(
            'a',
            {
              href: '#',
              id: 'addBtn',
              onClick: function onClick(e) {
                return _this2.handleAddNew(e);
              },
              ref: function ref(el) {
                return _this2.addButton = el;
              }
            },
            _react2.default.createElement(_AddButton2.default, { shadow: true })
          ),
          _react2.default.createElement('hr', { style: hrStyle })
        )
      );
    }
  }, {
    key: 'handleAddNew',
    value: function handleAddNew(e) {
      e.preventDefault();
      this.props.onClick(this.state.addButtonPosition);
    }
  }, {
    key: 'setBoundingBox',
    value: function setBoundingBox() {
      if (this.addButton) {
        var addButtonPosition = (0, _domHelpers.convertBoundingBox)(this.addButton.getBoundingClientRect());
        if (!addButtonPosition.equals(this.state.addButtonPosition)) {
          this.setState({ addButtonPosition: addButtonPosition });
        }
      }
    }
  }]);

  return AddButtonHorizRule;
}(_react2.default.Component);

exports.default = AddButtonHorizRule;


AddButtonHorizRule.propTypes = {
  onClick: _propTypes2.default.func.isRequired
};