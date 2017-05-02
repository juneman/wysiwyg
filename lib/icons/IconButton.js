'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var baseIconStyle = {
  display: 'inline-block',
  width: 16,
  height: 16,
  strokeWidth: 0,
  stroke: 'currentColor',
  fill: 'currentColor',
  position: 'relative',
  top: -4,
  zIndex: 10
};

var wrapperStyle = {
  fontSize: '20pt',
  height: 35,
  width: 35,
  margin: '0 5px',
  zIndex: 10
};

var IconButton = function (_React$Component) {
  _inherits(IconButton, _React$Component);

  function IconButton(props) {
    _classCallCheck(this, IconButton);

    var _this = _possibleConstructorReturn(this, (IconButton.__proto__ || Object.getPrototypeOf(IconButton)).call(this, props));

    _this.state = {
      colorOverride: null
    };
    return _this;
  }

  _createClass(IconButton, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          title = _props.title,
          pathNode = _props.pathNode,
          iconStyle = _props.iconStyle,
          viewBox = _props.viewBox,
          color = _props.color,
          textColor = _props.textColor,
          text = _props.text,
          shadow = _props.shadow,
          hideBackground = _props.hideBackground,
          onClick = _props.onClick,
          onMouseDown = _props.onMouseDown,
          onMouseUp = _props.onMouseUp,
          isActive = _props.isActive,
          activeColor = _props.activeColor,
          cursor = _props.cursor,
          svg = _props.svg;
      var colorOverride = this.state.colorOverride;


      var finalColor = color;
      if (isActive && activeColor) {
        finalColor = activeColor;
      } else if (colorOverride) {
        finalColor = colorOverride;
      }

      var iconWrapperStyle = Object.assign({}, {
        position: 'relative',
        textAlign: 'center',
        backgroundColor: '#0bdc66',
        color: '#FFF',
        display: 'inline-block',
        borderRadius: '50%',
        height: 25,
        width: 26,
        padding: 5,
        zIndex: 10
      }, {
        boxShadow: shadow ? '1px 1px 4px rgba(0,0,0,0.4)' : null
      });

      var textStyle = {
        fontSize: 16,
        position: 'relative',
        color: '#0bdc66',
        top: -6,
        left: 3,
        zIndex: 10
      };

      if (finalColor) {
        iconWrapperStyle.backgroundColor = finalColor;
        textStyle.color = finalColor;
      }
      if (textColor && !colorOverride) {
        textStyle.color = textColor;
      } else if (textColor && colorOverride) {
        textStyle.color = colorOverride;
      }
      if (hideBackground) {
        delete iconWrapperStyle.backgroundColor;
        delete iconWrapperStyle.boxShadow;
        if (finalColor) {
          iconWrapperStyle.color = finalColor;
        }
      }
      var finalIconStyle = Object.assign({}, baseIconStyle, iconStyle);

      var iconNodes = _react2.default.createElement(
        'span',
        { style: wrapperStyle },
        _react2.default.createElement(
          'span',
          { style: iconWrapperStyle },
          _react2.default.createElement(
            'svg',
            { style: finalIconStyle, viewBox: viewBox },
            _react2.default.createElement(
              'title',
              null,
              title
            ),
            pathNode
          )
        ),
        text ? _react2.default.createElement(
          'span',
          { style: textStyle },
          text
        ) : null
      );

      var linkStyle = {
        textDecoration: 'none'
      };
      if (cursor) linkStyle.cursor = cursor;

      return onClick || onMouseDown || onMouseUp ? _react2.default.createElement(
        'a',
        { href: '#',
          style: linkStyle,
          onClick: function onClick(e) {
            return _this2.handleClick(e);
          },
          onMouseDown: function onMouseDown() {
            return _this2.handleMouseDown();
          },
          onMouseUp: function onMouseUp() {
            return _this2.handleMouseUp();
          },
          onMouseOver: function onMouseOver() {
            return _this2.handleMouseOver();
          },
          onMouseOut: function onMouseOut() {
            return _this2.handleMouseOut();
          }
        },
        iconNodes
      ) : iconNodes;
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      e.preventDefault();
      var onClick = this.props.onClick;

      if (onClick) {
        onClick();
      }
    }
  }, {
    key: 'handleMouseOver',
    value: function handleMouseOver() {
      var _props2 = this.props,
          hoverColor = _props2.hoverColor,
          onMouseOver = _props2.onMouseOver;


      if (hoverColor) {
        this.setState({
          colorOverride: hoverColor
        });
      }
      if (onMouseOver) {
        onMouseOver();
      }
    }
  }, {
    key: 'handleMouseOut',
    value: function handleMouseOut() {
      var _props3 = this.props,
          hoverColor = _props3.hoverColor,
          onMouseOut = _props3.onMouseOut;


      if (hoverColor) {
        this.setState({
          colorOverride: null
        });
      }
      if (onMouseOut) {
        onMouseOut();
      }

      /*
      This was necessary at one point.
      Leaving it commented as a reminder
      if (onMouseUp) {
        onMouseUp();
      }
      */
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown() {
      var _props4 = this.props,
          clickColor = _props4.clickColor,
          onMouseDown = _props4.onMouseDown;


      if (clickColor) {
        this.setState({
          colorOverride: clickColor
        });
      }
      if (onMouseDown) {
        onMouseDown();
      }
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp() {
      var _props5 = this.props,
          clickColor = _props5.clickColor,
          onMouseUp = _props5.onMouseUp;

      if (clickColor) {
        this.setState({
          colorOverride: null
        });
      }
      if (onMouseUp) {
        onMouseUp();
      }
    }
  }]);

  return IconButton;
}(_react2.default.Component);

exports.default = IconButton;


IconButton.propTypes = {
  title: _propTypes2.default.string.isRequired,
  pathNode: _propTypes2.default.node.isRequired,
  viewBox: _propTypes2.default.string.isRequired,
  iconStyle: _propTypes2.default.object,
  text: _propTypes2.default.string,
  color: _propTypes2.default.string,
  textColor: _propTypes2.default.string,
  cursor: _propTypes2.default.string,
  clickColor: _propTypes2.default.string,
  activeColor: _propTypes2.default.string,
  hoverColor: _propTypes2.default.string,
  shadow: _propTypes2.default.bool,
  hideBackground: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  onMouseDown: _propTypes2.default.func,
  onMouseUp: _propTypes2.default.func,
  onMouseOver: _propTypes2.default.func,
  onMouseOut: _propTypes2.default.func,
  isActive: _propTypes2.default.bool,
  svg: _propTypes2.default.element
};