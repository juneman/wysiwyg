'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserPropertyDecorator = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findWithRegex(regex, contentBlock, callback) {
  var text = contentBlock.getText();
  var matchArr = void 0,
      start = void 0;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

function findUserPropertyEntities(contentBlock, callback) {
  findWithRegex(/{{(.*?)}}/g, contentBlock, callback);
}

var UserProperty = function UserProperty(props) {
  var children = props.children;


  return _react2.default.createElement(
    'span',
    { style: { backgroundColor: '#bfebff' } },
    children
  );
};

UserProperty.propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.element]).isRequired
};

var UserPropertyDecorator = exports.UserPropertyDecorator = {
  strategy: findUserPropertyEntities,
  component: UserProperty
};