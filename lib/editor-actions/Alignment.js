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

var _Menu = require('../components/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _domHelpers = require('../helpers/domHelpers');

var _editor = require('../helpers/styles/editor');

var _AlignLeft = require('../icons/AlignLeft');

var _AlignLeft2 = _interopRequireDefault(_AlignLeft);

var _AlignCenter = require('../icons/AlignCenter');

var _AlignCenter2 = _interopRequireDefault(_AlignCenter);

var _AlignRight = require('../icons/AlignRight');

var _AlignRight2 = _interopRequireDefault(_AlignRight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Alignment = function (_React$Component) {
  _inherits(Alignment, _React$Component);

  function Alignment(props) {
    _classCallCheck(this, Alignment);

    var _this = _possibleConstructorReturn(this, (Alignment.__proto__ || Object.getPrototypeOf(Alignment)).call(this, props));

    _this.state = {
      position: (0, _immutable.Map)()
    };
    return _this;
  }

  _createClass(Alignment, [{
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

      var position = this.state.position;
      var isActive = this.props.isActive;


      var buttonProps = (0, _editor.getButtonProps)(isActive);
      var secondaryButtonProps = (0, _editor.getButtonProps)(false);

      var dropdownStyles = {
        position: 'absolute',
        top: 45,
        left: position.left,
        width: 120
      };

      var dropdownNodes = isActive ? _react2.default.createElement(
        _Menu2.default,
        { style: dropdownStyles },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_AlignLeft2.default, _extends({ onClick: function onClick() {
              return _this2.handleAlignment(null, 'left');
            }, text: 'Left' }, secondaryButtonProps))
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_AlignCenter2.default, _extends({ onClick: function onClick() {
              return _this2.handleAlignment(null, 'center');
            }, text: 'Center' }, secondaryButtonProps))
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_AlignRight2.default, _extends({ onClick: function onClick() {
              return _this2.handleAlignment(null, 'right');
            }, text: 'Right' }, secondaryButtonProps))
        )
      ) : null;

      return _react2.default.createElement(
        'div',
        { ref: function ref(el) {
            return _this2.wrapper = el;
          } },
        _react2.default.createElement(_AlignCenter2.default, _extends({ onClick: function onClick() {
            return _this2.toggleDropdown();
          } }, buttonProps)),
        dropdownNodes
      );
    }
  }, {
    key: 'toggleDropdown',
    value: function toggleDropdown() {
      var _props = this.props,
          onToggleActive = _props.onToggleActive,
          isActive = _props.isActive;

      onToggleActive(!isActive);
    }
  }, {
    key: 'handleAlignment',
    value: function handleAlignment(e, type) {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      var _props2 = this.props,
          onChange = _props2.onChange,
          onToggleActive = _props2.onToggleActive;


      onToggleActive(false);
      onChange(type);
    }
  }, {
    key: 'setBoundingBox',
    value: function setBoundingBox() {
      if (!this.wrapper) {
        return;
      }
      var position = (0, _domHelpers.convertBoundingBox)(this.wrapper.getBoundingClientRect());
      if (!position.equals(this.state.position)) {
        this.setState({ position: position });
      }
    }
  }]);

  return Alignment;
}(_react2.default.Component);

exports.default = Alignment;


Alignment.propTypes = {
  onChange: _propTypes2.default.func.isRequired,
  onToggleActive: _propTypes2.default.func.isRequired,
  isActive: _propTypes2.default.bool.isRequired
};