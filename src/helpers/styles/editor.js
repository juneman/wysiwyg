
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
  width: '35px',
  fontFamily: 'sans-serif',
  fontSize: 14,
  appearance: 'none',
  boxShadow: 'none',
  borderRadius: 'none',
  padding: '1px 4px',
  outline: 'none',
  verticalAlign: 'middle'
};

export const marginBoxStyle = {
    height: '50px',
    width: '70px',
    margin: '5px auto',
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
