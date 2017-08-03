
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

export const selectMenuStyle = {
  background: 'transparent',
  border: '1px solid rgba(128, 128, 128, 0.5)',
  fontSize: '13px',
  height: '29px',
  padding: '5px',
  width: '175px',
  cursor: 'pointer'
};

export const defaultButtonStyle = {
  display: 'inline-block',
  fontSize: '14px',
  padding: '8px 18px',
  fontWeight: '700',
  color: '#ffffff',
  textAlign: 'center',
  backgroundColor: '#5cb85c',
  borderRadius: '3px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderImage: 'none',
  lineHeight: '1.42857em'
};

export const getButtonStyleString = (borderRadius=3, padding, fontSize, width, buttonTextColor) => {

  let buttonStyleString = 'display:inline-block;border-width:1px;border-style:solid;cursor:pointer;outline:none;text-align:center;';

  if (borderRadius) {
    buttonStyleString = buttonStyleString + `border-radius:${borderRadius}px;`; 
  }

  buttonStyleString = buttonStyleString + `padding:${padding ? (padding + 'px') : '8px 18px'};`;

  if (fontSize) {
    buttonStyleString = buttonStyleString + `font-size:${fontSize}px;`;
  }
  if (width) {
    buttonStyleString = buttonStyleString + `width:${width}px;`;
  }
  if (buttonTextColor) {
    buttonStyleString = buttonStyleString + `color:${buttonTextColor};`;
  }
  
  return buttonStyleString
};

export const appcuesButtonSuccessStyle = {
  border: '1px solid transparent',
  backgroundColor: '#5cb85c'
};

export const textInputStyle = {
  display: 'block',
  margin: 0,
  width: '95%',
  fontSize: 18,
  appearance: 'none',
  boxShadow: 'none',
  borderRadius: 'none',
  padding: 4,
  outline: 'none'
};

export const buttonNavTypeContainerStyle ={
  border: '1px solid grey',
  height: '100px'
};

export const buttonNavTypeMenuStyle ={
  border: '1px solid grey',
  height: '95px'
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


export const emojiPickerStyles = `.emoji-mart,
.emoji-mart * {
  box-sizing: border-box;
  line-height: 1.15;
  color: inherit
}

.emoji-mart {
  font-size: 16px;
  display: inline-block;
}

.emoji-mart .emoji-mart-emoji {
  padding: 6px;
}

.emoji-mart .emoji-mart-emoji, .emoji-mart .emoji-mart-emoji * {
  cursor: pointer;
}

.emoji-mart-bar:first-child {
  background: #e9e9e9;
  border-radius: 4px;
  width: 50%;
  display: inline-block;
  height: 36px;
}
.emoji-mart-bar:last-child {
  display: none;
}

.emoji-mart-anchors {
  display: flex;
  justify-content: space-between;
  padding: 0 6px;
  color: #858585;
  line-height: 0;
  cursor: pointer;
}

.emoji-mart-anchor {
  position: relative;
  flex: 1;
  text-align: center;
  padding: 8px 4px 4px;
  overflow: hidden;
  transition: color .1s ease-out;
}
.emoji-mart-anchor:hover,
.emoji-mart-anchor-selected {
  color: #464646;
}

.emoji-mart-anchor-selected .emoji-mart-anchor-bar {
  bottom: 0;
}

.emoji-mart-anchor-bar {
  position: absolute;
  bottom: -3px; left: 0;
  width: 100%; height: 3px;
  background-color: #464646;
}

.emoji-mart-anchors i {
  display: inline-block;
  width: 100%;
  max-width: 22px;
}

.emoji-mart-anchors svg {
  fill: currentColor;
  max-height: 18px;
}

.emoji-mart-scroll {
  overflow-y: scroll;
  height: 80px;
  padding: 0 6px 6px 6px;
}

.emoji-mart-search {
  width: 50%;
  height: 36px;
  display: inline-flex;
  vertical-align: bottom;
  justify-content: center;
  align-items: center;
}
.emoji-mart-search input {
  font-size: 16px;
  line-height: 24px;
  height: 100%;
  display: block;
  width: 100%;
  padding: .2em .6em;
  border-radius: 4px;
  border: 1px solid #e9e9e9;
  outline: 0;
  margin: 0 4px;
}

.emoji-mart-category .emoji-mart-emoji span {
  z-index: 1;
  position: relative;
  text-align: center;
}

.emoji-mart-category .emoji-mart-emoji:hover:before {
  z-index: 0;
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: #f4f4f4;
  border-radius: 100%;
}

.emoji-mart-category-label {
  z-index: 2;
  position: relative;
  top: 0;
}

.emoji-mart-category-label span {
  display: block;
  width: 100%;
  font-weight: 500;
  padding: 5px 6px;
}

.emoji-mart-emoji {
  position: relative;
  display: inline-block;
  font-size: 0;
}

.emoji-mart-no-results {
  font-size: 14px;
  text-align: center;
  color: #858585;
}
.emoji-mart-no-results .emoji-mart-category-label {
  display: none;
}
.emoji-mart-no-results .emoji-mart-no-results-label {
  margin-top: .2em;
}
.emoji-mart-no-results .emoji-mart-emoji:hover:before {
  content: none;
}

.emoji-mart-preview {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.emoji-mart-preview-emoji, .emoji-mart-preview-shortname, .emoji-mart-preview-emoticon, .emoji-mart-preview-skins, emoji-mart-title-label  {
  display: none;
}`;