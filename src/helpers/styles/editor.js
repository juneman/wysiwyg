
export function getButtonProps(isActive) {
  return {
    hideBackground: true,
    color: (isActive) ? '#23baff' : '#808080',
    clickColor: '#333',
    activeColor: '#23baff',
    hoverColor: (isActive) ? '#23baff' : '#333'
  };
}

export const secondaryMenuTitleStyle = {
  textTransform: 'uppercase',
  fontSize: 'smaller',
  color: '#808080',
  marginBottom: 20
};

export const defaultButtonStyle = {
  fontSize: '16px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderImage: 'none'
};

export const appcuesButtonSuccessStyle = {
  border: '1px solid transparent',
};

export const textInputStyle = {
  display: 'block',
  margin: 0,
  width: '95%',
  fontFamily: 'sans-serif',
  fontSize: 18,
  appearance: 'none',
  boxShadow: 'none',
  borderRadius: 'none',
  padding: 4,
  outline: 'none'
};

export const shortInputStyle = {
  display: 'inline',
  margin: '0 0 0 5px',
  width: '43px',
  fontFamily: 'sans-serif',
  fontSize: 14,
  appearance: 'none',
  boxShadow: 'none',
  borderRadius: '4px',
  border: '1px solid #ddd',
  padding: '4px 0 4px 4px',
  color: '#666',
  outline: 'none',
  lineHeight: '18px',
  verticalAlign: 'middle'
};

export const marginBoxRowStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '5px 0'
};

export const marginBoxStyle = {
    height: '50px',
    width: '60px',
    margin: '5px 15px 5px 5px',
    border: '2px dashed #808080'
};

export const dropdownStyle = {
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

export const checkboxStyle = {
  marginRight: 10
};

export const placeholderStyle = {
  textAlign: 'center',
  color: '#808080',
  fontSize: 'smaller',
  textTransform: 'uppercase'
};
