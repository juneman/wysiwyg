'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getButtonProps = getButtonProps;
function getButtonProps(isActive) {
  return {
    hideBackground: true,
    color: isActive ? '#23baff' : '#808080',
    clickColor: '#333',
    activeColor: '#23baff',
    hoverColor: isActive ? '#23baff' : '#333'
  };
}

var secondaryMenuTitleStyle = exports.secondaryMenuTitleStyle = {
  textTransform: 'uppercase',
  fontSize: 'smaller',
  color: '#808080',
  marginBottom: 20
};

var textInputStyle = exports.textInputStyle = {
  display: 'block',
  margin: 0,
  width: '95%',
  fontFamily: 'sans-serif',
  fontSize: 18,
  appearance: 'none',
  boxShadow: 'none',
  borderRadius: 'none',
  padding: 4
};

var dropdownStyle = exports.dropdownStyle = {
  display: 'block',
  margin: 0,
  width: '95%',
  fontFamily: 'sans-serif',
  fontSize: 18,
  appearance: 'none',
  boxShadow: 'none',
  borderRadius: 'none',
  padding: 4
};

var checkboxStyle = exports.checkboxStyle = {
  marginRight: 10
};

var buttonStyle = exports.buttonStyle = {
  backgroundImage: 'linear-gradient(to bottom, #3498db, #2980b9)',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  fontSize: 18,
  padding: '5px 30px',
  textDecoration: 'none'
};

var placeholderStyle = exports.placeholderStyle = {
  textAlign: 'center',
  color: '#808080',
  fontSize: 'smaller',
  textTransform: 'uppercase'
};